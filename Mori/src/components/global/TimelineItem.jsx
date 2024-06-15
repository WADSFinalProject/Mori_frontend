import React from "react";

const TimelineItem = ({ datetime, location, description, isCurrent }) => {
  return (
    <li>
      <hr />
      <div className={`timeline-start ${isCurrent ? "text-[#A7AD6F]" : "text-[#00000066]"} text-center text-xs font-medium tracking-tight`}>
        {datetime}
      </div>
      <div className={`timeline-middle p-2 ${isCurrent ? "bg-[#A7AD6F] border-[#A7AD6F]" : "bg-[#F0F0F0] border-[#00000066]"} rounded-full mx-3`}>
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke={isCurrent ? "#ffffff" : "#00000066"}
        >
          <path
            d="M4 12.6111L8.92308 17.5L20 6.5"
            stroke={isCurrent ? "#ffffff" : "#00000066"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <div className={`timeline-end ${isCurrent ? "text-[#A7AD6F]" : "text-[#00000066]"} text-xs tracking-tight`}>
        <b>{location}</b> <br />
        {description}
      </div>
      <hr />
    </li>
  );
};

export default TimelineItem;
