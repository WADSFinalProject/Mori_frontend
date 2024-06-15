import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ArrowDown from '../../../../assets/XYZ/arrowdown.png';
import PersonInChargeBox from './PersonInChargeBox'; 
import FlouringScheduleBox from './FlouringScheduleBox'; 
import DryingMachineBox from './DryingMachineBox'; // Import the DryingMachineBoxDashboard component
import FlouringMachineBox from './FlouringMachineBox';

const LeavesStatusCard = ({ title, totalWeight, proportions, colors, labels }) => {
  const calculateWeights = (total) => {
    return proportions.map(proportion => (total * proportion).toFixed(1));
  };

  const weights = calculateWeights(totalWeight);

  const data = {
    labels: labels,
    datasets: [
      {
        data: weights,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map(color => `${color}99`), // Add transparency to the colors for hover effect
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '50%',
  };

  return (
    <div className="w-[500px] h-[199px] p-6 rounded-xl border border-black/opacity-20 flex-col justify-start items-start inline-flex relative">
      <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }}>
        <Doughnut data={data} options={options} style={{ width: '150px', height: '150px' }} />
      </div>
      <div style={{ marginBottom: '-10px', textAlign: 'left' }}>
        <div style={{ marginBottom: '-10px', fontSize: '1.5em', fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{totalWeight}kg</div>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'left' }}>
        {data.labels.map((label, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: data.datasets[0].backgroundColor[index], marginRight: '5px' }}></div>
            <div style={{ color: '#828282', fontSize: '11px', fontWeight: 'medium', fontFamily: 'Be Vietnam Pro' }}>
              <span style={{ color: data.datasets[0].backgroundColor[index] }}>{weights[index]}kg</span> {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeavesStatusDashboard = () => {
  const [warehouseDropdownVisible, setWarehouseDropdownVisible] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState("Kupang");

  const warehouses = ['Kupang', 'Warehouse 1', 'Warehouse 2']; // Add other warehouses as needed

  const warehouseData = {
    Kupang: {
      personInCharge: { name: 'John Doe', email: 'john.doe@kupang.com' },
      wetLeaves: { totalWeight: 28.1, proportions: [13.7 / 28.1, 5.1 / 28.1, 4.3 / 28.1], colors: ['#CCE8EA', '#4D946D', '#CD4848'], labels: ['Wet Leaves', 'Drying', 'Near Expiry'] },
      driedLeaves: { totalWeight: 26.8, proportions: [13.7 / 26.8, 5.1 / 26.8], colors: ['#9AD1B3', '#A7AD6F'], labels: ['Wet Leaves', 'Drying'] },
      flouredLeaves: { totalWeight: 29.4, proportions: [13.7 / 29.4, 4.3 / 29.4], colors: ['#666666', '#E0EA74'], labels: ['To Ship', 'Floured Leaves'] },
      flouringSchedule: { every: 7, nearest: 2 },
      dryingMachines: [
        { machineNumber: "1", driedDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 24.1, totalWeight: 30, lastUpdated: "1 Minute Ago", duration: 0 },
        { machineNumber: "2", driedDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 17.2, totalWeight: 30, lastUpdated: "1 Minute Ago", duration: 0 },
        { machineNumber: "3", driedDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 30, totalWeight: 30, lastUpdated: "1 Minute Ago", duration: 20 },
      ],
      flouringMachines: [
        { machineNumber: "1", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 24.1, totalWeight: 30, lastUpdated: "1 Minute Ago", duration: 0 },
        { machineNumber: "2", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 17.2, totalWeight: 30, lastUpdated: "1 Minute Ago", duration: 0 },
        { machineNumber: "3", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 30, totalWeight: 30, lastUpdated: "1 Minute Ago", duration: 20 },
      ],
    },
    'Warehouse 1': {
      personInCharge: { name: 'Jane Smith', email: 'jane.smith@warehouse1.com' },
      wetLeaves: { totalWeight: 20.5, proportions: [10.5 / 20.5, 6.0 / 20.5, 4.0 / 20.5], colors: ['#CCE8EA', '#4D946D', '#CD4848'], labels: ['Wet Leaves', 'Drying', 'Near Expiry'] },
      driedLeaves: { totalWeight: 15.7, proportions: [7.7 / 15.7, 8.0 / 15.7], colors: ['#9AD1B3', '#A7AD6F'], labels: ['Wet Leaves', 'Drying'] },
      flouredLeaves: { totalWeight: 18.3, proportions: [9.3 / 18.3, 9.0 / 18.3], colors: ['#666666', '#E0EA74'], labels: ['To Ship', 'Floured Leaves'] },
      flouringSchedule: { every: 9, nearest: 3 },
      dryingMachines: [
        { machineNumber: "1", driedDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 20.1, totalWeight: 25, lastUpdated: "2 Minutes Ago", duration: 10 },
        { machineNumber: "2", driedDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 10.2, totalWeight: 20, lastUpdated: "5 Minutes Ago", duration: 30 },
        { machineNumber: "3", driedDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 15, totalWeight: 25, lastUpdated: "3 Minutes Ago", duration: 0 },
      ],
      flouringMachines: [
        { machineNumber: "1", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 20.1, totalWeight: 25, lastUpdated: "2 Minutes Ago", duration: 10 },
        { machineNumber: "2", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 10.2, totalWeight: 20, lastUpdated: "5 Minutes Ago", duration: 30 },
        { machineNumber: "3", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 15, totalWeight: 25, lastUpdated: "3 Minutes Ago", duration: 0 },
      ],

    },
    'Warehouse 2': {
      personInCharge: { name: 'Alice Johnson', email: 'alice.johnson@warehouse2.com' },
      wetLeaves: { totalWeight: 30.2, proportions: [15.1 / 30.2, 10.1 / 30.2, 5.0 / 30.2], colors: ['#CCE8EA', '#4D946D', '#CD4848'], labels: ['Wet Leaves', 'Drying', 'Near Expiry'] },
      driedLeaves: { totalWeight: 22.6, proportions: [12.6 / 22.6, 10.0 / 22.6], colors: ['#9AD1B3', '#A7AD6F'], labels: ['Wet Leaves', 'Drying'] },
      flouredLeaves: { totalWeight: 25.4, proportions: [15.4 / 25.4, 10.0 / 25.4], colors: ['#666666', '#E0EA74'], labels: ['To Ship', 'Floured Leaves'] },
      flouringSchedule: { every: 5, nearest: 1 },
      dryingMachines: [
        { machineNumber: "1", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 29.1, totalWeight: 35, lastUpdated: "1 Minute Ago", duration: 5 },
        { machineNumber: "2", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 25.2, totalWeight: 35, lastUpdated: "1 Minute Ago", duration: 15 },
        { machineNumber: "3", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 35, totalWeight: 35, lastUpdated: "1 Minute Ago", duration: 25 },
      ],
      flouringMachines: [
        { machineNumber: "1", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 29.1, totalWeight: 35, lastUpdated: "1 Minute Ago", duration: 5 },
        { machineNumber: "2", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 25.2, totalWeight: 35, lastUpdated: "1 Minute Ago", duration: 15 },
        { machineNumber: "3", flouredDate: "13 March 2024", startTime: "02:45 PM", filledWeight: 35, totalWeight: 35, lastUpdated: "1 Minute Ago", duration: 25 },
      ],
    },
  };

  const toggleWarehouseDropdown = () => {
    setWarehouseDropdownVisible(!warehouseDropdownVisible);
  };

  const selectWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouseDropdownVisible(false);
  };

  const selectedData = warehouseData[selectedWarehouse];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-[28px] font-bold font-['Be Vietnam Pro'] mb-[-5px]">Centra Semang, {selectedWarehouse}</h1>
        <div className="relative">
          <button
            className="flex items-center text-[#A7AD6F] font-semibold"
            onClick={toggleWarehouseDropdown}
          >
            Warehouse {selectedWarehouse}
            <img src={ArrowDown} alt="Arrow Down" className="ml-2 w-4" />
          </button>
          {warehouseDropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-md z-20">
              {warehouses.map((warehouse) => (
                <button
                  key={warehouse}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => selectWarehouse(warehouse)}
                >
                  {warehouse}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-wrap gap-6">
          <LeavesStatusCard
            title="Wet Leaves"
            totalWeight={selectedData.wetLeaves.totalWeight}
            proportions={selectedData.wetLeaves.proportions}
            colors={selectedData.wetLeaves.colors}
            labels={selectedData.wetLeaves.labels}
          />
          <LeavesStatusCard
            title="Dried Leaves"
            totalWeight={selectedData.driedLeaves.totalWeight}
            proportions={selectedData.driedLeaves.proportions}
            colors={selectedData.driedLeaves.colors}
            labels={selectedData.driedLeaves.labels}
          />
          <LeavesStatusCard
            title="Floured Leaves"
            totalWeight={selectedData.flouredLeaves.totalWeight}
            proportions={selectedData.flouredLeaves.proportions}
            colors={selectedData.flouredLeaves.colors}
            labels={selectedData.flouredLeaves.labels}
          />
        </div>
        
       </div>
            <div className="mt-6 flex gap-3 w-full">
        <PersonInChargeBox
          name={selectedData.personInCharge.name}
          email={selectedData.personInCharge.email}
        />
        <FlouringScheduleBox
          every={selectedData.flouringSchedule.every}
          nearest={selectedData.flouringSchedule.nearest}
        />
      </div>

      <div className="mt-4 mb-[-5px] text-black text-[28px] font-semibold font-['Be Vietnam Pro']">
        Drying Machine
      </div>

      <div className="mt-6 flex gap-6">
        <div className="flex flex-wrap gap-6">
          {selectedData.dryingMachines.map((machine, index) => (
            <DryingMachineBox
              key={index}
              machineNumber={machine.machineNumber}
              driedDate={machine.driedDate}
              startTime={machine.startTime}
              filledWeight={machine.filledWeight}
              totalWeight={machine.totalWeight}
              lastUpdated={machine.lastUpdated}
              duration={machine.duration}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 mb-[-5px] text-black text-[28px] font-semibold font-['Be Vietnam Pro']">
        Flouring Machine
      </div>

      <div className="mt-6 flex gap-6">
        <div className="flex flex-wrap gap-6">
          {selectedData.flouringMachines.map((machine, index) => (
            <FlouringMachineBox
              key={index}
              machineNumber={machine.machineNumber}
              flouredDate={machine.flouredDate}
              startTime={machine.startTime}
              filledWeight={machine.filledWeight}
              totalWeight={machine.totalWeight}
              lastUpdated={machine.lastUpdated}
              duration={machine.duration}
            />
          ))}
        </div>
      </div>
      </div>
  );
};

export default LeavesStatusDashboard;



{/* <div className="mt-6 flex gap-6">
<div className="flex-grow flex flex-col gap-6">
  <div className="flex gap-6">
    <PersonInChargeBox name="John Doe" email="john.doe@example.com" />
    <FlouringScheduleBox every={3} nearest={"2"} />
  </div>
</div>
</div>

<div className="mt-4 text-black text-[28px] font-extrabold font-['Be Vietnam Pro'] mb-4">
Drying Machine
</div>

<div className="mt-6 flex gap-6">
  <DryingMachineBoxDashboard />
</div> */}
