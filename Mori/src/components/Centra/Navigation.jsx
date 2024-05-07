import React from "react";
import { useWindowSize } from 'react-use'; // Import useWindowSize hook from react-use library
import x from '../../assets/x.png'; 
import { Link } from "react-router-dom";

export default function CentraHome() {
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
                        <Link to="/collector"><p className="text-l ml-10 mt-8">Collector</p></Link>
                        <Link to="/processor"><p className="text-l ml-10 mt-8">Processor</p></Link>
                        <Link to="/shipping"><p className="text-l ml-10 mt-8">Shipping</p></Link>
                    </div>
                    <br />
                    <hr className="w-full border-t-2 border-gray-300"/>
                    <div>
                        <p className="text-l ml-10 mt-8">Help Centre</p>
                        <p className="text-l ml-10 mt-8">Log Out</p>                    </div>
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