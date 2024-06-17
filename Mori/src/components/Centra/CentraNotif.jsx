import React, { useState, useEffect } from "react";
import { useWindowSize } from 'react-use'; 
import { Link, useNavigate } from "react-router-dom";
import { getNotifications } from '../../service/notifications'; 

export default function CentraNotif() {
    const { width } = useWindowSize(); 
    const isMobile = width <= 640;

    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const centraid = 1; // Replace this with the actual centraid

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotifications(centraid);
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
    }, [centraid]);

    return (
        <div>
            {isMobile ? (
                <div className="bg-white mt-5">
                    <header className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full text-left text-base text-black font-vietnam">
                        <nav className="m-0 self-stretch flex flex-row items-start justify-start py-0 pr-6 pl-5 box-border max-w-full">
                            <div className="m-0 flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] text-right text-xl text-[#828282] font-vietnam">
                                <div className="flex flex-row items-start justify-start gap-[20px]">
                                    <div className="flex flex-row items-start justify-start">
                                        <h3 className="m-0 w-6 relative text-inherit tracking-[-0.02em] font-semibold font-inherit inline-block min-w-[24px]">
                                            <button onClick={() => navigate(-1)}>
                                                <svg
                                                    className="w-[26px] h-[26px] text-gray-800"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="26"
                                                    height="26"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2.5"
                                                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                                                    />
                                                </svg>
                                            </button>
                                        </h3>
                                    </div>
                                    <h3 className="m-0 relative text-inherit font-bold font-vietnam text-black text-left inline-block min-w-[89px]">
                                        Notifications
                                    </h3>
                                </div>
                                <div className="flex flex-row items-start justify-start gap-[15px] text-left text-black">
                                    <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                                        {/* Add any additional content here if necessary */}
                                    </div>
                                    <h3 className="m-0 relative text-[22px] tracking-[-0.02em] font-bold font-inherit inline-block min-w-[28px]">
                                        <Link to="/centra/navigation">
                                            <svg
                                                className="w-[30px] h-[30px] text-gray-800"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeWidth="2.5"
                                                    d="M5 7h14M5 12h14M5 17h14"
                                                />
                                            </svg>
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </nav>
                    </header>

                    <div>
                        <div className="mt-5 ml-5">
                            <h2 className="text-gray-500 text-xl font-bold">Today</h2>
                        </div>

                        {notifications.length > 0 ? (
                            notifications.map((notif, index) => (
                                <div key={index} className={`m-5 relative rounded-lg ${notif.read ? 'bg-[#EFEFEF]' : 'bg-[#CCE8EA]'}`}>
                                    <div className={`absolute top-4 right-4 h-4 w-4 rounded-full ${notif.read ? 'bg-[#FFF]' : 'bg-[#5D9EA4]'}`}></div>
                                    <div className="flex flex-col items-start w-full">
                                        <div className="relative">
                                            <div className="ml-6 mt-5" style={{ position: 'relative', width: '250px', height: '75px' }}>
                                                <p><strong>{notif.message}</strong></p>
                                                <p className="text-gray-500">
                                                    <span>{new Date(notif.timestamp).toLocaleString()}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="mt-5 ml-5">
                                <h2 className="text-gray-500 text-xl font-bold">No notifications found</h2>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
                    Not available for this device.
                </div>
            )}
        </div>
    );
}
