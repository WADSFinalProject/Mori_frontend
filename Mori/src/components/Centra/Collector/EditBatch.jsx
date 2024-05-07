import React, { useState } from "react";
import { useWindowSize } from 'react-use'; // Import useWindowSize hook from react-use library
import { Link } from "react-router-dom";
import DatePicker from "react-tailwindcss-datepicker";


export default function EditBatch() {
    const { width } = useWindowSize(); // Get the window width using the useWindowSize hook

    // Check if the window width is greater than a mobile device width (e.g., 640px)
    const isMobile = width <= 640;
    
    
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null 
        }); 
        
        const handleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
        } 

    return (
        <div>
            {isMobile ? (
                // Header
            <div>
                <nav className="bg-white p-4 shadow-md flex justify-between items-center">
                    {/* Cancel button */}
                    <Link to="/CollectorMain">
                        <button className="text-zinc-500 text-[13px] font-semibold font-['Be Vietnam Pro'] hover:text-[#6C7CD1] mr-auto">Cancel</button>
                    </Link>

                    {/* Centered logo and text */}
                    <div className="flex items-center justify-center flex-grow">
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0469 6.1875L5.52344 2.00781L6.95312 1.20312C7.44531 0.929688 7.96094 0.789062 8.46875 0.789062C8.97656 0.789062 9.48438 0.929688 9.98438 1.20312L15.4297 4.24219C15.625 4.34375 15.7891 4.45312 15.9219 4.58594L13.0469 6.1875ZM8.46875 8.71875L1.01562 4.58594C1.14844 4.45312 1.3125 4.34375 1.50781 4.24219L4.28906 2.69531L11.7734 6.88281L8.46875 8.71875ZM9.07031 17.9219V9.79688L16.4609 5.65625C16.4922 5.79688 16.5 5.94531 16.5 6.125V12.4688C16.5 13.5781 16.1172 14.0391 15.3359 14.4766L9.33594 17.8125C9.25 17.8594 9.15625 17.9062 9.07031 17.9219ZM7.86719 17.9219C7.77344 17.9062 7.6875 17.8594 7.59375 17.8125L1.59375 14.4766C0.8125 14.0391 0.429688 13.5781 0.429688 12.4688V6.125C0.429688 5.94531 0.445312 5.79688 0.476562 5.65625L7.86719 9.79688V17.9219Z" fill="#828282"/>
                        </svg>

                        {/* Edit Batch text */}
                        <h1 className="text-zinc-500 text-[15px] text-base font-semibold font-['Be Vietnam Pro'] ml-2">Edit Batch</h1>
                    </div>

                    {/* Save button */}
                    <button className="text-zinc-500 text-[13px] font-semibold font-['Be Vietnam Pro'] hover:text-[#6C7CD1] ml-auto">Save</button>
                </nav>
            </div>

            ) : (
                // Display "Not available for this device" text for larger devices
                <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
                    Not available for this device.
                </div>
            )}
        
        {/* Expiration Warning */}
        <div className="flex bg-[#F2BBBB] p-4 mb-4 text-sm text-black" role="alert">
            <svg width="60" height="50" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '1rem' }}>
                <path d="M12.6797 25.2617C5.97656 25.2617 0.457031 19.7422 0.457031 13.0391C0.457031 6.34766 5.96484 0.816406 12.668 0.816406C18.8789 0.816406 24.082 5.57422 24.8086 11.5977C23.9531 11.375 22.8984 11.3398 22.0664 11.4922C21.3398 6.95703 17.4141 3.5 12.668 3.5C7.38281 3.5 3.15234 7.75391 3.15234 13.0391C3.15234 18.3242 7.39453 22.5781 12.6797 22.5781C13.793 22.5781 14.8711 22.3789 15.8555 22.0156C16.1719 22.8828 16.6523 23.6797 17.2734 24.3477C15.8438 24.9453 14.2852 25.2617 12.6797 25.2617ZM6.90234 14.6445C6.32812 14.6445 5.89453 14.1875 5.89453 13.625C5.89453 13.0508 6.32812 12.6055 6.90234 12.6055H11.6484V6.11328C11.6484 5.53906 12.1055 5.09375 12.668 5.09375C13.2422 5.09375 13.6875 5.53906 13.6875 6.11328V13.625C13.6875 14.1875 13.2422 14.6445 12.668 14.6445H6.90234ZM23.0508 25.2734C19.7227 25.2734 16.9688 22.5195 16.9688 19.168C16.9688 15.8398 19.7227 13.0859 23.0508 13.0859C26.3906 13.0859 29.1445 15.8398 29.1445 19.168C29.1445 22.4961 26.3672 25.2734 23.0508 25.2734ZM23.0508 20.1992C23.5547 20.1992 23.918 19.8477 23.9414 19.3672L24.0469 16.0859C24.0586 15.5117 23.6484 15.1133 23.0508 15.1133C22.4648 15.1133 22.0547 15.5117 22.0781 16.0859L22.1719 19.3672C22.1953 19.8477 22.5586 20.1992 23.0508 20.1992ZM23.0508 23.1992C23.707 23.1992 24.1992 22.7188 24.2109 22.0859C24.2109 21.4648 23.707 20.9727 23.0508 20.9727C22.4062 20.9727 21.9023 21.4531 21.9023 22.0859C21.9023 22.7188 22.4062 23.1992 23.0508 23.1992Z" fill="#A84E4E"/>
            </svg>
            <div>
                <span className="font-medium font-extrabold">Batch #ID</span> has exceeded the expiration date. Confirm Expiry to change the batch status.
                <span className="text-sm font-bold text-[#A74D4D] mt-4 font-vietnam"> Confirm Expiry Now.</span> 
            </div>
        </div>

        <div className="container mx-auto px-4">
            {/* Collection Details */}
            <h1 className="text-black text-base font-bold font-['Be Vietnam Pro']">Collection Details</h1>
            
            {/* Calendar Date Picker */}
            <h2 className="text-black text-sm font-medium font-['Be Vietnam Pro'] pt-3">Date</h2>
            <div className="relative max-w-sm flex items-center pt-3"> 
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
            <div class="relative max-w-sm flex items-center pt-3">
                <div class="h-10 bg-[#EFEFEF] leading-none border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 relative flex items-center justify-left">
                    <select name="hours" class="bg-transparent text-xs appearance-none outline-none border-none text-center">
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">10</option>
                    <option value="12">12</option>
                    </select>
                    <span class="text-s mr-3">:</span>
                    <select name="minutes" class="bg-transparent text-xs appearance-none outline-none mr-4 border-none">
                    <option value="00">00</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                    </select>
                    <select name="ampm" class="bg-transparent text-xs appearance-none outline-none border-none">
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
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
            <div className="relative max-w-sm flex items-center pt-3">
                <input 
                    id="weight" 
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

        </div>

        </div>
        
    );
} 
