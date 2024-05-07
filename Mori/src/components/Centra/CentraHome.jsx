import React from "react";
import { useWindowSize } from 'react-use'; // Import useWindowSize hook from react-use library
import moriLogo from '../../assets/moriWhite.png'; 
import bell from '../../assets/bell.png'; 
import hamburg from '../../assets/hamburg.png'; 
import bg from '../../assets/usercardBG.png'; 
import collector from '../../assets/collectorLogo.png'; 
import processor from '../../assets/processorLogo.png'; 
import shipping from '../../assets/shippingLogo.png'; 
import { Doughnut } from 'react-chartjs-2'; 
import { Link } from "react-router-dom";

  
  const wetLeavesDataMachine1 = {
    labels: ['Filled', 'Empty'],
    datasets: [
      {
        data: [10, 20], // Sample data, replace with your actual data
        backgroundColor: ['#0F3F43', '#99D0D5'], // Set colors for the doughnut segments
        hoverBackgroundColor: ['#0F3F43', '#99D0D5'], // Set hover colors if needed
      },
    ],
  };

  const gaugeOptions = {
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
  };
  

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
                <div className="bg-[#F0F0F0]">
                    <div
                        className="flex flex-col p-4 shadow-md" // Changed to flex-col to stack the sections vertically
                        style={{
                            backgroundImage: `url(${bg})`, // Set the background image
                            backgroundSize: 'cover', // Cover the entire background
                            backgroundRepeat: 'no-repeat', // Don't repeat the background image
                        }}
                        >
                        <div className="flex items-center justify-between mb-4"> {/* Added mb-4 for margin bottom */}
                            <div className="flex items-center">
                            <Link to="/navigation"> 
                                <img src={hamburg} alt="divisions" className="text-6xl font-bold text-gray-700 w-5" />
                            </Link>
                            </div>
                            <img src={moriLogo} alt="mori logo" className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-20" />
                            <div className="flex">
                            <img src={bell} alt="notifications" className="text-6xl mr-2 font-bold text-gray-700 w-5" />
                            </div>
                        </div>
                        <div className="flex p-3">
                            <div className="ml-3">
                            <div className="w-10 h-10 bg-black rounded-full">
                                {/* to put an icon or image inside the circle */}
                            </div>
                            </div>
                            <div>
                            <p className="text-xs ml-3 text-white font-semibold">Selamat pagi,</p>
                            <p className="text-xl ml-3 text-white font-semibold">John Doe</p>
                            </div>
                        </div>
                    </div>


                    {/* Quick Access */}
                    <div className=" p-5">
                            <div className="mt-">
                                <h2 className="text-gray-600 font-bold">Quick Access</h2>
                            </div>
                            <div className="flex">
                                <Link to="/collector">
                                <div className= "mt-3 mr-3 rounded-lg flex justify-center items-center" style={{ width: "110px", height: "100px", backgroundColor: "#5D9EA4"}}>
                                    <img src={collector} alt="mori logo" className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-6" />
                                    <p className="text-white text-center font-semibold">Collector</p>
                                </div>
                                </Link>

                                <Link to="/processor">
                                <div className="bg-white mt-3 rounded-lg flex justify-center items-center" style={{ width: "110px", height: "100px", backgroundColor: "#4D946D" }}>
                                    <p className="text-white text-center font-semibold">Processor</p>
                                </div>
                                </Link>

                                <Link to="/shipping">
                                <div className="bg-white mt-3 ml-3 rounded-lg flex justify-center items-center" style={{ width: "110px", height: "100px", backgroundColor: "#606060" }}>
                                    <p className="text-white text-center font-semibold">Shipping</p>
                                </div>
                                </Link>
                            </div>
                        </div>

                    {/* Machines Overview */}
                    <div className="p-5">
                        <div>
                            <div>
                                <h2 className="text-gray-600 font-bold">Machine Stock Status</h2>
                            </div>
                            <div className="bg-white mt-3 rounded-lg">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <p className="absolute mt-3 top-0 left-0 px-3 py-1 bg-black text-white rounded-full font-semibold">1</p>
                                        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                                            <Doughnut data={wetLeavesDataMachine1} options={gaugeOptions} />
                                            <div style={{ position: 'absolute', top:'60%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                                <span style={{ fontSize: '30px', fontWeight: 'bold' }}>10kg</span> {/* Placeholder label */}                                    
                                            </div>
                                            <div style={{ position: 'absolute', top:'72%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>/30kg</span> {/* Placeholder label */}
                                            </div>
                                            <hr className="border-t- border-gray-300"/>
                                        </div> 
                                    </div>
                                    <div className="relative">
                                        <p className="absolute mt-3 top-0 left-0 px-3 py-1 bg-black text-white rounded-full font-semibold">2</p>
                                        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                                            <Doughnut data={wetLeavesDataMachine1} options={gaugeOptions} />
                                            <div style={{ position: 'absolute', top:'60%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                                <span style={{ fontSize: '30px', fontWeight: 'bold' }}>10kg</span> {/* Placeholder label */}                                    
                                            </div>
                                            <div style={{ position: 'absolute', top:'72%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>/30kg</span> {/* Placeholder label */}
                                            </div>
                                        </div> 
                                    </div>
                                    {/* {line here} */}
                                    <div className="relative">
                                        <p className="absolute mt-3 top-0 left-0 px-3 py-1 bg-black text-white rounded-full font-semibold">3</p>
                                        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                                            <Doughnut data={wetLeavesDataMachine1} options={gaugeOptions} />
                                            <div style={{ position: 'absolute', top:'60%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                                <span style={{ fontSize: '30px', fontWeight: 'bold' }}>10kg</span> {/* Placeholder label */}                                    
                                            </div>
                                            <div style={{ position: 'absolute', top:'72%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>/30kg</span> {/* Placeholder label */}
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                        {/* Footer */}
                        <footer className="bg-gray-200 text-black flex justify-between items-center h-10 px-3">
                            <p className="font-semibold">@2024 AMIN</p>
                            <p className="font-semibold">CENTRA</p>
                        </footer>

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
