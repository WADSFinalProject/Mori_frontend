import React from 'react';
import calendar from '../../assets/XYZ/calendarIcon.png';

const FlouringScheduleBox = ({ every, nearest }) => {
    const nearestSchedule = nearest ? `${nearest}` : '...';
    const everySchedule = every ? ` ${every}` : '...';
  
    return (
      <div className="w-full max-w-screen-md h-[113px] p-6 rounded-xl border border-black/opacity-20 flex justify-start items-center gap-4">
        <div className="text-right text-black text-base font-sf-pro">
          <img src={calendar} alt="Calendar Icon" style={{ width: '17px', height: '15px' }} />
        </div>
        <div className="flex flex-col justify-start items-start gap-0.5 flex-grow">
          <div className="text-black text-sm font-medium font-vietnam-pro leading-[18px]">
            Flouring Schedule
          </div>
          <div>
            <span className="text-black text-[22px] font-semibold font-vietnam-pro">Every</span>
            <span className="text-black text-[22px] font-bold font-vietnam-pro"> {everySchedule} Days</span>
          </div>
          <div>
            <span className="text-black text-xs font-medium font-vietnam-pro">Nearest Schedule: </span>
            <span className="text-amber-700 text-xs font-bold font-vietnam-pro">in {nearestSchedule} days</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default FlouringScheduleBox;