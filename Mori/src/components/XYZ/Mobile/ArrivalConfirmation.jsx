import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

const ArrivalConfirmation = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 1024;
  const [airwayBill, setAirwayBill] = useState("");
  const [weightReceived, setWeightReceived] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if both the shipping method and airway bill are provided
    if (weightReceived !== "" && airwayBill.trim() !== "") {
      setIsButtonDisabled(false); // Enable button if both conditions are met
    } else {
      setIsButtonDisabled(true); // Disable button if not
    }
  }, [weightReceived, airwayBill]);

  return (
    <>
      {isMobile ? (
        <div className="max-w-[640px] relative bg-slate-50 h-screen overflow-hidden text-left text-base text-zinc-500 font-vietnam ml-auto mr-auto">
          <header className="absolute mt-6 w-full flex flex-col items-center justify-between text-right text-xl">
            <div className="flex flex-row w-full">
              <button className="hover:cursor-pointer" onClick={null}>
                <svg
                  className="ml-5"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.81836 12.4297C2.81836 12.0977 2.96484 11.7656 3.19922 11.5312L9.5957 5.14453C9.86914 4.87109 10.1719 4.74414 10.4746 4.74414C11.1777 4.74414 11.666 5.24219 11.666 5.90625C11.666 6.25781 11.5195 6.55078 11.2949 6.77539L9.11719 8.98242L6.53906 11.3359L8.75586 11.209H20.2695C21.0117 11.209 21.5098 11.707 21.5098 12.4297C21.5098 13.1523 21.0117 13.6504 20.2695 13.6504H8.75586L6.53906 13.5234L9.11719 15.877L11.2949 18.084C11.5195 18.2988 11.666 18.5918 11.666 18.9531C11.666 19.6074 11.1777 20.1055 10.4746 20.1055C10.1719 20.1055 9.86914 19.9883 9.61523 19.7344L3.19922 13.3281C2.96484 13.0938 2.81836 12.7617 2.81836 12.4297Z"
                    fill="#828282"
                  />
                </svg>
              </button>
              <div className="flex-1 flex flex-row items-center justify-center gap-[8px] text-base">
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.95312 16.5078C4.48438 16.5078 0.804688 12.8281 0.804688 8.35938C0.804688 3.89844 4.48438 0.210938 8.94531 0.210938C13.4141 0.210938 17.1016 3.89844 17.1016 8.35938C17.1016 12.8281 13.4219 16.5078 8.95312 16.5078ZM8.08594 12.2422C8.39844 12.2422 8.67188 12.0859 8.85938 11.8047L12.5078 6.17188C12.625 5.99219 12.7188 5.78125 12.7188 5.59375C12.7188 5.15625 12.3281 4.85156 11.9062 4.85156C11.6328 4.85156 11.3984 5.00781 11.2109 5.29688L8.0625 10.3281L6.61719 8.51562C6.41406 8.26562 6.21094 8.16406 5.95312 8.16406C5.51562 8.16406 5.17188 8.51562 5.17188 8.95312C5.17188 9.16406 5.24219 9.35156 5.39844 9.54688L7.28125 11.8125C7.51562 12.1016 7.76562 12.2422 8.08594 12.2422Z" fill="#828282"/>
                </svg>

                <div className="relative font-semibold text-lg font-vietnam text-center select-none">
                  Arrival Confirmation
                </div>

                <div className="w-7 h-4 invisible"></div>
              </div>
            </div>

            <hr className="relative w-full h-0 border-2 border-[#d9d9d9] mt-5" />
          </header>

          <main className="absolute mt-24 w-full flex flex-col items-start justify-start px-5">
            <form id="shipment-form">
              {/* Shipping ID */}
              <div className="w-full justify-start items-start flex flex-col gap-2.5">
                <div className="text-black text-base font-semibold font-vietnam select-none">
                  Batch Information
                </div>

                <input
                  placeholder="Type..."
                  className="w-full py-3 px-4 bg-[#efefef] border-none rounded ring-0 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:border-none"
                  value={airwayBill}
                  onChange={(e) => setAirwayBill(e.target.value)}
                />

                <div className="w-full mt-2"></div>

                {/* Weight Received */}
                <div className="text-black text-base font-semibold font-vietnam mt-4 select-none">
                  Weight Received
                </div>

                <div className="w-full">
                    {/* Input field */}
                    <input
                        placeholder="Scale..."
                        className="w-full py-3 px-4 bg-[#efefef] border-none rounded ring-0 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:border-none pr-16"
                        value={weightReceived}
                        onChange={(e) => setWeightReceived(e.target.value)}
                    />
                    <div className="relative">
                        {/* SVG icon */}
                        <svg
                            className="absolute top-[-24px] right-2 transform -translate-y-1/2 w-4 h-4 text-black pointer-events-none"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0.98368 12.7794L2.52045 6.96979C2.65611 6.45685 2.91575 6.06129 3.29936 5.78309C3.68297 5.50054 4.16014 5.35926 4.73087 5.35926H11.1376C11.7083 5.35926 12.1855 5.50054 12.5691 5.78309C12.9527 6.06129 13.2123 6.45685 13.348 6.96979L14.8918 12.7794C15.0836 13.501 15.0204 14.0617 14.7023 14.4617C14.3889 14.8616 13.8579 15.0615 13.1094 15.0615H2.76605C2.01287 15.0615 1.47722 14.8616 1.15911 14.4617C0.845675 14.0617 0.787198 13.501 0.98368 12.7794ZM2.32397 12.8642C2.23508 13.1641 2.24912 13.3923 2.36607 13.5488C2.4877 13.7053 2.68652 13.7835 2.96253 13.7835H12.8989C13.1843 13.7835 13.3831 13.7053 13.4954 13.5488C13.6123 13.3923 13.6287 13.1641 13.5445 12.8642L12.0498 7.37405C11.9141 6.88285 11.5914 6.63725 11.0814 6.63725H4.78701C4.27709 6.63725 3.95664 6.88285 3.82565 7.37405L2.32397 12.8642ZM7.24303 6.31775V4.23125H8.62542V6.31775H7.24303ZM7.93773 4.86372C7.54945 4.86372 7.19391 4.77678 6.87112 4.60291C6.553 4.42468 6.29804 4.18778 6.10624 3.89219C5.91444 3.5966 5.81853 3.26841 5.81853 2.90762C5.81853 2.55117 5.91444 2.22298 6.10624 1.92305C6.29804 1.62311 6.553 1.38403 6.87112 1.20581C7.19391 1.02759 7.54945 0.938477 7.93773 0.938477C8.31666 0.938477 8.66518 1.02759 8.98329 1.20581C9.30609 1.38403 9.56572 1.62311 9.7622 1.92305C9.95869 2.22298 10.0569 2.55117 10.0569 2.90762C10.0569 3.26841 9.95869 3.5966 9.7622 3.89219C9.5704 4.18778 9.3131 4.42468 8.99031 4.60291C8.6722 4.77678 8.32134 4.86372 7.93773 4.86372ZM7.93773 3.79438C8.19971 3.79438 8.42426 3.70745 8.61138 3.53357C8.79851 3.35535 8.89207 3.1467 8.89207 2.90762C8.89207 2.66854 8.79617 2.45989 8.60437 2.28167C8.41724 2.10344 8.19503 2.01433 7.93773 2.01433C7.67575 2.01433 7.44887 2.10344 7.25706 2.28167C7.06994 2.45989 6.97637 2.66854 6.97637 2.90762C6.97637 3.1467 7.06994 3.35535 7.25706 3.53357C7.44887 3.70745 7.67575 3.79438 7.93773 3.79438Z" fill="black"/>
                        </svg>

                    </div>
                </div>


                <button
                  className="w-full mt-3 py-2 bg-[#217045] text-white rounded-md select-none hover:bg-[#9AD1B380]/90 disabled:cursor-not-allowed disabled:bg-[#176e76]/50"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Confirm Shipment
                </button>
              </div>
            </form>
          </main>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </>
  );
};

export default ArrivalConfirmation;
