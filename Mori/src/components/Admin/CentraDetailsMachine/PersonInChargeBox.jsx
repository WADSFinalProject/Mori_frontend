import React from 'react';

const PersonInChargeBox = ({ name, email }) => {
  return (
    <div className="w-full max-w-screen-md h-[113px] p-6 rounded-xl border border-black/opacity-20 flex justify-start items-center gap-4">
      <div className="w-16 h-16 bg-zinc-500 rounded-full"></div>
      <div className="flex flex-col justify-start items-start gap-0.5 flex-grow">
        <div>
          <span className="text-black text-xs font-medium font-vietnam-pro">Current </span>
          <span className="text-black text-xs font-bold font-vietnam-pro">Person in Charge</span>
        </div>
        <div className="text-black text-[22px] font-semibold font-vietnam-pro">{name}</div>
        <div className="text-black text-xs font-normal font-vietnam-pro underline">{email}</div>
      </div>
      <div className="flex-shrink-0 text-right text-black/25 text-sm font-sf-pro">
        <button className="text-black/25 text-l font-sf-pro focus:outline-none">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PersonInChargeBox;
