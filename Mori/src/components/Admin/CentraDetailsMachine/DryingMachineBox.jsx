import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { getDryingMachine_byCentra } from "../../../service/dryingMachine.js";

const DryingMachineBox = ({ machineNumber, driedDate, startTime, filledWeight, totalWeight, lastUpdated, duration, currentStatus }) => {
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
    <div className="w-[490px] h-[280px] bg-white border border-black/opacity-20 rounded-lg p-4">
      <div className="flex items-center">
        <div className="relative">
        </div>
        <div className="ml-4 text-center">
          <h2 className="text-left text-black text-[22px] font-semibold font-['Be Vietnam Pro']">Machine {machineNumber}</h2>
        </div>
      </div>
      <div className="my-4 flex items-center justify-center">
        <div className="relative mt-[-60px]" style={{ width: '200px', height: '200px' }}>
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mt-[100px] text-black text-[35px] font-bold font-['Be Vietnam Pro']">{filledWeight} kg</div>
            <div className="mb-10 text-black text-[18px] font-normal font-['Be Vietnam Pro']">/ {totalWeight}kg</div>
          </div>
        </div>
      </div>
      <div className="mt-[-40px] text-center text-black text-[18px] font-normal font-['Be Vietnam Pro']">
        {currentStatus} 
      </div>
    </div>
  );
};

const DryingMachineBoxDashboard = ({ centraId }) => {
  const [dryingMachines, setDryingMachines] = useState([]);
  const [dryingCapacities, setDryingCapacities] = useState([]);

  useEffect(() => {
    const fetchDryingMachines = async () => {
      try {
        const response = await getDryingMachine_byCentra(centraId); // Use the new function
        console.log("Drying Machines:", response.data);

        const machinesWithProperties = response.data.map(machine => ({
          ...machine,
          capacity: machine.capacity || machine.Capacity,
          machineNumber: machine.machineNumber || machine.MachineID,
          filledWeight: machine.Load || 0, // Default value for illustration
          totalWeight: machine.Capacity || 30, // Default value for illustration
          duration: machine.duration || 20, // Default value for illustration
          currentStatus: machine.Status || "no"  // Default value for illustration
        }));

        setDryingMachines(machinesWithProperties);

        // Check if randomized data exists in localStorage
        const storedDryingCapacities = localStorage.getItem("dryingCapacities");
        if (storedDryingCapacities) {
          setDryingCapacities(JSON.parse(storedDryingCapacities));
        } else {
          distributeWetLeavesToMachines(machinesWithProperties);
        }
      } catch (error) {
        console.log("Error fetching drying machines: ", error);
      }
    };

    if (centraId) {
      fetchDryingMachines();
    }
  }, [centraId]); // Depend on centraId to re-fetch when it changes

  return (
    <div className="flex flex-wrap gap-11">
      {dryingMachines.map(machine => (
        <DryingMachineBox
          key={machine.machineNumber}
          machineNumber={machine.machineNumber}
          driedDate={machine.driedDate}
          startTime={machine.startTime}
          filledWeight={machine.filledWeight}
          totalWeight={machine.totalWeight}
          lastUpdated={machine.lastUpdated}
          duration={machine.duration}
          currentStatus={machine.currentStatus} // Corrected here
        />
      ))}
    </div>
  );
};

export default DryingMachineBoxDashboard;
