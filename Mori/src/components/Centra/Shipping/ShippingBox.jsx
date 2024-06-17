import React from "react";
import { Link } from "react-router-dom";

const ShippingBox = ({
  batchId,
  weight,
  driedDate,
  flouredDate,
  checked,
  onChange,
}) => {
  const mainBgColor = checked ? "#eef1ff" : "whitesmoke";

  return (
    <div
      className="self-stretch rounded-2xl overflow-hidden flex flex-col items-start justify-start p-5 gap-[14px]"
      style={{ backgroundColor: mainBgColor }}
    >
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[12px]">
        <label className="p-0 m-0 h-5 w-5 cursor-pointer flex items-center justify-center appearance-none border-2 border-solid rounded-md border-slate-500 relative">
          <input
            className="opacity-0 absolute h-full w-full"
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          <div
            className={`p-0 m-0 w-5 h-5 rounded flex items-center justify-center ${
              checked ? "bg-slate-500" : ""
            }`}
            style={{ transition: "background-color 0.2s ease-in-out" }}
          >
            {checked && (
              <svg
                className="text-zinc-100 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </label>
        <div className="flex-1 flex flex-row items-start justify-between gap-[20px]">
          <div className="relative font-medium inline-block">
            Batch #{batchId}
          </div>
          <b className="relative inline-block text-center">{weight}</b>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-center text-sm">
        <div className="self-stretch rounded-[20px] bg-white flex flex-row items-start justify-between py-2 px-4 gap-[20px]">
          <div className="relative font-medium inline-block">Dried Date</div>
          <div className="relative font-medium inline-block">{driedDate}</div>
        </div>
        <div className="self-stretch rounded-[20px] bg-white flex flex-row items-start justify-between py-2 px-4 gap-[20px]">
          <div className="relative font-medium inline-block">Floured Date</div>
          <div className="relative font-medium inline-block">{flouredDate}</div>
        </div>
      </div>
    </div>
  );
};

export default ShippingBox;
