
import { CarnivalData } from '../data/carnivals'; // We import the data
import 'maplibre-gl/dist/maplibre-gl.css'; // We import mapbox-maplibre styles
import { Map, Source, Layer, Popup, NavigationControl, ScaleControl } from 'react-map-gl/maplibre'; // We import the modules we will use
import { useMemo, useState } from 'react';

function MapDisplay({ selectedMonths }) {

  // State to keep track of the selected carnival for the popup
  const [selectedCarnival, setSelectedCarnival] = useState(null);

  // We set the layer style
  const CarnivalLayerStyle = useMemo(() => ({
    id: 'carnival-layer',
    type: 'circle',
    source: 'carnival-data', // custom data source id
    paint: {
      'circle-radius': 4,
      'circle-color': '#FFB81C',
      'circle-stroke-width': 3,
      'circle-stroke-color': 'rgb(108, 172, 228)'
    },
  }), []);

  // We filter expression from selectedMonths
  const monthFilter = useMemo(() => ([
    'in',
    ['coalesce', ['get', 'mes'], 'Not defined'],
    ['literal', selectedMonths ?? []],
  ]), [selectedMonths]);

  function handleMapClick(event) {
    const features = event.features ?? [];
    if (features.length) {
      const clickedFeature = features[0];
      setSelectedCarnival(clickedFeature);
    }
  }

  return (
    <Map
      // Centered in Santa Rosa, La Pampa
      initialViewState={{ longitude: -64.28991, latitude: -36.61617, zoom: 3 }}
      style={{ width: '100%', height: '100vh' }}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      onClick={handleMapClick}
      interactiveLayerIds={['carnival-layer']}
    >
      <Source id="carnival-data" type="geojson" data={CarnivalData}>
        <Layer {...CarnivalLayerStyle} filter={monthFilter} />
      </Source>


      {selectedCarnival && ( // We create the poppup
        <Popup
          anchor="bottom"
          longitude={selectedCarnival.geometry.coordinates[0]}
          latitude={selectedCarnival.geometry.coordinates[1]}
          onClose={() => setSelectedCarnival(null)}
        >
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-200 text-sm">
              <div className="py-3 font-bold text-gray-900 text-center">
                {selectedCarnival.properties.nombre}
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Month</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {selectedCarnival.properties.mes ?? 'Not defined'}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Province</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {selectedCarnival.properties.provincia}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">District</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {selectedCarnival.properties.departamento}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">City</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {selectedCarnival.properties.localidad}
                </dd>
              </div>
            </dl>
          </div>
        </Popup>
      )}

      <NavigationControl />

      <ScaleControl position="bottom-right" />

    </Map>
  );
}

export default MapDisplay;