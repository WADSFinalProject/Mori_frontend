import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const DryingMachineBox = ({ machineNumber, driedDate, startTime, filledWeight, totalWeight, lastUpdated, duration }) => {
  const totalTime = duration * 60; // duration in minutes, converted to seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const fillPercentage = filledWeight / totalWeight;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTime]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isProcessing = timeLeft > 0;

  const getColor = (percentage) => {
    const startColor = [23, 110, 118];
    const endColor = [246, 246, 246]; 

    const r = Math.floor(startColor[0] + (endColor[0] - startColor[0]) * (1 - percentage));
    const g = Math.floor(startColor[1] + (endColor[1] - startColor[1]) * (1 - percentage));
    const b = Math.floor(startColor[2] + (endColor[2] - startColor[2]) * (1 - percentage));

    return `rgb(${r}, ${g}, ${b})`;
  };

  const data = {
    datasets: [
      {
        data: [filledWeight, totalWeight - filledWeight],
        backgroundColor: [getColor(fillPercentage), '#eaeaea'],
        hoverBackgroundColor: [getColor(fillPercentage), '#eaeaea'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%',
    rotation: -90, // Starts the chart from the top
    circumference: 180, // Only shows half of the chart
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="w-[490px] h-[280px]  bg-white border border-black/opacity-20  rounded-lg p-4">
      <div className="flex items-center">
        <div className="relative">
          <svg width="64" height="64" viewBox="0 0 36 36" className="circular-chart green">
            <path className="circle-bg"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eaeaea"
              strokeWidth="3.5" />
            <path className="circle"
              strokeDasharray={`${(timeLeft / totalTime) * 100}, 100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4D946D"
              strokeWidth="3.5" />
            <text x="18" y="19" className="percentage" fontSize="8" fill="#4D946D" textAnchor="middle" dominantBaseline="middle">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </text>
          </svg>
        </div>
        <div className="ml-4 text-center">
          <h2 className="text-left text-black text-[22px] font-semibold font-['Be Vietnam Pro']">Machine {machineNumber}</h2>
          <div className="text-left text-zinc-500 text-sm font-medium font-['Be Vietnam Pro']">Dried <strong>{driedDate}</strong></div>
          <div className="text-left text-zinc-500 text-sm font-medium font-['Be Vietnam Pro']">Start <strong>{startTime}</strong></div>
        </div>
      </div>
      <div className="my-4 flex items-center justify-center">
        <div className="relative mt-[-60px]" style={{ width: '200px', height: '200px' }}>
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mt-[100px] text-black text-[35px] font-bold font-['Be Vietnam Pro']">{filledWeight} kg</div>
            <div className="mb-10 text-black text-[15.18px] font-normal font-['Be Vietnam Pro']">/ {totalWeight}kg</div>
          </div>
        </div>
      </div>
      <div className="mt-[-40px] text-center text-black text-[10px] font-normal font-['Be Vietnam Pro']">
        {isProcessing ? 'Currently Processing...' : `Last Updated: ${lastUpdated}`}
      </div>
    </div>
  );
};

const DryingMachineBoxDashboard = () => {
    return (
      <div className="flex flex-wrap gap-11">
        <DryingMachineBox
          machineNumber="1"
          driedDate="13 March 2024"
          startTime="02:45 PM"
          filledWeight={24.1}
          totalWeight={30}
          lastUpdated="1 Minute Ago"
          duration={0} // Duration in minutes
        />
        <DryingMachineBox
          machineNumber="3"
          driedDate="13 March 2024"
          startTime="02:45 PM"
          filledWeight={17.2}
          totalWeight={30}
          lastUpdated="1 Minute Ago"
          duration={0} // Duration in minutes
        />
        <DryingMachineBox
          machineNumber="2"
          driedDate="13 March 2024"
          startTime="02:45 PM"
          filledWeight={30}
          totalWeight={30}
          lastUpdated="1 Minute Ago"
          duration={20} // Duration in minutes
        />
      </div>
    );
  };
  
  export default DryingMachineBoxDashboard;
  