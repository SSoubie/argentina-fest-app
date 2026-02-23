// We import a useMemo from React to store our dynamic data
import { useMemo } from 'react';

function FilterOverlay({
  value,
  onChange,
  options }) {

  // We  use the useMemo hook to memoize the filtered carnival data, so that it only recalculates when the selected Months changes
  const MONTHS = useMemo(
    () =>
      options ?? [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
        'Not defined',
      ],
    [options]
  );

  // We need to creat a function that toggles the status of the months in the state
  const isChecked = (m) => value?.includes(m);

  const toggle = (m) => {
    if (typeof onChange === 'function') {
      onChange((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
    }
  };

  // This function taggle all the months
  const selectAll = () => {
    if (typeof onChange === 'function') onChange(MONTHS);
  };

  // This function whipe all months
  const clearAll = () => {
    if (typeof onChange === 'function') onChange([]);
  };

  // Now, we create the interactive overlay.
  return (
    <fieldset className="fixed top-35 right-4 bg-white bg-opacity-5 backdrop-blur-sm p-2 rounded-lg shadow-lg z-50 max-w-sm ${className}">
      <legend className="sr-only">Checkboxes</legend>

      <div className="flex items-center justify-between">
        <h2 className="text-md font-medium text-gray-900 p-2">Filter by Month</h2>

        <div className="pr-2 flex gap-2 text-xs text-gray-700">
          <button type="button" onClick={selectAll} className="hover:text-black">All</button>
          <button type="button" onClick={clearAll} className="hover:text-black">None</button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        {MONTHS.map((label, idx) => {
          const id = `month-option-${idx}`;
          return (
            <label key={label} htmlFor={id} className="inline-flex items-center gap-2">
              <input
                id={id}
                type="checkbox"
                className="size-3 rounded border-gray-300 shadow-sm"
                checked={isChecked(label)}
                onChange={() => toggle(label)}
              />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default FilterOverlay
