import React, { useState } from "react";
import { useWindowSize } from 'react-use'; 
import hamburgBlack from '../../assets/hamburgBlack.png'; 
import settingsLogo from '../../assets/settingsLogo.png'; 
import { Link } from "react-router-dom";


export default function XYZNotif() {
    const { width } = useWindowSize(); 
    const isMobile = width <= 640;

    return (
        <div>
            {isMobile ? (
                // Header
                <div className="bg-white">
                    <div
                        className="flex flex-col p-4 shadow-md bg-white" 
                        >
                        <div className="flex items-center justify-between mb-4"> {/* Added mb-4 for margin bottom */}
                            <div className="flex items-center">
                            <Link to="/XYZNavigation"> 
                                <img src={hamburgBlack} alt="divisions" className="text-6xl font-bold text-gray-700 w-5" />
                            </Link>
                            </div>
                            <p className="text-2xl ml-2 mt-3 font-bold text-black">Notifications</p>
                            <div className="flex">
                            <img src={settingsLogo} alt="notifications" className="text-6xl mr-2 font-bold text-gray-700 w-5" />
                            </div>
                        </div>
                        {/* filter buttons - OPTIONAL */}
                        <div className="flex">
                            <div className="flex items-center border rounded-lg border-gray-300 p-3 m-2 h-10">
                                <button><p className="text-gray-300">Shipping</p></button>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-300 p-3 m-2 h-10">
                                <button><p className="text-gray-300">Arrival</p></button>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-300 p-3 m-2 h-10">
                                <button><p className="text-gray-300">Done</p></button>
                            </div>
                        </div>



                    </div>

                    {/* notif cards */}
                    <div>
                        {/* today */}
                        <div className="mt-5 ml-5">
                            <h2 className="text-gray-500 text-xl font-bold">Today</h2>
                        </div>

                        {/* Unopened card */}
                        <div className="m-5 relative rounded-lg" style={{ backgroundColor: "#9AD1B380" }}>
                            <div className="absolute top-4 right-4 h-4 w-4 rounded-full" style={{ backgroundColor: "#4D946D" }}></div>
                            <div className="flex flex-col items-start w-full">
                                <div className="relative">
                                    <div className="ml-6 mb-5 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                        <p><strong>Package #ID</strong> is being delivered by John Doe</p>
                                        <p className="text-gray-500">
                                            <span>09:00 AM -</span>
                                            <span> 2 minutes ago</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="m-5 relative rounded-lg" style={{ backgroundColor: "#9AD1B380" }}>
                            <div className="absolute top-4 right-4 h-4 w-4 rounded-full" style={{ backgroundColor: "#4D946D" }}></div>
                            <div className="flex flex-col items-start w-full">
                                <div className="relative">
                                    <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                        <p><strong>Package #ID</strong> has arrived</p>
                                        <p className="text-gray-500">
                                            <span>09:00 AM -</span>
                                            <span> 2 minutes ago</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opened card */}
                        <div className="m-5 relative rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                            <div className="absolute top-4 right-4 h-4 w-4 rounded-full" style={{ backgroundColor: "" }}></div>
                            <div className="flex flex-col items-start w-full">
                                <div className="relative">
                                    <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                        <p><strong>Package #ID</strong> has arrived</p>
                                        <p className="text-gray-500">
                                            <span>09:00 AM -</span>
                                            <span> 2 minutes ago</span>
                                        </p>                                
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="m-5 relative rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                            <div className="absolute top-4 right-4 h-4 w-4 rounded-full" style={{ backgroundColor: "" }}></div>
                            <div className="flex flex-col items-start w-full">
                                <div className="relative">
                                    <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                        <p><strong>Package #ID</strong> has arrived</p>
                                        <p className="text-gray-500">
                                            <span>09:00 AM -</span>
                                            <span> 2 minutes ago</span>
                                        </p>                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                
            ) : (
                // Display "Not available for this device" text for larger devices
                <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
                    Not available for this device.
                </div>
            )}
        </div>
    );
}
