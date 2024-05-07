import React from "react";

const StatusComponent = ({ id, status, batches, totalWeight }) => {
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "To Receive":
        return "#F1E1A7"; // Light yellow for "To Receive"
      case "Completed":
        return "#A1C598"; // Green for "Completed"
      case "Shipped":
        return "#BEC8FA"; // Light blue for "Shipped"
      default:
        return "#bec8fa"; // Default color if none of the cases match
    }
  };

  const statusBackgroundColor = getStatusBackgroundColor(status);

  return (
    <div
      className="relative flex flex-col items-start justify-start p-6 gap-[8px] border-b-[2px] border-solid border-[#d9d9d9] cursor-pointer hover:bg-gray-100"
      // onclick go to shipment details page
      onClick={null}
    >
      <div className="w-full flex flex-row items-end justify-between text-lg">
        <h2 className="m-0 relative text-xl font-extrabold font-vietnam">
          SHIPMENT #{id}
        </h2>

        {/* status when "To Receive" the bg is #F1E1A7 when "Completed" the bg is #A1C598 when "Shipped" the bg is #BEC8FA */}
        <div
          className="rounded-[20px] flex flex-row items-center justify-center py-1 px-4 text-xs"
          style={{ backgroundColor: statusBackgroundColor }}
        >
          <div className="relative font-medium font-vietnam">{status}</div>
        </div>
      </div>

      <div className="self-stretch flex flex-row items-start justify-start py-1 px-0 gap-[8px] text-base text-[#404040] overflow-x-auto">
        {batches.map((batchId) => (
          <div
            key={batchId}
            className="rounded-[20px] flex flex-row items-center justify-center py-2 px-3.5 border-[1px] border-solid border-black/25"
          >
            <p className="m-0 relative font-semibold font-vietnam">
              #{batchId}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row items-start justify-between py-0.5 px-0 box-border text-black/25">
        <p className="m-0 relative font-medium font-vietnam">
          {batches.length} Batches
        </p>
        <b className="relative text-right text-black">
          <span className="font-medium font-vietnam">Total Weight: </span>
          <span className="font-extrabold font-vietnam text-[#6d7dd2]">
            {totalWeight} kg
          </span>
        </b>
      </div>
      <div className="self-stretch flex flex-row items-start justify-between pt-2.5 px-0 pb-0 text-[#c59898] font-vietnam border-t-[1px] border-solid border-[#d9d9d9] bg-transparent">
        <div className="flex flex-row items-end justify-start gap-[4px]">
          <svg
            className="relative translate-y-[-1.2px]"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.29688 15.5566V8.44727L14.7637 4.82422C14.791 4.93815 14.8047 5.07487 14.8047 5.23438V10.7852C14.8047 11.2682 14.7204 11.6351 14.5518 11.8857C14.3877 12.1318 14.1325 12.3506 13.7861 12.542L8.53613 15.4609C8.49967 15.4837 8.46094 15.502 8.41992 15.5156C8.37891 15.5339 8.33789 15.5475 8.29688 15.5566ZM7.25098 15.5566C7.20996 15.5475 7.16895 15.5339 7.12793 15.5156C7.09147 15.502 7.05501 15.4837 7.01855 15.4609L1.76172 12.542C1.41992 12.3506 1.16471 12.1318 0.996094 11.8857C0.827474 11.6351 0.743164 11.2682 0.743164 10.7852V5.23438C0.743164 5.07487 0.756836 4.93815 0.78418 4.82422L7.25098 8.44727V15.5566ZM7.77734 7.50391L1.24902 3.8877C1.36296 3.78288 1.50651 3.68262 1.67969 3.58691L4.11328 2.2334L10.6689 5.89746L7.77734 7.50391ZM11.7832 5.28906L5.2002 1.63184L6.45117 0.93457C6.88867 0.688477 7.33073 0.56543 7.77734 0.56543C8.22396 0.56543 8.66602 0.688477 9.10352 0.93457L13.875 3.58691C14.0436 3.68262 14.1849 3.78288 14.2988 3.8877L11.7832 5.28906Z"
              fill="#C59898"
            />
          </svg>
          <b className="relative font-semibold font-vietnam">
            Preparing to ship
          </b>
        </div>
        <svg
          width="11"
          height="17"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.82324 7.06445C7.82324 7.20117 7.7959 7.33105 7.74121 7.4541C7.69108 7.57259 7.60905 7.68652 7.49512 7.7959L2.23828 12.9434C2.06055 13.1165 1.84408 13.2031 1.58887 13.2031C1.4248 13.2031 1.27214 13.1621 1.13086 13.0801C0.989583 12.998 0.875651 12.8887 0.789062 12.752C0.707031 12.6152 0.666016 12.4603 0.666016 12.2871C0.666016 12.0365 0.761719 11.8132 0.953125 11.6172L5.63574 7.06445L0.953125 2.51172C0.761719 2.32031 0.666016 2.09701 0.666016 1.8418C0.666016 1.67318 0.707031 1.52051 0.789062 1.38379C0.875651 1.24251 0.989583 1.13086 1.13086 1.04883C1.27214 0.966797 1.4248 0.925781 1.58887 0.925781C1.84408 0.925781 2.06055 1.01237 2.23828 1.18555L7.49512 6.33301C7.60449 6.44238 7.68652 6.55632 7.74121 6.6748C7.7959 6.79329 7.82324 6.92318 7.82324 7.06445Z"
            fill="black"
            fillOpacity="0.25"
          />
        </svg>
      </div>
    </div>
  );
};

export default StatusComponent;
