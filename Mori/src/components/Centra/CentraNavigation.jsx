import React from "react";
import { useWindowSize } from 'react-use'; // Import useWindowSize hook from react-use library
import x from '../../assets/x.png'; 
import { Link } from "react-router-dom";
import homeNav from '../../assets/homeNav.png';
import collectorNav from '../../assets/collectorNav.png';
import processorNav from '../../assets/processorNav.png';
import shippingNav from '../../assets/shippingNav.png';
import helpNav from '../../assets/helpNav.png';
import logoutNav from '../../assets/logoutNav.png';

export default function CentraNavigation() {
    const { width } = useWindowSize(); // Get the window width using the useWindowSize hook

    // Check if the window width is greater than a mobile device width (e.g., 640px)
    const isMobile = width <= 640;

    return (
        <div>
            <style>
                {`
                .bg-custom-c16548 {
                    background-color: #C16548;
                }
                .bg-custom-86b788 {
                    background-color: #86B788;
                }
                .bg-custom-f4df67 {
                    background-color: #F4DF67;
                }
                `}
            </style>
            {isMobile ? (
                // Header
                <div>
                    <div className="flex items-center justify-between  p-4 shadow-md">
                        <div className="flex items-center">
                        <p className="text-xl ml-2 mt-4 font-semibold">Divisions</p>
                        </div>
                        <div className="flex">
                            <Link to="/centrahome"> 
                                <img src={x} alt="back" className="text-6xl mt-4 mr-2 font-bold text-gray-700 w-5" />
                            </Link>
                        </div>
                    </div>
                    <hr className="w-full border-t-2 border-gray-300"/>
                    <div>
                        <div className="flex flex-col ml-8 mt-8">
                            <Link to="/centrahome" className="flex items-center">
                                <img src={homeNav} alt="mori logo" className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-5" />
                                <p className="text-l ml-4 mt-3">Main Page</p>
                            </Link>
                        </div>

                        <div className="flex flex-col ml-10 mt-8">
                            <Link to="/collectormain" className="flex items-center">
                                <img src={collectorNav} alt="mori logo" className="text-6xl mt-3 font-bold text-gray-700 w-5" />
                                <p className="text-l ml-4 mt-3">Collector</p>
                            </Link>
                        </div>

                        <div className="flex flex-col ml-10 mt-8">
                            <Link to="/centraprocessor" className="flex items-center">
                                <img src={processorNav} alt="mori logo" className="text-6xl mt-3 font-bold text-gray-700 w-5" />
                                <p className="text-l ml-4 mt-3">Processor</p>
                            </Link>
                        </div>

                        <div className="flex flex-col ml-10 mt-8">
                            <Link to="/centrashipping" className="flex items-center">
                                <img src={shippingNav} alt="mori logo" className="text-6xl mt-3 font-bold text-gray-700 w-5" />   
                                <p className="text-l ml-4 mt-3">Shipping</p>
                            </Link>
                        </div>
                    </div>


                    <br />
                    <hr className="w-full border-t-2 border-gray-300"/>

                    <div>
                        <div className="flex flex-col ml-8 mt-8">
                            <Link to="/collector" className="flex items-center">
                                <img src={helpNav} alt="mori logo" className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-5" />
                                <p className="text-l ml-4 mt-3">Help Centre</p>
                            </Link>
                        </div>

                        <div className="flex flex-col ml-10 mt-8">
                            <Link to="/collector" className="flex items-center">
                                <img src={logoutNav} alt="mori logo" className="text-6xl mt-3 font-bold text-gray-700 w-5" />
                                <p className="text-l ml-4 mt-3">Log Out</p>
                            </Link>
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