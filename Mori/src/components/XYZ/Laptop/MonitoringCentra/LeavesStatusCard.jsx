import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ArrowDown from "../../../../assets/XYZ/arrowdown.png";
import PersonInChargeBox from "./PersonInChargeBox";
import FlouringScheduleBox from "./FlouringScheduleBox";
import DryingMachineBox from "./DryingMachineBox";
import FlouringMachineBox from "./FlouringMachineBox";

import { getAllCentras } from "../../../../service/centras";

const LeavesStatusCard = ({
  title,
  totalWeight,
  proportions,
  colors,
  labels,
}) => {
  const calculateWeights = (total) => {
    return proportions.map((proportion) => (total * proportion).toFixed(1));
  };

  const weights = calculateWeights(totalWeight);

  const data = {
    labels: labels,
    datasets: [
      {
        data: weights,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map((color) => `${color}99`), // Add transparency to the colors for hover effect
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "50%",
  };

  return (
    <div className="w-[500px] h-[199px] p-6 rounded-xl border border-black/opacity-20 flex-col justify-start items-start inline-flex relative">
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
        }}
      >
        <Doughnut
          data={data}
          options={options}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div style={{ marginBottom: "-10px", textAlign: "left" }}>
        <div
          style={{
            marginBottom: "-10px",
            fontSize: "1.5em",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: "2.5em", fontWeight: "bold" }}>
          {totalWeight}kg
        </div>
      </div>
      <div style={{ marginTop: "10px", textAlign: "left" }}>
        {data.labels.map((label, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: data.datasets[0].backgroundColor[index],
                marginRight: "5px",
              }}
            ></div>
            <div
              style={{
                color: "#828282",
                fontSize: "11px",
                fontWeight: "medium",
                fontFamily: "Be Vietnam Pro",
              }}
            >
              <span style={{ color: data.datasets[0].backgroundColor[index] }}>
                {weights[index]}kg
              </span>{" "}
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeavesStatusDashboard = () => {
  const [warehouseDropdownVisible, setWarehouseDropdownVisible] =
    useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState("Kupang");
  const [warehouseData, setWarehouseData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarehouseData();
  }, []);

  const fetchWarehouseData = async () => {
    try {
      const centraResponse = await getAllCentras();
      const centraData = centraResponse.data.reduce((acc, centra) => {
        acc[centra.Address] = {
          personInCharge: {
            name: centra.PersonInChargeName,
            email: centra.PersonInChargeEmail,
          },
          wetLeaves: centra.WetLeaves,
          driedLeaves: centra.DriedLeaves,
          flouredLeaves: centra.FlouredLeaves,
          flouringSchedule: centra.FlouringSchedule,
          dryingMachines: centra.DryingMachines,
          flouringMachines: centra.FlouringMachines,
        };
        return acc;
      }, {});
      setWarehouseData(centraData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching warehouse data: ", error);
      setLoading(false);
    }
  };

  const toggleWarehouseDropdown = () => {
    setWarehouseDropdownVisible(!warehouseDropdownVisible);
  };

  const selectWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouseDropdownVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const selectedData = warehouseData[selectedWarehouse] || {};

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-[28px] font-bold font-['Be Vietnam Pro'] mb-[-5px]">
          Centra Semang, {selectedWarehouse}
        </h1>
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
              {Object.keys(warehouseData).map((warehouse) => (
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
          {selectedData.wetLeaves && (
            <LeavesStatusCard
              title="Wet Leaves"
              totalWeight={selectedData.wetLeaves.totalWeight}
              proportions={selectedData.wetLeaves.proportions}
              colors={selectedData.wetLeaves.colors}
              labels={selectedData.wetLeaves.labels}
            />
          )}
          {selectedData.driedLeaves && (
            <LeavesStatusCard
              title="Dried Leaves"
              totalWeight={selectedData.driedLeaves.totalWeight}
              proportions={selectedData.driedLeaves.proportions}
              colors={selectedData.driedLeaves.colors}
              labels={selectedData.driedLeaves.labels}
            />
          )}
          {selectedData.flouredLeaves && (
            <LeavesStatusCard
              title="Floured Leaves"
              totalWeight={selectedData.flouredLeaves.totalWeight}
              proportions={selectedData.flouredLeaves.proportions}
              colors={selectedData.flouredLeaves.colors}
              labels={selectedData.flouredLeaves.labels}
            />
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3 w-full">
        {selectedData.personInCharge && (
          <PersonInChargeBox
            name={selectedData.personInCharge.name}
            email={selectedData.personInCharge.email}
          />
        )}
        {selectedData.flouringSchedule && (
          <FlouringScheduleBox
            every={selectedData.flouringSchedule.every}
            nearest={selectedData.flouringSchedule.nearest}
          />
        )}
      </div>

      <div className="mt-4 mb-[-5px] text-black text-[28px] font-semibold font-['Be Vietnam Pro']">
        Drying Machine
      </div>

      <div className="mt-6 flex gap-6">
        <div className="flex flex-wrap gap-6">
          {selectedData.dryingMachines?.map((machine, index) => (
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
          {selectedData.flouringMachines?.map((machine, index) => (
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
