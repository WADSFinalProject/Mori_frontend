import React, { useState } from "react";
import { useWindowSize } from 'react-use'; 
import hamburgBlack from '../../assets/hamburgBlack.png'; 
import settingsLogo from '../../assets/settingsLogo.png'; 
import { Link } from "react-router-dom";


export default function CentraNotif() {
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
                            <Link to="/navigation"> 
                                <img src={hamburgBlack} alt="divisions" className="text-6xl font-bold text-gray-700 w-5" />
                            </Link>
                            </div>
                            <p className="text-2xl ml-2 mt-3 font-bold text-black">Notifications</p>
                            <div className="flex">
                            <img src={settingsLogo} alt="notifications" className="text-6xl mr-2 font-bold text-gray-700 w-5" />
                            </div>
                        </div>
                        {/* <div className="flex">
                            <div className="flex items-center border rounded-lg border-gray-300 p-3 m-2 h-10">
                                <p className="text-gray-300">All</p>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-300 p-3 m-2 h-10">
                                <p className="text-gray-300">Read</p>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-300 p-3 m-2 h-10">
                                <p className="text-gray-300">Unread</p>
                            </div>
                        </div> */}



                    </div>

                    {/* notif cards */}

                    {/* today */}
                    <div className="mt-5 ml-5">
                        <h2 className="text-gray-500 text-xl font-bold">Today</h2>
                    </div>

                    <div className="m-5 relative rounded-lg" style={{ backgroundColor: "#CCE8EA" }}>
                        <div className="absolute top-4 right-4 h-4 w-4 rounded-full" style={{ backgroundColor: "#5D9EA4" }}></div>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">
                                        <span>09:00 AM -</span>
                                        <span> 2 minutes ago</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-5 relative rounded-lg" style={{ backgroundColor: "#CCE8EA" }}>
                        <div className="absolute top-4 right-4 h-4 w-4 rounded-full" style={{ backgroundColor: "#5D9EA4" }}></div>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">
                                        <span>09:00 AM -</span>
                                        <span> 2 minutes ago</span>
                                    </p>                                
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="m-5 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">
                                        <span>09:00 AM -</span>
                                        <span> 2 minutes ago</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* yesterday */}
                    <div className="mt-5 ml-5">
                        <h2 className="text-gray-500 text-xl font-bold">Yesterday</h2>
                    </div>

                    <div className="m-5 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">09:00 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-5 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">09:00 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* previous 7 days */}
                    <div className="mt-5 ml-5">
                        <h2 className="text-gray-500 text-xl font-bold">Previous 7 Days</h2>
                    </div>

                    <div className="m-5 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">09:00 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-5 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '300px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">09:00 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-5 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
                        <div className="flex flex-col items-start w-full">
                            <div className="relative">
                                <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                    <p><strong>Flouring Machine #ID</strong> has started</p>
                                    <p className="text-gray-500">09:00 AM</p>
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
