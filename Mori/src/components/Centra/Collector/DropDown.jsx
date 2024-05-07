import { useState } from 'react';

function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          className="w-[342px] h-[42px] px-3 py-1.5 border border-indigo-500 justify-between items-center inline-flex"
          onClick={() => setIsOpen(!isOpen)}
        >

        <div className="container flex flex-col items-center">
            <span className="text-indigo-500 text-xs font-semibold font-be-vietnam-pro">Filter by Date</span>
            <span className="text-indigo-500 text-xs font-normal font-be-vietnam-pro mt-1">None</span>
        </div>


          <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.293 13.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0z"/>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 1</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 2</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 3</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
