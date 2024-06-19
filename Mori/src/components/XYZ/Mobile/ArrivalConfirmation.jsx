import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import scale from '../../../assets/scale.png';
import { createPackageReceipt } from "../../../service/packageReceiptService";
import { readExpeditions } from "../../../service/expeditionService";


const ArrivalConfirmation = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 1024;

  const [batches, setBatches] = useState([
    { id: "Batch #1", weight: "" },
    { id: "Batch #2", weight: "" },
    { id: "Batch #3", weight: "" }
  ]);

  const [guardOnDuty, setGuardOnDuty] = useState("");
  const [notes, setNotes] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [lastExpeditionId, setLastExpeditionId] = useState(null);

  const getTotalWeight = () => {
    return batches.reduce((total, batch) => {
      return total + (parseFloat(batch.weight) || 0);
    }, 0).toFixed(1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    readExpeditions(0, 100)
      .then((res) => {
        const expeditions = res.data;
        if (expeditions.length > 0) {
          const latestExpedition = expeditions[expeditions.length - 1];
          const expeditionID = latestExpedition.expedition.ExpeditionID;
          setLastExpeditionId(expeditionID);
          console.log('Fetched Expedition ID:', expeditionID);
        } else {
          console.error('No expeditions found or incorrect data format.');
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  useEffect(() => {
    const anyWeightEntered = batches.some(batch => batch.weight !== "");
    setIsButtonDisabled(!anyWeightEntered);
  }, [batches]);

  const handleWeightChange = (index, newWeight) => {
    const updatedBatches = batches.map((batch, i) =>
      i === index ? { ...batch, weight: newWeight } : batch
    );
    setBatches(updatedBatches);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lastExpeditionId) {
      console.error("No last expedition ID found.");
      return;
    }

    const expeditionID = lastExpeditionId;
    const totalWeight = getTotalWeight();
    const timeAccepted = new Date().toISOString();
    const note = notes;
    const date = new Date().toISOString();

    try {
      await createPackageReceipt(expeditionID, totalWeight, timeAccepted, note, date);
      alert("Package receipt created successfully!");
      // Clear the form or perform any other necessary actions
    } catch (error) {
      console.error("Error creating package receipt: ", error);
      alert("Failed to create package receipt.");
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="max-w-[640px] relative bg-slate-50 h-screen overflow-hidden text-left text-base text-zinc-500 font-vietnam ml-auto mr-auto flex flex-col">
          <header className="w-full mt-6 flex flex-col items-center justify-between text-right text-xl flex-grow-0">
            <div className="w-full flex flex-row">
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

          <main className="w-full mt-5 flex flex-col items-start justify-start px-5 flex-grow overflow-y-auto">
            <form id="shipment-form" className="w-full" onSubmit={handleSubmit}>
              <div className="w-full h-[27px] text-black text-lg font-semibold font-['Be Vietnam Pro']">Batch Information</div>
              <hr className="w-full border-gray-300 mt-2" />

              <div className="w-full flex flex-col gap-2.5 mt-2">
                {batches.map((batch, index) => (
                  <div key={batch.id} className="w-full flex flex-col">
                    <div className="text-black text-sm font-bold font-['Be Vietnam Pro']">
                      {batch.id}
                    </div>
                    <div className="w-full relative flex">
                      <input
                        placeholder="0.0 kg"
                        className="w-full py-3 px-4 bg-[#efefef] border-none rounded ring-0 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:border-none pr-16"
                        value={batch.weight}
                        onChange={(e) => handleWeightChange(index, e.target.value)}
                      />
                      <img
                        className="absolute top-[50%] right-2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                        src={scale}
                        alt="icon"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full flex flex-col mt-4">
                <div className="text-black text-sm font-bold font-['Be Vietnam Pro']">
                  Guard On Duty
                </div>
                <div className="w-full relative flex">
                  <input
                    placeholder="Enter guard's name..."
                    className="w-full py-3 px-4 bg-[#efefef] border-none rounded ring-0 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:border-none pr-16"
                    value={guardOnDuty}
                    onChange={(e) => setGuardOnDuty(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col mt-4">
                <div className="text-black text-sm font-bold font-['Be Vietnam Pro']">
                  Notes
                </div>
                <div className="w-full relative flex">
                  <textarea
                    placeholder="Enter notes here..."
                    className="w-full py-3 px-4 bg-[#efefef] border-none rounded ring-0 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:border-none pr-16"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <hr className="w-full border-gray-300 mt-5" />

              <div className="w-full flex justify-between items-center mt-2">
                <div className="text-black text-sm font-bold font-['Be Vietnam Pro']">
                  Total Weight
                </div>
                <div className="text-stone-400 text-sm font-bold font-['Be Vietnam Pro']">
                  {getTotalWeight()} kg
                </div>
              </div>

              <button
                className={`w-full mt-3 py-2 ${
                  isButtonDisabled ? "bg-[#CD484866]/50" : "bg-[#CD4848] hover:bg-[#CD4848]/90"
                } ${!isButtonDisabled && "text-white"} text-black rounded-md select-none disabled:cursor-not-allowed`}
                type="submit"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "No Rescaling Needed & Confirm" : "Rescale & Confirm"}
              </button>
            </form>
          </main>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </>
  );
};

export default ArrivalConfirmation;
