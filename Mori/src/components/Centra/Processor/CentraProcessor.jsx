  import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import back from "../../../assets/back.png";
import { Doughnut } from "react-chartjs-2";
import { readWetLeavesCollections } from "../../../service/wetLeaves.js";
import { readDriedLeaves } from "../../../service/driedLeaves.js";
import { readBatches } from "../../../service/batches.js";
import { readDryingMachines } from "../../../service/dryingMachine.js";
import { readFlouringMachines } from "../../../service/flouringMachine";

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
  const initialActiveTab = "drying"; // Default to drying tab if state not available
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const [dryingMachines, setDryingMachines] = useState([]);
  const [flouringMachines, setFlouringMachines] = useState([]);

  const [totalWetLeaves, setTotalWetLeaves] = useState(0);
  const [totalDriedLeaves, setTotalDriedLeaves] = useState(0);
  const [totalFlouredLeaves, setTotalFlouredLeaves] = useState(0);

  const [dryingCapacities, setDryingCapacities] = useState([]);
  const [flouringCapacities, setFlouringCapacities] = useState([]);

  useEffect(() => {
    const fetchDryingMachines = async () => {
      try {
        const response = await readDryingMachines();
        console.log("Drying Machines:", response.data);

        const machinesWithProperties = response.data.map(machine => ({
          ...machine,
          capacity: machine.capacity || machine.Capacity,
          currentLoad: 0,
        }));

        setDryingCapacities(machinesWithProperties);
        setDryingMachines(machinesWithProperties);
      } catch (error) {
        console.log("Error fetching drying machines: ", error);
      }
    };

    fetchDryingMachines();
  }, []);

  console.log("Drying Capacity:", dryingCapacities);

  const distributeWetLeavesToMachines = () => {
    if (dryingCapacities.length === 0 || totalWetLeaves === 0) {
      console.log("No machines or wet leaves data available.");
      return;
    }

    let remainingWeight = totalWetLeaves;
    const machinesCopy = [...dryingCapacities];

    while (remainingWeight > 0 && machinesCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * machinesCopy.length);
      const machine = machinesCopy[randomIndex];
      const remainingCapacity = machine.capacity - machine.currentLoad;
      const weightToAdd = Math.min(remainingWeight, remainingCapacity);

      if (weightToAdd > 0) {
        machine.currentLoad += weightToAdd;
        remainingWeight -= weightToAdd;

        if (machine.currentLoad === machine.capacity) {
          machinesCopy.splice(randomIndex, 1);
        }
      } else {
        machinesCopy.splice(randomIndex, 1);
      }
    }

    setDryingCapacities(machinesCopy);

    machinesCopy.forEach(async machine => {
      try {
        await updateMachineCurrentLoad(machine.id, machine.currentLoad);
      } catch (error) {
        console.log(`Error updating machine ${machine.id} current load:`, error);
      }
    });

    if (remainingWeight > 0) {
      console.log(`Remaining wet leaves weight: ${remainingWeight}`);
    }
  };

  useEffect(() => {
    distributeWetLeavesToMachines();
  }, [dryingMachines, totalWetLeaves]);

  useEffect(() => {
    const fetchFlouringMachines = async () => {
      try {
        const response = await readFlouringMachines();
        console.log("Flouring Machines:", response.data);

        const machinesWithProperties = response.data.map(machine => ({
          ...machine,
          capacity: machine.capacity || machine.Capacity,
          currentLoad: 0,
        }));

        setFlouringCapacities(machinesWithProperties);
        setFlouringMachines(machinesWithProperties);
      } catch (error) {
        console.log("Error fetching flouring machines: ", error);
      }
    };

    fetchFlouringMachines();
  }, []);

  console.log("Flouring Capacity:", flouringCapacities);

  const updateMachineCurrentLoad = async (machineId, currentLoad) => {
    console.log(`Simulating update for machine ${machineId} with current load ${currentLoad}`);
  };

  const distributeDriedLeavesToMachines = () => {
    if (flouringCapacities.length === 0 || totalDriedLeaves === 0) {
      console.log("No machines or dried leaves data available.");
      return;
    }

    let remainingWeight = totalDriedLeaves;
    const machinesCopy = [...flouringCapacities];

    while (remainingWeight > 0 && machinesCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * machinesCopy.length);
      const machine = machinesCopy[randomIndex];
      const remainingCapacity = machine.capacity - machine.currentLoad;
      const weightToAdd = Math.min(remainingWeight, remainingCapacity);

      if (weightToAdd > 0) {
        machine.currentLoad += weightToAdd;
        remainingWeight -= weightToAdd;

        if (machine.currentLoad === machine.capacity) {
          machinesCopy.splice(randomIndex, 1);
        }
      } else {
        machinesCopy.splice(randomIndex, 1);
      }
    }

    setFlouringCapacities(machinesCopy);

    machinesCopy.forEach(async machine => {
      try {
        await updateMachineCurrentLoad(machine.id, machine.currentLoad);
      } catch (error) {
        console.log(`Error updating machine ${machine.id} current load:`, error);
      }
    });

    if (remainingWeight > 0) {
      console.log(`Remaining dried leaves weight: ${remainingWeight}`);
    }
  };

  useEffect(() => {
    distributeDriedLeavesToMachines();
  }, [flouringMachines, totalDriedLeaves]);

  const handleTabClick = (tab) => setActiveTab(tab);

  const [wetLeavesData, setWetLeavesData] = useState({
    labels: ["Unprocessed Wet Leaves", "Empty"],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#538455", "#86B788"],
        borderColor: ["#538455", "#86B788"],
        borderWidth: 1,
        circumference: 360,
        rotation: 0,
        cutout: "75%",
      },
    ],
  });

  const [driedLeavesData, setDriedLeavesData] = useState({
    labels: ["Processed Dried Leaves", "Empty"],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#838453", "#B2B472"],
        borderColor: ["#838453", "#B2B472"],
        borderWidth: 1,
        circumference: 360,
        rotation: 0,
        cutout: "75%",
      },
    ],
  });

  const [flouredLeavesData, setFlouredLeavesData] = useState({
    labels: ["Floured Leaves", "Empty"],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#704B40", "#B78F82"],
        borderColor: ["#704B40", "#B78F82"],
        borderWidth: 1,
        circumference: 360,
        rotation: 0,
        cutout: "75%",
      },
    ],
  });

  useEffect(() => {
    const fetchWetLeavesData = async () => {
      try {
        const response = await readWetLeavesCollections();
        console.log("WetLeaves:", response.data);
        const collections = response.data;

        let totalWetLeaves = 0;
        collections.forEach((collection) => {
          totalWetLeaves += collection.Weight;
        });

        console.log("Total Weight of Wet Leaves:", totalWetLeaves);
        setTotalWetLeaves(totalWetLeaves);

        setWetLeavesData({
          ...wetLeavesData,
          datasets: [
            {
              ...wetLeavesData.datasets[0],
              data: [totalWetLeaves, 100 - totalWetLeaves],
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching wet leaves data: ", error);
      }
    };

    fetchWetLeavesData();
  }, []);

  useEffect(() => {
    const fetchDriedLeavesData = async () => {
      try {
        const response = await readDriedLeaves();
        console.log("Dried Leaves:", response.data);
        const collections = response.data;

        if (Array.isArray(collections)) {
          let totalDriedLeaves = 0;
          collections.forEach((collection) => {
            totalDriedLeaves += collection.Weight;
          });

          console.log("Total Weight of Dried Leaves:", totalDriedLeaves);
          setTotalDriedLeaves(totalDriedLeaves);

          setDriedLeavesData({
            ...driedLeavesData,
            datasets: [
              {
                ...driedLeavesData.datasets[0],
                data: [totalDriedLeaves, 100 - totalDriedLeaves],
              },
            ],
          });
        } else {
          console.log("Expected an array of dried leaves data, but received:", collections);
        }
      } catch (error) {
        console.log("Error fetching dried leaves data: ", error);
      }
    };

    fetchDriedLeavesData();
  }, []);

  useEffect(() => {
    const fetchFlouredLeavesData = async () => {
      try {
        const response = await readBatches();
        console.log("Floured:", response.data);
        const batches = response.data;

        let totalFlouredLeaves = 0;
        batches.forEach((batch) => {
          if (batch.FlouredDate) {
            totalFlouredLeaves += batch.Weight;
          }
        });

        console.log("Total Weight of Wet Leaves:", totalFlouredLeaves);
        setTotalFlouredLeaves(totalFlouredLeaves);

        setFlouredLeavesData({
          ...flouredLeavesData,
          datasets: [
            {
              ...flouredLeavesData.datasets[0],
              data: [totalFlouredLeaves, 100 - totalFlouredLeaves],
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching floured leaves data: ", error);
      }
    };

    fetchFlouredLeavesData();
  }, []);

  console.log("Outside useEffect - Total Weight of Wet Leaves:", totalWetLeaves);
  console.log("Outside useEffect - Total Weight of Dried Leaves:", totalDriedLeaves);
  console.log("Outside useEffect - Total Weight of Floured Leaves:", totalFlouredLeaves);

  const renderMachines = () => {
    const machines = activeTab === "drying" ? dryingMachines : flouringMachines;
    if (!machines || machines.length === 0) {
      return <div>No machines available</div>;
    }
    return machines.map((machine, index) => {
      const key = machine.id ? machine.id : index; // Ensure machine.id is unique and defined
      const isLastCard = index === machines.length - 1;
      const machineCardMarginClass = isLastCard ? "mb-10" : "mb-4";
      return (
        <MachineCard
          key={key}
          machine={machine}
          extraMarginClass={machineCardMarginClass}
        />
      );
    });
  };

  const MachineCard = ({ machine, extraMarginClass }) => {
    let chartColor = "#99D0D580";
    if (machine.currentLoad === machine.capacity) {
      chartColor = "#0F3F43";
    } else if (machine.currentLoad > machine.capacity / 2) {
      chartColor = "#5D9EA4";
    }

    const linkTo =
      activeTab === "drying"
        ? `/dryingmachine/${machine.number}`
        : `/flouringmachine/${machine.number}`;

    const lastUpdatedTime = new Date(machine.lastUpdated).toLocaleString();
    const machineStatusClass = (machine.status || "").toLowerCase();

    return (
      <div
        className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machineStatusClass}`}
        style={{ width: "auto", flexGrow: 1, minWidth: "300px", minHeight: "100px", maxWidth: "none", position: "relative" }}
      >
        <div
          className="machine-number bg-black text-white rounded-full h-6 w-6 flex items-center justify-center"
          style={{ position: "absolute", left: "15px", top: "15px" }}
        >
          <span className="font-bold text-sm">{machine.number}</span>
        </div>
        <div className="machine-info flex justify-center items-center w-full mb-2">
          <div className="chart-container" style={{ width: "150px", height: "120px", position: "relative" }}>
            <Doughnut
              data={{
                labels: ["Current Load", "Capacity"],
                datasets: [
                  {
                    data: [machine.currentLoad, machine.capacity - machine.currentLoad],
                    backgroundColor: [chartColor, "#EFEFEF"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={gaugeOptions}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ fontSize: "0" }}>
              <span className="font-vietnam font-bold" style={{ fontSize: "24px", lineHeight: "1.2" }}>
                {machine.currentLoad} kg
              </span>
              <span className="font-vietnam font-bold" style={{ fontSize: "12px", lineHeight: "1.2", marginBottom: "-30px" }}>
                {`/ ${machine.capacity} kg`}
              </span>
            </div>
          </div>
        </div>
        <button
          className={`start-btn text-white py-1 px-6 ${machine.currentLoad === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          style={{ backgroundColor: "#000000", width: "100%", borderRadius: "15px", fontSize: "12px" }}
          disabled={machine.currentLoad === 0}
        >
          <Link to={linkTo} className="flex items-center justify-center h-full w-full">
            START PROCESS
          </Link>
        </button>
        <div
          className="last-updated"
          style={{ position: "absolute", top: "5px", right: "5px", fontSize: "10px", color: "#666666" }}
        >
          <div>Last updated:</div>
          <div style={{ fontWeight: "bold" }}>{lastUpdatedTime}</div>
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
                  data={driedLeavesData}
                  label="Unfloured Dried Leaves"
                  backgroundColor="#828282"
                  labelStyle={{ color: "black", top: "20px" }}
                />
                <ChartWithBox
                  data={flouredLeavesData}
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
