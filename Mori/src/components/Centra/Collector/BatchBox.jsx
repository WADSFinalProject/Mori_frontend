import React, { useState } from 'react';

function getStatusStyles(status) {
    switch (status) {
        case 'Fresh':
          return { backgroundColor: '#B2B371', color: '#000000' };
        case 'Near Expiry':
            return { backgroundColor: '#E9CE6B', color: '#000000' };
        case 'Exceeded':
            return { backgroundColor: '#902D2D', color: '#FFFFFF' };
        case 'Expired':
            return { backgroundColor: '#818181', color: '#FFFFFF' };
        default:
            return { backgroundColor: '', color: '' }; // Handle other statuses or no status
    }
}

function getDurationColor(duration) {
    return duration === '00:00:00' ? '#D9D9D9' : '#D9D9D9';
}

const BatchBox = ({ batchId, status, date, time, weight, duration}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { backgroundColor, color } = getStatusStyles(status);

  return (
    <div
      className="self-stretch rounded-2xl overflow-hidden flex flex-col items-start justify-start p-4 pb-0.5 gap-[14px]"
      style={{ backgroundColor: 'white' }}
    >

    {/* Batch ID */}
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[12px]">
        <div className="flex-1 flex flex-row items-start justify-between min-w-[133px] gap-[20px]">
          <div className="relative font-medium inline-block min-w-[90px]">
          <span style={{ fontWeight: 'normal' }}>BATCH #</span> <span style={{ fontWeight: 'bold' }}>{batchId}</span>
          </div>



        {/* Batch Status */}
        <div className="relative inline-block text-center min-w-[43px] first-letter:w-28 h-[27px] px-4 py-1.5 rounded justify-center items-center gap-2.5"
             style={{ backgroundColor }}>
            <div className="text-xs font-medium font-['Be Vietnam Pro']" style={{ color }}>
                {status}
            </div>
        </div>

            </div>
        </div>

    {/* Batch Weight */}
    <b className="text-black text-xl font-bold font-['Be Vietnam Pro'] bottom-4 relative inline-block text-left min-w-[43px]">
        {weight}
    </b>

    {/* Batch Date and Time Collection */}
    <b className="text-zinc-500 text-sm font-medium font-['Be Vietnam Pro'] bottom-7 relative inline-block text-left min-w-[43px]">
        Collected <span className="text-zinc-500 text-sm font-bold font-['Be Vietnam Pro']">{date}</span> at <span className="text-zinc-500 text-sm font-bold font-['Be Vietnam Pro']">{time}</span>
    </b>

    {/* Confirm Expiration Time */}
      {status === 'Exceeded' && (
        <div className="mb-[-5px] mt-[-15px]"> {/* Adjust the margin bottom and top as needed */}
          <b className="text-red-800 text-sm font-medium font-['Be Vietnam Pro'] bottom-7 relative inline-block text-left min-w-[43px]">
            Confirm expiry now
          </b>
        </div>
      )}

    {/* Confirm Expiration Time */}
    {status === 'Expired' && (
      <div className="mb-[-5px] mt-[-15px]"> {/* Adjust the margin bottom and top as needed */}
        <b className="text-[#818181] text-sm font-medium font-['Be Vietnam Pro'] bottom-7 relative inline-block text-left min-w-[43px]">
          <span className="font-bold">Expiry</span> Confirmed
        </b>
      </div>
    )}

    

    <div className="relative">


{/* Time Duration */}
<div className="bottom-8 right-0.5 relative w-[108px] h-[27px] px-10 py-2 rounded justify-center items-center gap-2.5 inline-flex" style={{ 
    backgroundColor: status === 'Expired' ? '#D9D9D9' : getDurationColor(duration),
    color: status === 'Expired' ? '#FFFFFF' : '',
}}>
  <div className="text-base font-small font-['Be Vietnam Pro']">{duration}</div>
</div>

      {/* Edit Button */}
      <div className="absolute bottom-8 right-[-195px]">
        <a href="/EditBatch" className="w-[65px] h-[27px] px-7 py-2 bg-white rounded border border-black justify-center items-center gap-2 inline-flex">
          <div className="text-black text-sm font-medium font-be-vietnam-pro">EDIT</div>
        </a>
      </div>
    </div>
    
    </div>
  );
};

export default BatchBox;