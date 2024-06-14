import React, { useState } from "react";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import back from "../../../assets/back.png";
import { Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const gaugeOptions = {
  responsive: true,
  cutout: "80%",
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  maintainAspectRatio: false,
  events: [],
};

const ChartWithBox = ({ data, label, labelStyle }) => (
  <div
    className="chart-box-container rounded-lg shadow font-vietnam"
    style={{
      backgroundColor: "#f0f0f0",
      width: "150px",
      height: "170px",
      position: "relative",
      marginTop: "20px",
    }}
  >
    <div
      className="chart-box-label text-sm font-bold text-center"
      style={{
        position: "absolute",
        top: "10px",
        width: "100%",
        fontSize: "13px",
        paddingLeft: "20px",
        paddingRight: "20px",
        ...labelStyle,
      }}
    >
      {label}
    </div>
    <div
      className="chart-box-doughnut"
      style={{
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80px",
        height: "80px",
      }}
    >
      <Doughnut data={data} options={gaugeOptions} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold">
          {data.datasets[0].data[0]}kg
        </span>
      </div>
    </div>
  </div>
);

export default function Processor() {
  const { width } = useWindowSize();
  const isMobile = width <= 640;
  const initialActiveTab = location.state?.activeTab || "drying"; // Default to drying tab if state not available
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const [dryingMachines, setDryingMachines] = useState([
    {
      number: 1,
      status: "FULL",
      currentLoad: 24,
      capacity: 30,
      lastUpdated: "1 hour ago",
    },
    {
      number: 2,
      status: "FULL",
      currentLoad: 30,
      capacity: 30,
      lastUpdated: "2 hours ago",
    },
    {
      number: 3,
      status: "EMPTY",
      currentLoad: 10,
      capacity: 30,
      lastUpdated: "30 minutes ago",
    },
  ]);

  const [flouringMachines, setFlouringMachines] = useState([
    {
      number: 1,
      status: "FULL",
      currentLoad: 24,
      capacity: 30,
      lastUpdated: "45 minutes ago",
    },
    {
      number: 2,
      status: "FULL",
      currentLoad: 10,
      capacity: 30,
      lastUpdated: "3 hours ago",
    },
    {
      number: 3,
      status: "EMPTY",
      currentLoad: 10,
      capacity: 30,
      lastUpdated: "1 hour ago",
    },
  ]);

  const handleTabClick = (tab) => setActiveTab(tab);

  const wetLeavesData = {
    labels: ["Unprocessed Wet Leaves", "Empty"],
    datasets: [
      {
        data: [10, 90],
        backgroundColor: ["#538455", "#86B788"],
        borderColor: ["#538455", "#86B788"],
        borderWidth: 1,
        circumference: 360,
        rotation: 0,
        cutout: "75%",
      },
    ],
  };

  const driedLeavesData = {
    labels: ["Dried Leaves", "Empty"],
    datasets: [
      {
        data: [20, 90],
        backgroundColor: ["#838453", "#B2B472"],
        borderColor: ["#838453", "#B2B472"],
        borderWidth: 1,
        circumference: 360,
        rotation: 0,
        cutout: "75%",
      },
    ],
  };

  const Unfloureddriedleaves = {
    labels: ["Unfloured dried Leaves", "Empty"],
    datasets: [
      {
        data: [10, 90],
        backgroundColor: ["#838453", "#B2B472"],
        borderColor: ["#838453", "#B2B472"],
        borderWidth: 1,
        circumference: 360,
        rotation: 0,
        cutout: "75%",
      },
    ],
  };

  const flouredleaves = {
    labels: ["floured Leaves", "Empty"],
    datasets: [
      {
        data: [30, 90],
        backgroundColor: ["#704B40", "#B78F82"],
        borderColor: ["#704B40", "#B78F82"],
        borderWidth: 1,
        circumference: 360,
        rotation: 0,
        cutout: "75%",
      },
    ],
  };

  const renderMachines = () => {
    const machines = activeTab === "drying" ? dryingMachines : flouringMachines;
    return machines.map((machine, index) => {
      const isLastCard = index === machines.length - 1;
      const machineCardMarginClass = isLastCard ? "mb-10" : "mb-4";
      return (
        <MachineCard
          key={machine.number}
          machine={machine}
          extraMarginClass={machineCardMarginClass}
        />
      );
    });
  };

  const MachineCard = ({ machine, extraMarginClass }) => {
    let chartColor = "#99D0D580"; // Default color when less than half
    if (machine.currentLoad === machine.capacity) {
      chartColor = "#0F3F43"; // Color when full
    } else if (machine.currentLoad > machine.capacity / 2) {
      chartColor = "#5D9EA4"; // Color when more than half
    }

    const linkTo =
      activeTab === "drying"
        ? `/dryingmachine/${machine.number}`
        : `/flouringmachine/${machine.number}`;

    return (
      <div
        className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machine.status.toLowerCase()}`}
        style={{
          width: "auto",
          flexGrow: 1,
          minWidth: "300px",
          minHeight: "100px",
          maxWidth: "none",
          position: "relative",
        }}
      >
        <div
          className="machine-number bg-black text-white rounded-full h-6 w-6 flex items-center justify-center"
          style={{ position: "absolute", left: "15px", top: "15px" }}
        >
          <span className="font-bold text-sm">{machine.number}</span>
        </div>
        <div className="machine-info flex justify-center items-center w-full mb-2">
          <div
            className="chart-container"
            style={{ width: "150px", height: "120px", position: "relative" }}
          >
            <Doughnut
              data={{
                labels: ["Current Load", "Capacity"],
                datasets: [
                  {
                    data: [
                      machine.currentLoad,
                      machine.capacity - machine.currentLoad,
                    ],
                    backgroundColor: [chartColor, "#EFEFEF"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={gaugeOptions}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ fontSize: "0" }}
            >
              <span
                className="font-vietnam font-bold"
                style={{ fontSize: "24px", lineHeight: "1.2" }}
              >
                {machine.currentLoad} kg
              </span>
              <span
                className="font-vietnam font-bold"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.2",
                  marginBottom: "-30px",
                }}
              >
                {`/ ${machine.capacity} kg`}
              </span>
            </div>
          </div>
        </div>
        <button
          className={`start-btn text-white py-1 px-6 ${machine.currentLoad === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          style={{
            backgroundColor: "#000000",
            width: "100%",
            borderRadius: "15px",
            fontSize: "12px",
          }}
          disabled={machine.currentLoad === 0}
        >
          <Link
            to={linkTo}
            className="flex items-center justify-center h-full w-full"
          >
            START PROCESS
          </Link>
        </button>
        <div
          className="last-updated"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "10px",
            color: "#666666",
          }}
        >
          <div>Last updated:</div>
          <div style={{ fontWeight: "bold" }}>{machine.lastUpdated}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-000000">
      {isMobile ? (
        <div>
          <div className="p-4 shadow-md flex justify-between items-center bg-white ml-4">
            <Link to="/centra/home" className="flex items-center">
              <img src={back} alt="back" className="w-5 mr-2" />
            </Link>
            <span className="font-bold text-2xl lg:text-3xl xl:text-4xl mr-20 font-vietnam">
              Processor
            </span>
            <div className="flex">
              <img src={bell} alt="notifications" className="w-5 mr-2" />
              <img src={hamburg} alt="menu" className="w-5" />
            </div>
          </div>

          <div className="flex bg-white">
            <div
              className={`flex-1 p-4 text-center font-vietnam ${activeTab === "drying" ? "border-b-2 border-black" : ""}`}
              onClick={() => handleTabClick("drying")}
            >
              Drying
            </div>
            <div
              className={`flex-1 p-4 text-center font-vietnam ${activeTab === "flouring" ? "border-b-2 border-black" : ""}`}
              onClick={() => handleTabClick("flouring")}
            >
              Flouring
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            {activeTab === "drying" ? (
              <div className="flex justify-center gap-4">
                <ChartWithBox
                  data={wetLeavesData}
                  label="Unprocessed Wet Leaves"
                  backgroundColor="#828282"
                  labelStyle={{ color: "black", top: "20px" }}
                />
                <ChartWithBox
                  data={driedLeavesData}
                  label="Processed Dried leaves"
                  backgroundColor="#d9d9d9"
                  labelStyle={{ top: "20px" }}
                />
              </div>
            ) : (
              <div className="flex justify-center gap-4">
                <ChartWithBox
                  data={Unfloureddriedleaves}
                  label="Unfloured Dried Leaves"
                  backgroundColor="#828282"
                  labelStyle={{ color: "black", top: "20px" }}
                />
                <ChartWithBox
                  data={flouredleaves}
                  label="Floured Leaves"
                  backgroundColor="#d9d9d9"
                  labelStyle={{ top: "20px" }}
                />
              </div>
            )}
            <div className="machine-status my-4">{renderMachines()}</div>
          </div>

          <footer className="font-vietnam bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-bold">@2024 MORI</p>
            <p className="font-semibold">CENTRA</p>
          </footer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">Not available for this device.</p>
        </div>
      )}
    </div>
  );
}
