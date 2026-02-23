import './styles.css' // Importing the CSS file for styling.
// importing the components that will be used in the app.
import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import Modal from './components/Modal'
import DescriptionOverlay from './components/DescriptionOverlay'
import SourceOverlay from './components/SourceOverlay'
import FilterOverlay from './components/FilterOverlay'
// Importing the useState hook from React to manage state in the functional component.
import { useState } from 'react';

function App() {

  // State to control whether the modal is open or closed. True to show the modal when the app loads. 
  const [isModalOpen, setIsModalOpen] = useState(true)

  // Function to close the modal by setting the state to false. This function will be passed as a prop to the Modal component, allowing it to close itself when the button is clicked.
  function CloseModal() {
    setIsModalOpen(false)
  }

  // We define the ALL_MONTHS constant to have a list of all the months that we can use to initialize the selectedMonths state and to reset it when needed. This way, we can easily manage the list of months without hardcoding it in multiple places in the code.
  const ALL_MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
    'Not defined',
  ];

  // State to control the carnivals that are selected according to the month. 
  const [selectedMonths, setSelectedMonths] = useState(ALL_MONTHS);

  /* We call the components that we imported to display them in the app. */
  return (
    <div>
      <TitleBar />
      <DescriptionOverlay />
      <MapDisplay selectedMonths={selectedMonths} />
      <SourceOverlay />
      <FilterOverlay value={selectedMonths} onChange={setSelectedMonths} />
      {isModalOpen ? <Modal closeModal={CloseModal} /> : null}
    </div>
  )
}

export default App