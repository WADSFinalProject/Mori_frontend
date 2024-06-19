import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { Link, useNavigate } from "react-router-dom";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import back from "../../../assets/back.png";
import { Doughnut } from "react-chartjs-2";
import { readWetLeavesCollections } from "../../../service/wetLeaves.js";
import { readDriedLeaves } from "../../../service/driedLeaves.js";
import { readBatches } from "../../../service/batches.js";
import { readDryingMachines } from "../../../service/dryingMachine.js";
import { readFlouringMachines } from "../../../service/flouringMachine.js";

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

  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [dryingMachineIds, setDryingMachineIds] = useState([]);
  const [flouringMachineIds, setFlouringMachineIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDryingMachines = async () => {
      try {
        const response = await readDryingMachines();
        console.log("Drying Machines:", response.data);
  
        const machinesWithProperties = response.data.map(machine => ({
          ...machine,
          capacity: machine.capacity || machine.Capacity,
          currentLoad: 0,
        })).sort((a, b) => a.MachineID - b.MachineID); // Sort by MachineID
  
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
  
    fetchDryingMachines();
  }, []);
  
  useEffect(() => {
    const fetchWetLeavesData = async () => {
      try {
        const response = await readWetLeavesCollections();
        console.log("WetLeaves:", response.data);
        const collections = response.data;
  
        let totalWetLeaves = 0;
        const freshWetLeaves = collections.filter(collection => {
          console.log("Collection Status:", collection.Status); // Debug: Log each status
          return collection.Status === 'Fresh';
        });
  
        collections.forEach((collection) => {
          if (!collection.Expired) {
            totalWetLeaves += collection.Weight;
          }
        });
  
        console.log("Total Weight of Wet Leaves:", totalWetLeaves);
        console.log("Fresh Wet Leaves:", freshWetLeaves); // Store or use this variable as needed
  
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
  
  
  const distributeWetLeavesToMachines = (machinesWithProperties) => {
    if (!machinesWithProperties || machinesWithProperties.length === 0 || totalWetLeaves === 0) {
      console.log("No machines or wet leaves data available.");
      return;
    }
  
    let remainingWeight = totalWetLeaves;
    const machinesCopy = [...machinesWithProperties];
  
    machinesCopy.forEach(machine => {
      if (machine.Load == null) {
        const remainingCapacity = machine.capacity - machine.currentLoad;
        const weightToAdd = Math.min(remainingWeight, remainingCapacity);
  
        if (weightToAdd > 0) {
          machine.currentLoad += weightToAdd;
          remainingWeight -= weightToAdd;
  
          if (machine.currentLoad === machine.capacity) {
            console.log(`Machine ${machine.MachineID} reached full capacity.`);
          }
        } else {
          console.log(`Machine ${machine.MachineID} has no remaining capacity.`);
        }
      } else {
        console.log(`Machine ${machine.MachineID} already has a load.`);
      }
    });
  
    setDryingCapacities(machinesCopy);
    localStorage.setItem("dryingCapacities", JSON.stringify(machinesCopy)); // Store randomized data in localStorage
  
    machinesCopy.forEach(async machine => {
      try {
        await updateMachineCurrentLoad(machine.MachineID, machine.currentLoad);
      } catch (error) {
        console.log(`Error updating machine ${machine.MachineID} current load:`, error);
      }
    });
  
    if (remainingWeight > 0) {
      console.log(`Remaining wet leaves weight: ${remainingWeight}`);
    }
  };
  
  useEffect(() => {
    if (dryingMachines.length > 0 && totalWetLeaves > 0) {
      distributeWetLeavesToMachines(dryingMachines);
    }
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
        })).sort((a, b) => a.MachineID - b.MachineID); // Sort by MachineID
  
        setFlouringMachines(machinesWithProperties);
  
        // Check if randomized data exists in localStorage
        const storedFlouringCapacities = localStorage.getItem("flouringCapacities");
        if (storedFlouringCapacities) {
          setFlouringCapacities(JSON.parse(storedFlouringCapacities));
        } else {
          distributeDriedLeavesToMachines(machinesWithProperties);
        }
      } catch (error) {
        console.log("Error fetching flouring machines: ", error);
      }
    };
  
    fetchFlouringMachines();
  }, []);
  
  const distributeDriedLeavesToMachines = (machinesWithProperties) => {
    if (!machinesWithProperties || machinesWithProperties.length === 0 || totalDriedLeaves === 0) {
      console.log("No machines or dried leaves data available.");
      return;
    }
  
    let remainingWeight = totalDriedLeaves;
    const machinesCopy = [...machinesWithProperties];
  
    machinesCopy.forEach(machine => {
      if (machine.Load == null) {
        const remainingCapacity = machine.capacity - machine.currentLoad;
        const weightToAdd = Math.min(remainingWeight, remainingCapacity);
  
        if (weightToAdd > 0) {
          machine.currentLoad += weightToAdd;
          remainingWeight -= weightToAdd;
  
          if (machine.currentLoad === machine.capacity) {
            console.log(`Machine ${machine.MachineID} reached full capacity.`);
          }
        } else {
          console.log(`Machine ${machine.MachineID} has no remaining capacity.`);
        }
      } else {
        console.log(`Machine ${machine.MachineID} already has a load.`);
      }
    });
  
    setFlouringCapacities(machinesCopy);
    localStorage.setItem("flouringCapacities", JSON.stringify(machinesCopy)); // Store randomized data in localStorage
  
    machinesCopy.forEach(async machine => {
      try {
        await updateMachineCurrentLoad(machine.MachineID, machine.currentLoad);
      } catch (error) {
        console.log(`Error updating machine ${machine.MachineID} current load:`, error);
      }
    });
  
    if (remainingWeight > 0) {
      console.log(`Remaining dried leaves weight: ${remainingWeight}`);
    }
  };
  
  useEffect(() => {
    if (flouringMachines.length > 0 && totalDriedLeaves > 0) {
      distributeDriedLeavesToMachines(flouringMachines);
    }
  }, [flouringMachines, totalDriedLeaves]);
  

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleMachineClick = (machine) => {
    setSelectedMachineId(machine.MachineID);
    
    const linkTo =
      activeTab === "drying"
        ? `/dryingmachine/${machine.MachineID}`
        : activeTab === "flouring"
        ? `/flouringmachine/${machine.MachineID}`
        : "#";
  
    // Navigate to the URL if it's not the default "#"
    if (linkTo !== "#") {
      navigate(linkTo, {
        state: {
          centraID: machine.CentraID, // Include centralID here
          id: machine.MachineID,
          capacity: machine.capacity,
          status: machine.Status,
          currentLoad: machine.currentLoad,
          duration: machine.Duration,
          load: machine.Load,
        },
      });
    }
  };
  
  

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
    const fetchDriedLeavesData = async () => {
      try {
        const response = await readDriedLeaves();
        console.log("Dried Leaves:", response.data);
        const collections = response.data;
  
        if (Array.isArray(collections)) {
          const filteredCollections = collections.filter(collection => !collection.Floured);
          let totalDriedLeaves = 0;
          filteredCollections.forEach((collection) => {
            totalDriedLeaves += collection.Weight;
          });
  
          console.log("Total Weight of Dried Leaves (Filtered):", totalDriedLeaves);
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

        // Filter out batches where Shipped is true
        const filteredBatches = batches.filter(batch => !batch.Shipped);

        let totalFlouredLeaves = 0;
        filteredBatches.forEach((batch) => {
          if (batch.FlouredDate) {
            totalFlouredLeaves += batch.Weight;
          }
        });

        console.log("Total Weight of Floured Leaves:", totalFlouredLeaves);
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
          onClick={() => handleMachineClick(machine)}
          activeTab={activeTab} // Pass the activeTab to the MachineCard component
        />
      );
    });
  };
  
  

  const MachineCard = ({ machine, extraMarginClass, onClick, activeTab }) => {
    let chartColor = "#99D0D580";
    if (machine.Load === machine.capacity) {
      chartColor = "#0F3F43";
    } else if (machine.Load > machine.capacity / 2) {
      chartColor = "#5D9EA4";
    }
  
    const lastUpdatedTime = new Date(machine.lastUpdated).toLocaleString();
    const machineStatusClass = (machine.status || "").toLowerCase();
  
    return (
      <div
        className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machineStatusClass}`}
        style={{
          width: "auto",
          flexGrow: 1,
          minWidth: "300px",
          minHeight: "100px",
          maxWidth: "none",
          position: "relative",
        }}
        onClick={onClick} // Use the onClick prop here
      >
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
                    data: [machine.Load, machine.capacity - machine.Load],
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
              <span className="font-vietnam font-bold" style={{ fontSize: "24px", lineHeight: "1.2" }}>
                {machine.Load} kg
              </span>
              <span className="font-vietnam font-bold" style={{ fontSize: "12px", lineHeight: "1.2", marginBottom: "-30px" }}>
                {`/ ${machine.capacity} kg`}
              </span>
            </div>
          </div>
        </div>
        <button
          className={`start-btn text-white py-1 px-6 ${
            machine.Load === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ backgroundColor: "#000000", width: "100%", borderRadius: "15px", fontSize: "12px" }}
          disabled={machine.Load === 0}
          onClick={onClick} // Use the onClick prop here
        >
          START PROCESS
        </button>
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
