import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createExpedition } from "../../../service/expeditionService";
import { BatchShipped } from "../../../service/batches";

const ArrangeShipment = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 1024;
  const [shippingMethod, setShippingMethod] = useState("");
  const [airwayBill, setAirwayBill] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { batches } = location.state || { batches: [] };

  useEffect(() => {
    console.log("Selected batches: ", batches); // Verify that batches are received
  }, [batches]);

  useEffect(() => {
    // Check if both the shipping method and airway bill are provided
    if (shippingMethod !== "" && airwayBill.trim() !== "") {
      setIsButtonDisabled(false); // Enable button if both conditions are met
    } else {
      setIsButtonDisabled(true); // Disable button if not
    }
  }, [shippingMethod, airwayBill]); // This effect depends on changes to shippingMethod and airwayBill

  const kurir = [
    "JNE",
    "J&T",
    "Pos Indonesia",
    "TIKI",
    "SiCepat",
    "REX",
    "Wahana",
    "Ninja Express",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalWeight = batches.reduce(
      (sum, batch) => sum + parseFloat(batch.weight),
      0
    );
    const totalPackages = batches.length;

    // Get the current date in UTC
    const expeditionDate = new Date();

    // Manually adjust to WITA (UTC+8)
    expeditionDate.setHours(expeditionDate.getHours() + 8);

    const estimatedArrival = new Date(expeditionDate);
    estimatedArrival.setDate(expeditionDate.getDate() + 5);

    try {
      const response = await createExpedition(
        airwayBill.toString(),
        estimatedArrival.toISOString(),
        totalPackages,
        totalWeight,
        expeditionDate.toISOString(),
        shippingMethod,
        batches.map((batch) => batch.id)
      );

      // Mark each batch as shipped
      await BatchShipped({ batch_ids: batches.map((batch) => batch.id) });

      alert("Expedition created successfully!");
      navigate("/centra/shipping"); // Navigate back to shipping page after successful creation
    } catch (error) {
      console.error("Error creating expedition: ", error);
      alert("Failed to create expedition. Please try again.");
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="max-w-[640px] relative bg-slate-50 h-screen overflow-hidden text-left text-base text-zinc-500 font-vietnam ml-auto mr-auto">
          <header className="absolute mt-6 w-full flex flex-col items-center justify-between text-right text-xl">
            <div className="flex flex-row w-full">
              <Link to="/centra/shipping" className="hover:cursor-pointer">
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
              </Link>
              <div className="flex-1 flex flex-row items-center justify-center gap-[8px] text-base">
                <svg
                  width="25"
                  height="21"
                  viewBox="0 0 25 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 13.0547C15.2734 13.6562 14.8359 14.5703 14.8359 15.5938C14.8359 15.7578 14.8516 15.9141 14.875 16.0703H10.1562C10.1875 15.9141 10.1953 15.7578 10.1953 15.6016C10.1953 13.6719 8.625 12.0938 6.69531 12.0938C4.75781 12.0938 3.1875 13.6719 3.1875 15.6016C3.1875 15.7578 3.19531 15.9141 3.22656 16.0625H2.78906C1.32812 16.0625 0.539062 15.1406 0.539062 13.625V3.25C0.539062 1.66406 1.40625 0.796875 2.99219 0.796875H13.5547C15.1328 0.796875 16 1.67188 16 3.25V13.0547ZM17.125 5.11719H19.2266C20.0781 5.11719 20.6562 5.32812 21.1719 5.90625L23.8984 8.97656C24.375 9.52344 24.5078 9.92188 24.5078 10.7734V13.625C24.5078 15.1562 23.7031 16.0781 22.2109 16.0781H21.8047C21.8359 15.9141 21.8516 15.7578 21.8516 15.5938C21.8516 13.6641 20.2578 12.0938 18.3203 12.0938C17.8906 12.0938 17.4844 12.1875 17.125 12.3516V5.11719ZM19.4609 10.3984H22.6641C22.6406 10.2188 22.5547 10.0859 22.4375 9.94531L20.1562 7.375C19.8672 7.05469 19.6484 6.98438 19.2734 6.98438H18.6719V9.60938C18.6719 10.0938 18.9766 10.3984 19.4609 10.3984ZM18.3438 18.1094C16.9609 18.1094 15.8359 16.9844 15.8359 15.5938C15.8359 14.2109 16.9609 13.0859 18.3438 13.0859C19.7266 13.0859 20.8516 14.2109 20.8516 15.5938C20.8516 17 19.7344 18.1094 18.3438 18.1094ZM6.69531 18.1094C5.30469 18.1094 4.17969 16.9844 4.17969 15.6016C4.17969 14.2188 5.30469 13.0938 6.69531 13.0938C8.07812 13.0938 9.20312 14.2188 9.20312 15.6016C9.20312 16.9844 8.07812 18.1094 6.69531 18.1094Z"
                    fill="#828282"
                  />
                </svg>

                <div className="relative font-semibold text-lg font-vietnam text-center select-none">
                  Arrange Shipment
                </div>

                <div className="w-7 h-4 invisible"></div>
              </div>
            </div>

            <hr className="relative w-full h-0 border-2 border-[#d9d9d9] mt-5" />
          </header>

          <main className="absolute mt-24 w-full flex flex-col items-start justify-start px-5">
            <form id="shipment-form" onSubmit={handleSubmit}>
              <div className="w-full justify-start items-start flex flex-col gap-2.5">
                <div className="text-black text-base font-semibold font-vietnam select-none">
                  Shipping Method
                </div>

                <select
                  className="w-full bg-[#efefef] rounded border-none py-3 hover:cursor-pointer select-none"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                >
                  <option value={""}>Choose</option>
                  <option value="JNE">JNE</option>
                  <option value="SiCepat">SiCepat</option>
                  <option value="J&T">J&T</option>
                  <option value="Pos Indonesia">Pos Indonesia</option>
                  <option value="Tiki">Tiki</option>
                  <option value="Ninja Express">Ninja Express</option>
                  <option value="Lion Parcel">Lion Parcel</option>
                  <option value="Anteraja">Anteraja</option>
                  <option value="Wahana">Wahana</option>
                </select>

                <div className="text-black text-base font-semibold font-vietnam mt-4 select-none">
                  Input Airway Bill (Shipping ID)
                </div>

                <input
                  placeholder="Type..."
                  className="w-full py-3 px-4 bg-[#efefef] border-none rounded ring-0 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:border-none"
                  value={airwayBill}
                  onChange={(e) => setAirwayBill(e.target.value)}
                />

                <div className="w-full mt-2">
                  <span className="text-zinc-500 text-md font-semibold font-vietnam leading-none">
                    How to check your airway bill?
                    <br />
                  </span>
                  <span className="text-zinc-500 text-md font-normal font-vietnam leading-none">
                    Your air waybill is an 11 digit number, normally located on
                    your carrier's shipping label, but you may also find it in
                    any of their email communications or directly from your
                    online account.
                  </span>
                </div>

                <button
                  className="w-full mt-3 py-2 bg-[#176E76] text-white rounded-md select-none hover:bg-[#176E76]/90 disabled:cursor-not-allowed disabled:bg-[#176e76]/50"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Arrange Shipment
                </button>
              </div>
            </form>
          </main>
        </div>
      ) : (
        // Display "Not available for this device" text for larger devices
        <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </>
  );
};

export default ArrangeShipment;
