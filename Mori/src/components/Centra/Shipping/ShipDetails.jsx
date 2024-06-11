import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';
import truck from '../../../assets/truck.png';
import back from '../../../assets/back.png';
import packIcon from '../../../assets/greenpackage.png';
import point from '../../../assets/point.png';
import greenpoint from '../../../assets/greenpoint.png';
import GreenTruck from '../../../assets/GreenTruck.png';
import darkgreenpoint from '../../../assets/DarkGreenPoint.png';
import RedTruck from '../../../assets/RedTruck.png';
import RedPoint from '../../../assets/RedPointer.png';
import neoTruck from '../../../assets/neotruck.png';  // Add your neotruck.png here
import neoPoint from '../../../assets/neopoint.png';  // Add your neopoint.png here

export default function ShipDetails() {
    const { width } = useWindowSize();
    const isMobile = width <= 640;
    const date = "Monday, 18 March 2024";
    const delivService = "JNE Regular";
    const delivStatus = "JNE Standard - JNE102392130";
    const delivType = "Regular";
    const preparingTime = "18-03-2024 08:40 PM"; 
    const [shipmentState, setShipmentState] = useState('Shipped'); // Default state is 'Missing'

    const batches = [
        { id: 10201, weight: '23 kg', driedDate: '11/11/25', flouredDate: '11/11/25' },
        { id: 10202, weight: '23 kg', driedDate: '11/11/25', flouredDate: '11/11/25' },
        { id: 10203, weight: '21 kg', driedDate: '11/11/25', flouredDate: '11/11/25' },
        { id: 10204, weight: '40 kg', driedDate: '11/11/25', flouredDate: '11/11/25' },
    ];

    const totalWeight = batches.reduce((acc, batch) => {
        const batchWeight = parseFloat(batch.weight.replace('kg', '').trim());
        return acc + batchWeight;
    }, 0).toFixed(1) + ' kg';

    return (
        <div className={isMobile ? "mb-16" : "" } style={{ paddingBottom: '40px' }}>
            {isMobile ? (
                <>
                    <div className="mt-3 p-5 shadow-md flex items-center justify-between bg-white">
                        <Link to="/centrashipping" className="flex items-center">
                            <img src={back} alt="back" className="w-4 h-4" />
                        </Link>
                        <div className="flex items-center flex-grow justify-center">
                            <img src={truck} alt="truck" className="w-5 h-5 mr-1" />
                            <span className="font-bold text-md lg:text-lg font-vietnam" style={{ color: '#828282' }}>Shipment Details</span>
                        </div>
                        <div className="w-4 h-4"></div>
                    </div>

                    {shipmentState === 'Shipped' && (
                        <>
                            <div className="p-3 shadow-md flex items-start" style={{ backgroundColor: '#B4E0CC' }}>
                                <img src={packIcon} alt="Package" className="w-6 h-6 mr-2" />
                                <div className="flex flex-col justify-between">
                                    <h2 className="font-bold text-md lg:text-lg font-vietnam" style={{ color: '#217045' }}>Shipped</h2>
                                    <p className="text-xs lg:text-sm font-vietnam">Estimated Arrival <strong>{date}</strong></p>
                                    <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>Shipped with {delivService}</p>
                                </div>
                            </div>
                            <div className="p-3 shadow-md" style={{ backgroundColor: '#ffffff' }}>
                                <div className="flex">
                                    <img src={point} alt="Point" className="h-6 mr-3" />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="font-bold text-md lg:text-lg font-vietnam">Shipping Information</h2>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivType}</p>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivStatus}</p>
                                            </div>
                                            <button className="text-red-500 text-m lg:text-sm font-semibold self-start mr-2 font-vietnam" style={{ color: '#5D9EA4' }}>Track</button>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={greenpoint} alt="Green Point" className="w-3 h-7 mr-2" />
                                            <div className="flex flex-col">
                                                <span className="text-xs lg:text-sm font-bold font-vietnam" style={{ color: '#9AD1B3' }}>Preparing to ship</span>
                                                <span className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{preparingTime} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {shipmentState === 'Delivering' && (
                        <>
                            <div className="p-3 shadow-md flex items-start" style={{ backgroundColor: '#4D946D' }}>
                                <img src={GreenTruck} alt="Package" className="w-6 h-5 mr-2" />
                                <div className="flex flex-col justify-between">
                                    <h2 className="font-bold text-md lg:text-lg font-vietnam" style={{ color: '#B8F3D3' }}>To deliver</h2>
                                    <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#FFFFFF' }}>Estimated Arrival <strong>{date}</strong></p>
                                    <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#D3D3D3' }}>Shipped with {delivService}</p>
                                </div>
                            </div>
                            <div className="p-3 shadow-md" style={{ backgroundColor: '#ffffff' }}>
                                <div className="flex">
                                    <img src={point} alt="Point" className="h-6 mr-3" />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="font-bold text-md lg:text-lg font-vietnam">Shipping Information</h2>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivType}</p>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivStatus}</p>
                                            </div>
                                            <button className="text-red-500 text-m lg:text-sm font-semibold self-start mr-2 font-vietnam" style={{ color: '#5D9EA4' }}>Track</button>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={darkgreenpoint} alt="Dark Green Point" className="w-3 h-7 mr-2" />
                                            <div className="flex flex-col">
                                                <span className="text-xs lg:text-sm font-bold font-vietnam" style={{ color: '#4D946D' }}>Package received by delivery service</span>
                                                <span className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{preparingTime} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {shipmentState === 'Missing' && (
                        <>
                            <div className="p-3 shadow-md flex items-start" style={{ backgroundColor: '#CD484870' }}>
                                <img src={RedTruck} alt="Package" className="w-6 h-5 mr-2" />
                                <div className="flex flex-col justify-between">
                                    <h2 className="font-bold text-md lg:text-lg font-vietnam" style={{ color: '#852222' }}>Missing</h2>
                                    <p className="text-xs lg:text-sm font-vietnam">
                                        This package is missing. <strong style={{fontWeight: 'bold'}}>Contact</strong> <strong style={{fontWeight: 'bold', textDecoration: 'underline'}}>Harbour Guard</strong> for confirmation or <strong style={{fontWeight: 'bold'}}>Delivery Service</strong> for <strong style={{fontWeight: 'bold'}}>further information.</strong>
                                    </p>
                                    <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>Shipped with {delivService}</p>
                                </div>
                            </div>
                            <div className="p-3 shadow-md" style={{ backgroundColor: '#ffffff' }}>
                                <div className="flex">
                                    <img src={point} alt="Point" className="h-6 mr-3" />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="font-bold text-md lg:text-lg font-vietnam">Shipping Information</h2>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivType}</p>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivStatus}</p>
                                            </div>
                                            <button className="text-red-500 text-m lg:text-sm font-semibold self-start mr-2 font-vietnam" style={{ color: '#5D9EA4' }}>Track</button>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={RedPoint} alt="Red Point" className="w-3 h-7 mr-2" />
                                            <div className="flex flex-col">
                                                <span className="text-xs lg:text-sm font-bold font-vietnam" style={{ color: '#852222' }}>Package received by teras</span>
                                                <span className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{preparingTime} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {shipmentState === 'Completed' && (
                        <>
                            <div className="p-3 shadow-md flex items-start" style={{ backgroundColor: '#848948' }}>
                                <img src={neoTruck} alt="Package" className="w-6 h-5 mr-2" />
                                <div className="flex flex-col justify-between">
                                    <h2 className="font-bold text-md lg:text-lg font-vietnam" style={{ color: '#F2F9A9' }}>Completed</h2>
                                    <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#FFFFFF' }}>Estimated Arrival <strong>{date}</strong></p>
                                    <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#D3D3D3' }}>Shipped with {delivService}</p>
                                </div>
                            </div>
                            <div className="p-3 shadow-md" style={{ backgroundColor: '#ffffff' }}>
                                <div className="flex">
                                    <img src={point} alt="Neo Point" className="h-6 mr-3" />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="font-bold text-md lg:text-lg font-vietnam">Shipping Information</h2>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivType}</p>
                                                <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{delivStatus}</p>
                                            </div>
                                            <button className="text-red-500 text-m lg:text-sm font-semibold self-start mr-2 font-vietnam" style={{ color: '#5D9EA4' }}>Track</button>
                                        </div>
                                        <div className="flex items-center">
                                            <img src={neoPoint} alt="Neo Point" className="w-3 h-7 mr-2" />
                                            <div className="flex flex-col">
                                                <span className="text-xs lg:text-sm font-bold font-vietnam" style={{ color: '#848948' }}>Package received by Orang Rumah</span>
                                                <span className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282' }}>{preparingTime} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="batch-info-container p-3 shadow-md bg-white" style={{ paddingBottom: '30px' }}> 
                        <div>
                            <h2 className="font-bold text-md lg:text-lg font-vietnam">Batch Information</h2>
                            <hr className="mt-1" style={{ borderColor: '#E5E7EB', borderWidth: '1px', height: 0 }} />
                        </div>
                        {batches.map((batch, index) => (
                            <React.Fragment key={batch.id}>
                                <div className="flex justify-between items-start mt-2">
                                    <div className="text-left">
                                        <p className="font-bold text-md lg:text-lg font-vietnam">Batch #{batch.id}</p>
                                        <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282'}}>Dried Date</p>
                                        <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282'}}>Floured Date</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-md lg:text-lg font-vietnam" style={{ color: '#5D9EA4' }}>{batch.weight}</span>
                                        <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282'}}> {batch.driedDate}</p>
                                        <p className="text-xs lg:text-sm font-vietnam" style={{ color: '#828282'}}> {batch.flouredDate}</p>
                                    </div>
                                </div>
                                {index < batches.length - 1 && <hr className="my-2" />}
                            </React.Fragment>
                        ))}
                        <hr className="my-2" /> 
                        <div className="flex justify-between">
                            <h3 className="font-bold text-md lg:text-lg font-vietnam">Total Weight</h3>
                            <h3 className="font-bold text-md lg:text-lg font-vietnam" style={{ color: '#5D9EA4'}}>{totalWeight}</h3>
                        </div>
                    </div>

                    {/* Buttons placed at the bottom */}
                    <div className="flex left-0 right-0 p-3 bg-white flex justify-between">
                        <button className="flex-1 mr-2 border-3 bg-[#CD484866] text-[#852222] hover:bg-red-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98] py-2 px-4 rounded font-vietnam">
                            Report Missing
                        </button>
                        <button className="flex-1 ml-2 border-3 bg-[#4D946D] text-[#FFFFFF] hover:bg-green-700 hover:text-white duration-300 cursor-pointer active:scale-[0.98] py-2 px-4 rounded font-vietnam">
                            Confirm Shipment
                        </button>
                    </div>
                    <footer className="bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
                        <p className="font-semibold">@2024 AMIN</p>
                        <p className="font-semibold">CENTRA</p>
                    </footer>
                </>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-gray-600">Not available for this device.</p>
                </div>
            )}
        </div>
    );
}
