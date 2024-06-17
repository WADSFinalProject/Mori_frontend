import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BatchBox from './BatchBox';
import { readWetLeavesCollections, updateWetLeavesCollection } from '../../../service/wetLeaves';

function FilterDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [batchData, setBatchData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const statusOptions = ["None", "Fresh", "Processed", "Near Expiry", "Exceeded", "Expired"];
    const [isOpenStatusDropdown, setIsOpenStatusDropdown] = useState(false);
    const [ampm, setAmPm] = useState("AM");
    
    useEffect(() => {
        const wetLeaves = async () => {
            try {
                const response = await readWetLeavesCollections();
                const batches = response.data.map((batch) => {
                    const timeParts = batch.Time.split(':');
                    const hours = parseInt(timeParts[0], 10);
                    const minutes = parseInt(timeParts[1], 10);

                    const formattedTime = formatTime(hours, minutes);

                    const batchDateParts = batch.Date.split('-');
                    const batchTime = new Date(
                        batchDateParts[0],
                        batchDateParts[1] - 1,
                        batchDateParts[2],
                        hours,
                        minutes,
                        0
                    );

                    const currentTime = new Date();

                    let durationInMilliseconds = batchTime.getTime() + (4 * 60 * 60 * 1000) - currentTime.getTime();

                    if (durationInMilliseconds < 0) {
                        durationInMilliseconds = 0;
                    }

                    const hoursLeft = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
                    const minutesLeft = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
                    const secondsLeft = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);

                    const formattedDuration = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;


                  let status = "";
                  if (durationInMilliseconds <= 0) {
                      status = "Exceeded";
                  } else if (durationInMilliseconds < (60 * 60 * 1000)) {
                      status = "Near Expiry";
                  } else if (durationInMilliseconds > (3 * 60 * 60 * 1000)) {
                      status = "Fresh";
                  } else {
                      status = batch.Status;
                  }

                  if (status === "Exceeded" || status === "Near Expiry" || status === "Fresh") {
                    handleUpdateStatus(hours, minutes, batch, status);
                }


                    // let status = "";
                    // if (durationInMilliseconds <= 0) {
                    //     status = "Exceeded";
                    // } else if (durationInMilliseconds < (60 * 60 * 1000)) {
                    //     status = "Near Expiry";
                    // } else if (durationInMilliseconds > (3 * 60 * 60 * 1000)) {
                    //     status = "Fresh";
                    // } else {
                    //     status = batch.Status;
                    // }

                    // if (status === "Exceeded" || status === "Near Expiry" || status === "Fresh") {
                    //     handleUpdateStatus(hours, minutes, batch, status);
                    // }

                    return {
                        batchId: batch.WetLeavesBatchID,
                        weight: batch.Weight + "kg",
                        date: formatDate(new Date(batch.Date)),
                        time: formattedTime,
                        status: status,
                        duration: formattedDuration
                    };
                });

                setBatchData(batches);
            } catch (error) {
                console.error("Error fetching batches: ", error);
            }
        };

        const formatDate = (date) => {
            return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
        };

        const formatTime = (hours, minutes) => {
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
        };

        const handleUpdateStatus = (hours, minutes, batch, status) => {
            let formattedHours = hours;
            if (ampm === "PM" && hours !== 12) {
                formattedHours += 12;
            } else if (ampm === "AM" && hours === 12) {
                formattedHours = 0;
            }
            
            const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00.000000`;

            const updatedData = {
                batchId: batch.WetLeavesBatchID,
                date: batch.Date,
                weight: parseFloat(batch.Weight),
                time: formattedTime,
                status: status,
            };

            updateWetLeavesCollection(updatedData.batchId, updatedData.date, updatedData.time, updatedData.weight, updatedData.status)
                .then(response => {
                    console.log('Data updated successfully.');
                })
                .catch(error => {
                    console.error('Failed to update data:', error);
                });
              
                
        };

        wetLeaves();
    }, []);

    const toggleStatusDropdown = () => {
        setIsOpenStatusDropdown(!isOpenStatusDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setIsOpenStatusDropdown(false);
    };

    const renderStatusOptions = () => {
        return (
            <div className={`absolute bottom-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10 ${isOpenStatusDropdown ? '' : 'hidden'}`} style={{ maxHeight: '150px', overflowY: 'auto' }}>
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
        const filteredBatchData = batchData.filter(batch => {
            const batchDate = new Date(batch.date[0]);
            const matchesDate = !selectedDate || batchDate.toDateString() === selectedDate.toDateString();
            const matchesStatus = !selectedStatus || batch.status === selectedStatus;

            if (selectedStatus === "None") {
                return true;
            } else {
                return matchesDate && matchesStatus;
            }
        });

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
                            <path fillRule="evenodd" d="M10 6.293a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414L10 9.414 6.707 12.707a1 1 0 0 1-1.414-1.414l4-4z" />
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
                            <path fillRule="evenodd" d="M10 6.293a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414L10 9.414 6.707 12.707a1 1 0 0 1-1.414-1.414l4-4z" />
                        </svg>
                    </button>

                    {renderStatusOptions()}
                </div>
            </div>

            {renderBatchBoxes()}

            {/* <button onClick={() => handleExpired(batchData[0].batchId)}>Mark First Batch as Expired</button> */}
        </div>
    );
}

export default FilterDropdown;