import React from 'react';
import { useWindowSize } from 'react-use';

export default function CentraNotif() {
    const { width } = useWindowSize();
    const isMobile = width <= 10000;
  
    return (
        <div className={isMobile ? "mb-16" : ""}>
            {isMobile ? (
                <>
                    <div className="max-w-[640px] h-screen relative bg-[#F0F0F0] overflow-hidden flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border gap-[24px] leading-[normal] tracking-[normal] ml-auto mr-auto">

                    {/* Header */}
                    <header className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full text-left text-base text-black font-vietnam">
                        <nav className="m-0 self-stretch flex flex-row items-start justify-start py-0 pr-6 pl-5 box-border max-w-full">
                        <nav className="m-0 flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] text-right text-xl text-gray-100 font-vietnam">
                            <div className="flex flex-row items-start justify-start gap-[20px]">
                            <div className="flex flex-row items-start justify-start">
                                <h3 className="m-0 w-6 relative text-inherit tracking-[-0.02em] font-semibold font-inherit inline-block min-w-[24px]">
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
                                </h3>
                            </div>
                            <h3 className="m-0 relative text-inherit font-bold font-vietnam text-gray-950 text-left inline-block min-w-[89px]">
                                Collectors
                            </h3>
                            </div>
                            <div className="flex flex-row items-start justify-start gap-[15px] text-left text-black">
                            <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                                <h3 className="m-0 relative text-inherit tracking-[-0.02em] font-bold font-inherit inline-block min-w-[24px]">
                                <svg
                                    className="w-[26px] h-[26px] text-gray-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                                </svg>
                                </h3>
                            </div>
                            <h3 className="m-0 relative text-[22px] tracking-[-0.02em] font-bold font-inherit inline-block min-w-[28px]">
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
                            </h3>
                            </div>
                        </nav>
                        </nav>
                    </header>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-gray-600">Not available for this device.</p>
                </div>
            )}
        </div>
    );
}
