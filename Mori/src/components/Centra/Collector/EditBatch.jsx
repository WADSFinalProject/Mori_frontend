import React, { useState, useEffect } from "react";
import { useWindowSize } from 'react-use';
import { Link } from "react-router-dom";
import DatePicker from "react-tailwindcss-datepicker";

export default function EditBatch({ onClose, batchData }) {
    const { width } = useWindowSize();
    const isMobile = width <= 640;

    const [value, setValue] = useState({ startDate: null, endDate: null });
    const { batchId, status, duration: batchDuration } = batchData; // Renaming duration to batchDuration

    const [weight, setWeight] = useState("");
    const [time, setTime] = useState(""); // Renaming duration to batchDuration

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);
    const [ampm, setAmPm] = useState("AM");

    const handleHourChange = (event) => {
        setHours(parseInt(event.target.value));
    };

    const handleMinuteChange = (event) => {
        setMinutes(parseInt(event.target.value));
    };

    const handleAmPmChange = (event) => {
        setAmPm(event.target.value);
    };

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    const handleConfirmExpiry = () => {
        setShowConfirmationModal(true);
    };

    const handleCloseModal = () => {
        setShowConfirmationModal(false);
    };

    useEffect(() => {
        // Fetch data from data.json
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Find the batch data matching the batchId
                const batch = data.find(item => item.batchId === batchData.batchId);
                if (batch) {
                    const dateFromJSON = data.date;
                    const parsedDate = new Date(dateFromJSON);
                    setValue(parsedDate);
                    // Update state with fetched data
                    setValue({ startDate: new Date(batch.date), endDate: null });
                    setWeight(batch.weight);
                    // Set time in desired format
                    const timeParts = batch.time.split(':');
                    const hours = parseInt(timeParts[0]);
                    const minutes = parseInt(timeParts[1]);
                    const ampm = timeParts[1].includes('AM') ? 'AM' : 'PM';
                    setTime(`${hours}:${minutes} ${ampm}`);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-end md:items-center md:py-4 md:px-6 md:pt-0 md:bg-black md:bg-opacity-25">
            <div className="bg-white rounded-t-lg md:rounded-lg overflow-hidden shadow-md w-full max-w-screen-lg md:rounded-none md:w-96">
                <div className="px-4 py-3 border-b border-gray-200">
                    <nav className="flex justify-between items-center">
                    <Link to="/CollectorMain">
                        <button className="text-zinc-500 text-sm font-semibold hover:text-[#6C7CD1]" onClick={onClose}>Cancel</button>
                    </Link>

                        <div className="flex items-center justify-center">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-500">
                                <path d="M13.0469 6.1875L5.52344 2.00781L6.95312 1.20312C7.44531 0.929688 7.96094 0.789062 8.46875 0.789062C8.97656 0.789062 9.48438 0.929688 9.98438 1.20312L15.4297 4.24219C15.625 4.34375 15.7891 4.45312 15.9219 4.58594L13.0469 6.1875ZM8.46875 8.71875L1.01562 4.58594C1.14844 4.45312 1.3125 4.34375 1.50781 4.24219L4.28906 2.69531L11.7734 6.88281L8.46875 8.71875ZM9.07031 17.9219V9.79688L16.4609 5.65625C16.4922 5.79688 16.5 5.94531 16.5 6.125V12.4688C16.5 13.5781 16.1172 14.0391 15.3359 14.4766L9.33594 17.8125C9.25 17.8594 9.15625 17.9062 9.07031 17.9219ZM7.86719 17.9219C7.77344 17.9062 7.6875 17.8594 7.59375 17.8125L1.59375 14.4766C0.8125 14.0391 0.429688 13.5781 0.429688 12.4688V6.125C0.429688 5.94531 0.445312 5.79688 0.476562 5.65625L7.86719 9.79688V17.9219Z" fill="#828282"/>
                            </svg>
                            <h1 className="text-zinc-500 text-base font-semibold ml-2">Edit Batch #{batchId}</h1>
                        </div>
                        <button className="text-zinc-500 text-sm font-semibold hover:text-[#6C7CD1]">Save</button>
                    </nav>
                </div>

                {/* Expiration Warning */}
                <div className="flex bg-[#F2BBBB] p-4 mb-4 text-sm text-black" role="alert">
                    <svg width="60" height="50" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '1rem' }}>
                        <path d="M12.6797 25.2617C5.97656 25.2617 0.457031 19.7422 0.457031 13.0391C0.457031 6.34766 5.96484 0.816406 12.668 0.816406C18.8789 0.816406 24.082 5.57422 24.8086 11.5977C23.9531 11.375 22.8984 11.3398 22.0664 11.4922C21.3398 6.95703 17.4141 3.5 12.668 3.5C7.38281 3.5 3.15234 7.75391 3.15234 13.0391C3.15234 18.3242 7.39453 22.5781 12.6797 22.5781C13.793 22.5781 14.8711 22.3789 15.8555 22.0156C16.1719 22.8828 16.6523 23.6797 17.2734 24.3477C15.8438 24.9453 14.2852 25.2617 12.6797 25.2617ZM6.90234 14.6445C6.32812 14.6445 5.89453 14.1875 5.89453 13.625C5.89453 13.0508 6.32812 12.6055 6.90234 12.6055H11.6484V6.11328C11.6484 5.53906 12.1055 5.09375 12.668 5.09375C13.2422 5.09375 13.6875 5.53906 13.6875 6.11328V13.625C13.6875 14.1875 13.2422 14.6445 12.668 14.6445H6.90234ZM23.0508 25.2734C19.7227 25.2734 16.9688 22.5195 16.9688 19.168C16.9688 15.8398 19.7227 13.0859 23.0508 13.0859C26.3906 13.0859 29.1445 15.8398 29.1445 19.168C29.1445 22.4961 26.3672 25.2734 23.0508 25.2734ZM23.0508 20.1992C23.5547 20.1992 23.918 19.8477 23.9414 19.3672L24.0469 16.0859C24.0586 15.5117 23.6484 15.1133 23.0508 15.1133C22.4648 15.1133 22.0547 15.5117 22.0781 16.0859L22.1719 19.3672C22.1953 19.8477 22.5586 20.1992 23.0508 20.1992ZM23.0508 23.1992C23.707 23.1992 24.1992 22.7188 24.2109 22.0859C24.2109 21.4648 23.707 20.9727 23.0508 20.9727C22.4062 20.9727 21.9023 21.4531 21.9023 22.0859C21.9023 22.7188 22.4062 23.1992 23.0508 23.1992Z" fill="#A84E4E"/>
                    </svg>
                    <div>
                        <span className="font-medium font-extrabold">Batch #{batchId}</span> has exceeded the expiration date. Confirm Expiry to change the batch status.
                        <span className="text-sm font-bold text-[#A74D4D] mt-4 font-vietnam cursor-pointer" onClick={handleConfirmExpiry}> Confirm Expiry Now.</span> 
                    </div>
                </div>

                <div className="px-4 py-4">
                    <h1 className="text-black text-base font-bold">Collection Details</h1>

            {/* Calendar Date Picker */}
            <h2 className="text-black text-sm font-medium font-['Be Vietnam Pro'] pt-3">Date</h2>
            <div className="relative max-w-full w-full flex items-center pt-3">
                <DatePicker
                    useRange={false}
                    asSingle={true}
                    value={value}
                    onChange={handleValueChange}
                    inputClassName="w-full h-10 rounded-md focus:ring-0 bg-[#EFEFEF] dark:bg-gray-900 dark:placeholder:text-gray-100 border-gray-300 text-sm text-gray-500"
                    placeholderText="Select date"
                    dateFormat="MM/dd/yyyy"
                />
                <div className="pt-3 absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6C7CD1] dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                </div>
            </div>

            {/* Time */}
            <h2 className="text-black text-sm font-medium font-['Be Vietnam Pro'] pt-3">Time</h2>
            <div className="relative max-w-full w-full flex items-center pt-3">
                <div className="h-10 bg-[#EFEFEF] leading-none border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 relative flex items-center justify-left">
                    <select name="hours" value={hours} onChange={handleHourChange} className="bg-transparent text-xs appearance-none outline-none border-none text-center">
                        {[...Array(12).keys()].map((hour) => (
                            <option key={hour + 1} value={hour + 1}>{hour + 1 < 10 ? `0${hour + 1}` : hour + 1}</option>
                        ))}
                    </select>
                    <span className="text-s mr-3">:</span>
                    <select name="minutes" value={minutes} onChange={handleMinuteChange} className="bg-transparent text-xs appearance-none outline-none mr-4 border-none">
                        {[...Array(60).keys()].map((minute) => (
                            <option key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</option>
                        ))}
                    </select>
                    <select name="ampm" value={ampm} onChange={handleAmPmChange} className="bg-transparent text-xs appearance-none outline-none border-none">
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
                <div className="pt-3 absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6C7CD1] dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                    </svg>
                </div>
            </div>


                        {/* Weight */}
                        <h2 className="text-black text-sm font-medium font-['Be Vietnam Pro'] pt-3">Weight</h2>
                        <div className="relative max-w-full w-full flex items-center pt-3">
                            <input 
                                id="weight" 
                                value={weight} 
                                onChange={(e) => setWeight(e.target.value)} 
                                className="h-10 bg-[#EFEFEF] border border-gray-300 leading-none text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" 
                                placeholder="0.0 kg" 
                                min="0" 
                                step="0.01" 
                                required 
                            />
                            <div className="pt-3 absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-[#6C7CD1] dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M8.34232922,9 L15.6576708,9 C17.0342737,9 18.234223,9.93689212 18.5680983,11.2723931 L21,21 L3,21 L5.43190172,11.2723931 C5.76577697,9.93689212 6.96572629,9 8.34232922,9 Z M11.264,18 L12.608,18 L12.608,12.336 L11.376,12.336 L9.512,13.704 L10.208,14.656 L11.264,13.84 L11.264,18 Z" clipRule="evenodd"/>
                                    <circle fill="#6C7CD1" opacity="1" cx="12" cy="5.5" r="2.5"/>
                                </svg>
                            </div>
                        </div>

                    {/* Empty space */}
                    <div style={{ height: "340px" }}></div>
            
                    {/* Confirmation Modal */}
                    {showConfirmationModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-[270px] h-[169px] px-5 py-7 bg-white rounded-xl flex-col justify-start items-center gap-5 inline-flex">
                                <div className="self-stretch h-[66px] flex-col justify-start items-center gap-2 flex">
                                    <div className="self-stretch text-center text-black text-[17px] font-semibold font-['Be Vietnam Pro'] leading-snug">Confirm Expiry</div>
                                    <div className="self-stretch text-center text-black text-[13px] font-normal font-['Be Vietnam Pro'] leading-[18px]">After confirming, you will not be<br/>able to undo the batch status.</div>
                                </div>
                                <div className="justify-center items-start gap-3 inline-flex">
                                    <button className="px-[21px] py-1.5 bg-black opacity-40 rounded justify-center items-center gap-2.5 flex" onClick={handleCloseModal}>
                                        <div className="text-white text-xs font-medium font-['Be Vietnam Pro']">Cancel</div>
                                    </button>
                                    <button className="px-[21px] py-1.5 bg-black rounded justify-center items-center gap-2.5 flex" onClick={handleCloseModal}>
                                        <div className="text-white text-xs font-medium font-['Be Vietnam Pro']">Expired</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
}