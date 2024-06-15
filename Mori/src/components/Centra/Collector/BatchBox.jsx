import React, { useState, useEffect } from 'react';
import EditBatch from './EditBatch';

function getStatusStyles(status) {
  switch (status) {
    case 'Fresh':
      return { backgroundColor: '#99D0D580', color: '#000000' };
    case 'Near Expiry':
      return { backgroundColor: '#CD484866', color: '#000000' };
    case 'Exceeded':
      return { backgroundColor: '#CD4848', color: '#FFFFFF' };
    case 'Expired':
      return { backgroundColor: '#818181', color: '#FFFFFF' };
    default:
      return { backgroundColor: '', color: '' };
  }
}

function getDurationColor(duration) {
  return duration === '00:00:00' ? '#D9D9D9' : '#D9D9D9';
}

const BatchBox = ({ batchId, status, date, time, weight, duration, selectedDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBatchData, setEditBatchData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(duration);

  const { backgroundColor, color } = getStatusStyles(status);

  if (selectedDate && selectedDate.toDateString() !== new Date(date).toDateString()) {
    return null;
  }

  const handleEditClick = () => {
    setEditBatchData({ batchId, status, date, time, weight, duration });
    setIsEditing(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const [hours, minutes, seconds] = prevTime.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds > 0) {
          totalSeconds -= 1;
        }

        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');

        return `${h}:${m}:${s}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="self-stretch rounded-2xl overflow-hidden flex flex-col items-start justify-start p-4 pb-0.5 gap-[1px]" style={{ backgroundColor: 'white' }}>
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[12px]">
        <div className="flex-1 flex flex-row items-start justify-between min-w-[133px] gap-[20px]">
          <div className="relative font-medium inline-block min-w-[90px]">
            <span style={{ fontWeight: 'normal' }}>BATCH #</span> <span style={{ fontWeight: 'bold' }}>{batchId}</span>
          </div>
          <div className="relative inline-block text-center min-w-[43px] first-letter:w-28 h-[27px] px-4 py-1.5 rounded justify-center items-center gap-2.5" style={{ backgroundColor }}>
            <div className="text-xs font-medium font-['Be Vietnam Pro']" style={{ color }}>
              {status}
            </div>
          </div>
        </div>

      {/* Weight */}
      </div>
      <b className="mt-4 mb-4 text-black text-xl font-bold font-['Be Vietnam Pro'] bottom-4 relative inline-block text-left min-w-[43px]">
        {weight}
      </b>
      <b className="text-zinc-500 text-xs font-medium font-['Be Vietnam Pro'] bottom-7 relative inline-block text-left min-w-[43px]">
        Collected <span className="text-zinc-500 text-xs font-bold font-['Be Vietnam Pro']">{date}</span> at <span className="text-zinc-500 text-xs font-bold font-['Be Vietnam Pro']">{time}</span>
      </b>

      {/* Status Conditions */}
      {status === 'Exceeded' && (
        <div className="mb-[-10px] mt-[3px] flex items-center"> {/* Use flex container */}
          <b className="text-[#852222] text-xs font-medium font-['Be Vietnam Pro'] bottom-7 relative inline-block text-left min-w-[43px]">
            Confirm expiry now
          </b>
        </div>
      )}

      {status === 'Expired' && (
        <div className="mb-[-20px] mt-[2px]">
          <b className="text-[#818181] text-xs font-medium font-['Be Vietnam Pro'] bottom-7 relative inline-block text-left min-w-[43px]">
            <span className="font-bold">Expiry</span> Confirmed
          </b>
        </div>
      )}

      {/* Duration and edit button */}
      <div className="mb-[20px] relative flex flex-wrap items-center w-full">
        <div
          className="relative flex items-center gap-2.5 px-3 py-2 rounded flex-grow-0"
          style={{
            backgroundColor: status === "Expired" ? "#D9D9D9" : getDurationColor(duration),
            color: status === "Expired" ? "#FFFFFF" : "black",
            width: 'auto',
            minWidth: '108px', 
          }}
        >
          <svg
            className="absolute top-[10px] left-2 w-3 h-3"
            viewBox="0 0 12 13"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="M3.0668 7.22604C2.93514 7.22604 2.82478 7.18151 2.73572 7.09245C2.64666 7.00339 2.60213 6.89303 2.60213 6.76137C2.60213 6.62972 2.64666 6.5213 2.73572 6.43611C2.82478 6.34705 2.93514 6.30252 3.0668 6.30252H5.53533V2.95692C5.53533 2.82914 5.57986 2.72072 5.66893 2.63166C5.75799 2.54259 5.86641 2.49806 5.99419 2.49806C6.12585 2.49806 6.23621 2.54259 6.32527 2.63166C6.41433 2.72072 6.45886 2.82914 6.45886 2.95692V6.76137C6.45886 6.89303 6.41433 7.00339 6.32527 7.09245C6.23621 7.18151 6.12585 7.22604 5.99419 7.22604H3.0668ZM6 12.5C5.17909 12.5 4.40658 12.3432 3.68248 12.0295C2.95837 11.7197 2.31946 11.288 1.76573 10.7343C1.21588 10.1805 0.784124 9.54163 0.470474 8.81752C0.156825 8.09342 0 7.32091 0 6.5C0 5.67909 0.156825 4.90658 0.470474 4.18248C0.784124 3.45837 1.21588 2.82139 1.76573 2.27154C2.31946 1.71781 2.95644 1.28412 3.67667 0.970474C4.40077 0.656825 5.17328 0.5 5.99419 0.5C6.81897 0.5 7.59342 0.656825 8.31752 0.970474C9.04163 1.28412 9.68054 1.71781 10.2343 2.27154C10.788 2.82139 11.2217 3.45837 11.5353 4.18248C11.849 4.90658 12.0058 5.67909 12.0058 6.5C12.0058 7.32091 11.849 8.09342 11.5353 8.81752C11.2217 9.54163 10.788 10.1805 10.2343 10.7343C9.68054 11.288 9.04163 11.7197 8.31752 12.0295C7.59342 12.3432 6.82091 12.5 6 12.5ZM6 11.3151C6.66989 11.3151 7.29526 11.1912 7.87609 10.9434C8.45692 10.6955 8.96805 10.3509 9.40949 9.90949C9.85092 9.46805 10.1955 8.95692 10.4434 8.37609C10.6912 7.79526 10.8151 7.16989 10.8151 6.5C10.8151 5.83398 10.6912 5.21055 10.4434 4.62972C10.1955 4.04501 9.85092 3.53195 9.40949 3.09051C8.96805 2.64908 8.45499 2.30445 7.87028 2.05663C7.28945 1.80881 6.66409 1.6849 5.99419 1.6849C5.32817 1.6849 4.70281 1.80881 4.1181 2.05663C3.53727 2.30445 3.02807 2.64908 2.59051 3.09051C2.15295 3.53195 1.81026 4.04501 1.56244 4.62972C1.31462 5.21055 1.19071 5.83398 1.19071 6.5C1.19071 7.16989 1.31462 7.79526 1.56244 8.37609C1.81026 8.95692 2.15295 9.46805 2.59051 9.90949C3.03195 10.3509 3.54308 10.6955 4.12391 10.9434C4.70862 11.1912 5.33398 11.3151 6 11.3151Z"
              fill={status === "Expired" ? "#FFFFFF" : "black"}
            />
            </svg> 

          <div className="text-xs font-small font-['Be Vietnam Pro'] ml-4">{timeLeft}</div>
        </div>

        <button
          onClick={handleEditClick}
          className="w-[65px] h-[27px] px-2 py-1 bg-white rounded border border-black flex justify-center items-center ml-auto"
        >
          <div className="text-black text-sm font-medium font-['Be Vietnam Pro']">EDIT</div>
        </button>


      {/* Edit Popup */}
      </div>
      {isEditing && (
        <EditBatch
          onClose={() => setIsEditing(false)}
          batchData={editBatchData}
        />
      )}

    </div>
  );
};

export default BatchBox;
