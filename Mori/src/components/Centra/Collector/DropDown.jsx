import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BatchBox from './BatchBox'; 
import { readBatches } from '../../../service/batches';
import axios from 'axios';

function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [batchData, setBatchData] = useState([]);

  // useEffect(() => {
  //   // Fetch data from data.json
  //   fetch('/data.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Set the fetched data
  //       setBatchData(data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  useEffect(() => {
    // Fetch data from backend using readBatches
    const fetchBatches = async () => {
      try {
        const response = await readBatches();
        setBatchData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBatches();
  }, []);
  
  // Render BatchBox components using fetched data
  const renderBatchBoxes = () => {
    // Filter BatchBox data based on the selected date
    const filteredBatchData = selectedDate
      ? batchData.filter(batch => {
          const batchDate = new Date(batch.date.replace(/,/g, ""));
          return batchDate.toDateString() === selectedDate.toDateString();
        })
      : batchData;

    return (
      <div style={{ padding: '0px', marginTop: '10px' }}>
        {filteredBatchData.map(batch => (
          <div key={batch.batchId} style={{ marginBottom: '10px' }}>
            <BatchBox
              batchId={batch.batchId}
              weight={batch.weight}
              status={batch.status}
              date={batch.date}
              time={batch.time}
              duration={batch.duration}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          className="w-full h-[42px] px-3 py-1.5 border border-black justify-between items-center inline-flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="container flex flex-col items-center w-full">
            <span className="text-black text-xs font-semibold font-['Be Vietnam Pro']">Filter by Date</span>
            <span className="text-black text-xs font-normal font-['Be Vietnam Pro']">
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'None'}
            </span>
          </div>
          <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.293 13.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0z"/>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute bottom-full left-[50%] transform -translate-x-1/2 mb-2 bg-white rounded-md shadow-md z-50">
          <div className="p-2 flex justify-center">
            <button
              className="px-4 py-2 mr-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setSelectedDate(null)}
            >
              None
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="py-2 px-4 text-sm text-gray-700"
            />
          </div>
        </div>
      )}
      {/* Render BatchBox components */}
      {renderBatchBoxes()}
    </div>
  );
  
}

export default FilterDropdown;
