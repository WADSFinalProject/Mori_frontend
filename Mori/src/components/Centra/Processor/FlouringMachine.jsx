import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from 'react-use';
import bell from '../../../assets/bell.png';
import hamburg from '../../../assets/hamburg.png';
import back from '../../../assets/back.png';
import { Doughnut } from 'react-chartjs-2';
import DatePicker from "react-tailwindcss-datepicker";
import { Link, useNavigate } from "react-router-dom";

const gaugeOptions = {
  responsive: true,
  cutout: '80%',
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  maintainAspectRatio: false,
  events: [],
};

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

export default function FlouringMachine() {
  const { machineNumber } = useParams(); // Extract machine number from URL
  const [machineData, setMachineData] = useState(null);
  const [timer, setTimer] = useState(1); // 24 hours in seconds
  const [timerInterval, setTimerInterval] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [buttonText, setButtonText] = useState("Start Process");
  const [batchDetails, setBatchDetails] = useState(null);
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  // Edit mode states for batch details
  const [editMode, setEditMode] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const flouringMachines = [
      { number: 1, status: 'FULL', currentLoad: 24, capacity: 30, lastUpdated: '45 minutes ago' },
      { number: 2, status: 'FULL', currentLoad: 10, capacity: 30, lastUpdated: '3 hours ago' },
      { number: 3, status: 'EMPTY', currentLoad: 10, capacity: 30, lastUpdated: '1 hour ago' }
    ];

    const machine = flouringMachines.find(machine => machine.number === parseInt(machineNumber));
    setMachineData(machine);
  }, [machineNumber]); // Only run this effect when machineNumber changes

  const startProcess = () => {
    if (machineData.currentLoad < machineData.capacity) {
      setShowConfirmation(true);
      return;
    }
    startTimer();
  };
  
  const startTimer = () => {
    if (!timerInterval) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setInProgress(false);
            setButtonText("Done Processing");
            setBatchDetails({
              number: Math.floor(Math.random() * 10000),
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              weight: machineData.currentLoad
            });
            return 0;
          }
        });
      }, 1000);
      setTimerInterval(interval);
      setInProgress(true);
      setButtonText("In Progress");
    }
  };
  
  const handleContinueProcess = () => {
    setShowConfirmation(false);
    startTimer();
  };
  
  const handleCancelProcess = () => {
    setShowConfirmation(false);
  };
  const handleRescale = () => {
    // Logic for rescaling goes here
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  
    if (!editMode) {
      // Entering edit mode, populate edit states with current batch details
      setEditDate(batchDetails?.date || "");
      setEditTime(batchDetails?.time || "");
      setEditWeight(batchDetails?.weight.toString() || ""); // Ensure it's a string for the input
  
      // Format the time to include AM/PM if not already included
      const currentTime = batchDetails?.time || new Date().toLocaleTimeString();
      const [time, modifier] = currentTime.split(' ');
      if (!modifier) {
        // Assume AM/PM from the system's locale or default to AM if unavailable
        const systemAmPm = new Date().toLocaleTimeString().split(' ')[1] || 'AM';
        setEditTime(`${time} ${systemAmPm}`);
      } else {
        setEditTime(currentTime);
      }
    } else {
      // Exiting edit mode, do not change the state as they should already be updated in handleSaveEdit
    }
  };
  const formatTimeWithoutSeconds = (timeString) => {
    if (!timeString) return '';
    const [time, modifier] = timeString.split(' ');
    if (!time || !modifier) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes} ${modifier}`;
  };
  const handleCancelEdit = () => {
    // Reset edit fields
    setEditDate(batchDetails?.date || "");
    setEditTime(batchDetails?.time || "");
    setEditWeight(batchDetails?.weight || "");

    // Exit edit mode
    setEditMode(false);
  };

  const handleSaveEdit = () => {
    // Update batch details with edited values
    setBatchDetails({
      ...batchDetails,
      date: editDate,
      time: editTime,
      weight: editWeight
    });

    // Exit edit mode
    setEditMode(false);
  };

  const navigate = useNavigate(); // useNavigate hook

  const { currentLoad, capacity } = machineData || {}; 

  let chartColor = '#99D0D580'; 
  if (currentLoad === capacity) {
    chartColor = '#0F3F43'; 
  } else if (currentLoad > capacity / 2) {
    chartColor = '#5D9EA4';
  }

  return (
    isMobile ? (

    <div className="bg-000000" style={{ paddingBottom: '40px' }}>
      <div className="w-full">
        <div className="p-4 shadow-md flex justify-between items-center bg-white">
        <Link
          to={{
            pathname: "/centraprocessor",
            state: { activeTab: "flouring" } // Set the active tab to "flouring"
          }}
          className="flex items-center"
        >
          <img src={back} alt="back" className="w-5 mr-2" />
        </Link>

          <span className="font-bold text-2xl lg:text-3xl xl:text-4xl mr-18 font-vietnam">
            Flouring Machine {machineNumber}
          </span>
          <div className="flex">
            <img src={bell} alt="notifications" className="w-5 mr-2" />
            <img src={hamburg} alt="menu" className="w-5" />
          </div>
        </div>
      </div>
  
      <div className="flex justify-center items-center">
        <div className="chart-container" style={{ width: '150px', height: '120px', position: 'relative' }}>
          <Doughnut
            data={{
              labels: ['Current Load', 'Capacity'],
              datasets: [{
                data: [currentLoad || 0, capacity - (currentLoad || 0)],
                backgroundColor: [chartColor, '#EFEFEF'], 
                borderWidth: 0
              }]
            }}
            options={gaugeOptions}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ fontSize: '0' }}>
            <span className="font-vietnam font-bold" style={{ fontSize: '24px', lineHeight: '1.2' }}>{currentLoad} kg</span>
            <span className="font-vietnam font-bold" style={{ fontSize: '12px', lineHeight: '1.2', marginBottom: '-30px' }}>{`/ ${capacity} kg`}</span>
          </div>
        </div>
      </div>
  
      <div className="last-updated" style={{ textAlign: 'center', fontSize: '10px', color: '#666666', marginTop: '-18px' }}>
        Last updated: <span style={{ fontWeight: 'bold' }}>{machineData?.lastUpdated}</span>
      </div>
  
      <div style={{ borderTop: '1px solid #ccc', margin: '20px auto', width: '80%' }}></div>
  
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <button
  className="start-btn text-white py-1 px-4"
  style={{
    backgroundColor: buttonText === "Start Process" ? "#000000" : inProgress ? "#FFFFFF" : "#FFFFFF",
    color: buttonText === "Start Process" ? "#FFFFFF" : inProgress ? "#000000" : "#217045",
    border: buttonText === "Start Process" ? "none" : inProgress ? "1px solid #000000" : "1px solid #217045",
    borderRadius: "10px",
    fontSize: "14px",
  }}
  onClick={startProcess}
  disabled={inProgress}
>
  {buttonText}
</button>


      </div>
  
      <div className="flex justify-center items-center ">
        <div className="chart-container" style={{ width: '200px', height: '200px', position: 'relative' }}>
          <Doughnut
            data={{
              labels: ['Time Left', ''],
              datasets: [{
                data: [timer, 60 - timer],
                backgroundColor: ['#B2B472', '#EFEFEF'], 
                borderWidth: 0
              }]
            }}
            options={{
              ...gaugeOptions,
              cutout: '88%', // Adjust the cutout percentage here
              circumference: 360,
              rotation: 0,
              animation: { animateRotate: false },
              tooltips: { enabled: false }
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ fontSize: '0' }}>
            <span className="font-vietnam font-bold" style={{ fontSize: '24px', lineHeight: '1.2' }}>{formatTime(timer)}</span>
            <span className="text-sm mt-2" style={{ fontSize: '10px', lineHeight: '1.2' }}>Finished at {batchDetails?.time}</span>
          </div>
        </div>
      </div>
  
      {timer === 0 && (
        <div className="bg-white p-4 mt-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 className="text-md" style={{ textAlign: 'center', width: '100%', marginBottom: '' }}>BATCH #{batchDetails?.number} COMPLETED</h3>
          <div style={{ textAlign: 'left', width: '100%' }}>
            {/* Editable date field */}
            <p className="text-xs mb-1">Date</p>
{editMode ? (
  <DatePicker 
    useRange={false}
    asSingle={true}
    value={{ startDate: editDate, endDate: editDate }}
    onChange={(date) => {
      if (date) {
        setEditDate(date.startDate);
      }
    }}
    inputClassName="w-full h-10 rounded-md focus:ring-0 bg-[#EFEFEF] dark:bg-gray-900 dark:placeholder:text-gray-100 border-gray-300 text-sm text-gray-500"
    placeholderText="Select date"
    dateFormat="yyyy-MM-dd"
  />
) : (
  <p className="font-bold text-sm mb-2">{formatDate(batchDetails?.date)}</p>
)}

<p className="text-xs mb-1">Time</p>
{editMode ? (
  <div className="relative max-w-sm flex items-center">
    <div className="h-10 bg-[#EFEFEF] leading-none border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 relative flex items-center justify-left">
      <select
        name="hours"
        className="bg-transparent text-xs appearance-none outline-none border-none text-center"
        value={editTime.split(':')[0]}
        onChange={(e) => setEditTime(`${e.target.value}:${editTime.split(':')[1].split(' ')[0]} ${editTime.split(' ')[1]}`)}
      >
        {[...Array(12).keys()].map((hour) => (
          <option key={hour + 1} value={hour + 1}>{String(hour + 1).padStart(2, '0')}</option>
        ))}
      </select>
      <span className="text-s mr-3">:</span>
      <select
        name="minutes"
        className="bg-transparent text-xs appearance-none outline-none mr-4 border-none"
        value={editTime.split(':')[1].split(' ')[0]}
        onChange={(e) => setEditTime(`${editTime.split(':')[0]}:${e.target.value} ${editTime.split(' ')[1]}`)}
      >
        {[...Array(60).keys()].map((minute) => (
          <option key={minute} value={String(minute).padStart(2, '0')}>{String(minute).padStart(2, '0')}</option>
        ))}
      </select>
      <select
        name="ampm"
        className="bg-transparent text-xs appearance-none outline-none border-none"
        value={editTime.split(' ')[1]}
        onChange={(e) => setEditTime(`${editTime.split(':')[0]}:${editTime.split(':')[1].split(' ')[0]} ${e.target.value}`)}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  </div>
) : (
  <p className="font-bold text-sm mb-2">{formatTimeWithoutSeconds(batchDetails?.time)}</p>
)}

                        {/* Editable weight field */}
            {/* Editable weight field */}
            <p className="text-xs mb-1">Weight</p>
            {editMode ? (
            <div className="relative max-w-sm flex items-center">
                <input
                type="number" // Adjust type to number for better input control
                value={editWeight}
                onChange={(e) => setEditWeight(e.target.value)}
                className="w-full py-1 px-2 rounded-full bg-[#EFEFEF] text-gray-500 focus:outline-none border border-gray-300" // Updated class names for better styling
                placeholder="Enter weight (kg)" // Providing a placeholder for clarity
                min="0" // Ensures no negative numbers
                step="0.01" // Allows decimal values to be entered
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                <span>kg</span> {/* Optional: Remove if you prefer not to have the unit inside the input field */}
                </div>
            </div>
            ) : (
            <p className="font-bold text-sm mb-4">{batchDetails?.weight} kg</p>
            )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: '10px' }}>
            {/* Edit or Confirm button */}
            <button
  onClick={editMode ? handleCancelEdit : handleEditClick}
  className="bg-black text-white py-1 px-3 rounded-md mr-2"
  style={{ width: '150px', borderBottom: 'none' }}
>
  {editMode ? 'Cancel' : 'Edit'}
</button>

<button
  onClick={editMode ? handleSaveEdit : handleRescale}
  className={`bg-green-600 text-white py-1 px-3 rounded-md ml-2 ${
    editMode ? 'mr-2' : ''
  }`}
  style={{ width: '150px', borderBottom: 'none' }}
>
  {editMode ? 'Rescale' : 'Confirm'}
</button>


            </div>
          </div>
      )}
{showConfirmation && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg text-center w-72 mx-auto">
      <h2 className="text-lg font-bold mb-2">Notice!</h2>
      <p className="mb-4 text-sm">
        Flouring Machine {machineNumber} has <span className="underline">NOT reached the maximum weight</span>. Processing now may not be as efficient for the production process.
      </p>
      <div className="flex justify-center ">
        <button
          onClick={handleCancelProcess}
          className="bg-gray-400 text-white py-1 px-3 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleContinueProcess}
          className="bg-black text-white py-1 px-3 rounded-lg ml-1"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}
        <footer className="bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
                    <p className="font-semibold">@2024 AMIN</p>
                    <p className="font-semibold">CENTRA</p>
                </footer>
            </div>
            ) : (
              <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600">Not available for this device.</p>
              </div>
                )

        );
        }
