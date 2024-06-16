import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BatchBox from './BatchBox'; 
import { readBatch, readBatches } from '../../../service/batches';

function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [batchData, setBatchData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const statusOptions = ["None", "Processed", "Fresh", "Expired", "Exceeded"];
  const [isOpenStatusDropdown, setIsOpenStatusDropdown] = useState(false);

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

  // useEffect(() => {
  //   // Fetch data from backend using readBatches
  //   const fetchBatches = async () => {
  //     try {
  //       const response = await readBatches();
  //       setBatchData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchBatches();
  // }, []);


  useEffect(() => {
    readBatches()
      .then((res) => {
        console.log("Success : ", res);
        let resArr = [];
        res.data.forEach((dt) => {
          resArr.push({
            batchId: dt.batchId,
            weight: dt.weight,
            status: dt.status,
            date: ["16 March 2024", "20 March 2024"], // Replace with actual date logic if needed
            time: "02:45PM",
            duration: "00:00:00"
          })
        }) 
          setBatchData(resArr);
        }
      )
      .catch((err) => {
        console.error("Error fetching batches:", err);
      });
  }, []);
    
  const toggleStatusDropdown = () => {
    setIsOpenStatusDropdown(!isOpenStatusDropdown);
  };
  
  const selectStatus = (status) => {
    setSelectedStatus(status);
    setIsOpenStatusDropdown(false); // Close dropdown after selection
  };

  const renderStatusOptions = () => {
    return (
      <div className={`absolute bottom-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10 ${isOpenStatusDropdown ? '' : 'hidden'}`}
           style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    <button
          key="None"
          className={`block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 ${selectedStatus === "None" ? 'font-semibold' : ''}`}
          onClick={() => selectStatus("None")}
        >
          None
        </button>
        {statusOptions.map(status => (
          <button
            key={status}
            className={`block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 ${selectedStatus === status ? 'font-semibold' : ''}`}
            onClick={() => selectStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>
    );
  };
  

  const renderBatchBoxes = () => {
    // Filter BatchBox data based on the selected date and status, or show all if "None" is selected
    const filteredBatchData = batchData.filter(batch => {
      const batchDate = new Date(batch.date[0]); // Adjust date parsing logic as per your actual data structure
      const matchesDate = !selectedDate || batchDate.toDateString() === selectedDate.toDateString();
      const matchesStatus = !selectedStatus || batch.status === selectedStatus;
  
      // Check if "None" is selected, if so, show all batches
      if (selectedStatus === "None") {
        return true; // Show all batches
      } else {
        return matchesDate && matchesStatus;
      }
    });
  
    // Sort filteredBatchData by date, newest to oldest
    filteredBatchData.sort((a, b) => {
      const dateA = new Date(a.date[0]);
      const dateB = new Date(b.date[0]);
      return dateB - dateA;
    });
  
    return (
      <div style={{ padding: '0px', marginTop: '10px' }}>
        {filteredBatchData.length > 0 ? (
          filteredBatchData.map(batch => (
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
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">No batches found</div>
        )}
      </div>
    );
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div className="flex space-x-2 mb-2">
        {/* Filter by Date */}
        <div className="w-full">
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
              <path fillRule="evenodd" d="M10 6.293a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414L10 9.414 6.707 12.707a1 1 0 0 1-1.414-1.414l4-4z"/>
            </svg>
          </button>

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
        </div>

        {/* Filter by Status buttons */}
        <div className="relative w-full">
          <button
            className="w-full h-[42px] px-3 py-1.5 border border-black justify-between items-center inline-flex"
            onClick={toggleStatusDropdown}
          >
            <div className="container flex flex-col items-center w-full">
              <span className="text-black text-xs font-semibold font-['Be Vietnam Pro']">Filter by Status</span>
              <span className="text-black text-xs font-normal font-['Be Vietnam Pro']">
                {selectedStatus ? selectedStatus : 'None'}
              </span>
            </div>
            <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 6.293a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414L10 9.414 6.707 12.707a1 1 0 0 1-1.414-1.414l4-4z"/>
            </svg>
          </button>

          {renderStatusOptions()}
        </div>
      </div>

      {/* Render BatchBox components */}
      {renderBatchBoxes()}
    </div>
  );
}

export default FilterDropdown;
