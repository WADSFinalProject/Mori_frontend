import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import back from "../../../assets/back.png";
import arrowright from "../../../assets/arrowright.png";
import MachineCard from "../MachineCard"; // Import the MachineCard component
import { getAllWarehouses, getWarehouseDetails } from "../../../service/warehousesService";

const StockManagement = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 640;
  const navigate = useNavigate();

  const [sort, setSort] = useState("heavy-light");
  const [location, setLocation] = useState("All");
  const [warehouseId, setWarehouseId] = useState([]); // Default warehouseId to null
  const [machines, setMachines] = useState([]);
  const [warehouses, setWarehouses] = useState([]); // State to store all warehouse details

  useEffect(() => {
    fetchAllWarehouses(); // Fetch all warehouse details on component mount
  }, []);

  useEffect(() => {
    if (warehouseId !== null) {
      fetchWarehouseDetails(warehouseId);
    }
  }, [warehouseId]); // Fetch data when warehouseId changes

  const fetchAllWarehouses = async () => {
    try {
      const response = await getAllWarehouses();
      const data = response.data;
      setWarehouses(data);
      console.log("All warehouse details:", data); // Log all warehouse details
    } catch (error) {
      console.error("Error fetching all warehouses: ", error);
    }
  };

const fetchWarehouseDetails = async (warehouse_id) => {
  try {
    const response = await getWarehouseDetails(warehouse_id);
    const data = response.data;
    console.log('Raw data from backend:', data);

    // Check if data is an array
    if (Array.isArray(data)) {
      // Transform the data if needed
      const transformedData = data.map(item => ({
        location: item.location,
        currentLoad: item.TotalStock,
        capacity: item.Capacity, // Assuming capacity is provided by the backend
        lastUpdated: item.lastUpdated || null, // Customize as needed
      }));
      console.log('Transformed data:', transformedData);

      setMachines(transformedData); // Update machines with transformed data
      console.log('Machines state:', machines); // Log machines state to debug
    } else {
      console.error('Data is not an array:', data);
      // Handle case where data is not an array if needed
    }
  } catch (error) {
    console.error('Error fetching warehouse details:', error);
    // Handle error state if needed
  }
};


  // const [machines, setMachines] = useState([
  //   {
  //     number: 1,
  //     currentLoad: 24,
  //     capacity: 50,
  //     lastUpdated: "1 minute ago",
  //     location: "Kecamatan Semau",
  //     details: {
  //       name: "Nama Orang",
  //       phone: "(+62) 849-1289-2947",
  //       email: "nama@xyz.id",
  //       address:
  //         "Jl. Batuinan Raya 1 No. 2b, RT.7/RW.8, Desa Batuinan, Semau, Kupang, Nusa Tenggara Timur, ID, 19218",
  //     },
  //     currentStock: 38.1,
  //     history: [
  //       {
  //         type: "Shipment",
  //         id: 10201,
  //         date: "19 March 2024 07:08 PM",
  //         change: "+42.3 kg",
  //       },
  //       {
  //         type: "Usage",
  //         id: 10273,
  //         date: "19 March 2024 01:12 PM",
  //         change: "-40.4 kg",
  //       },
  //       {
  //         type: "Shipment",
  //         id: 10279,
  //         date: "18 March 2024 09:08 AM",
  //         change: "+25.2 kg",
  //       },
  //     ],
  //   },
  //   {
  //     number: 2,
  //     currentLoad: 30,
  //     capacity: 50,
  //     lastUpdated: "5 minutes ago",
  //     location: "Kecamatan Kupang",
  //     details: {
  //       name: "Nama Kupang",
  //       phone: "(+62) 812-3456-7890",
  //       email: "kupang@xyz.id",
  //       address:
  //         "Jl. Kupang Indah No. 3, RT.4/RW.9, Desa Kupang, Kupang, Nusa Tenggara Timur, ID, 19219",
  //     },
  //     currentStock: 35.2,
  //     history: [
  //       {
  //         type: "Shipment",
  //         id: 10202,
  //         date: "19 March 2024 07:10 PM",
  //         change: "+41.1 kg",
  //       },
  //       {
  //         type: "Usage",
  //         id: 10274,
  //         date: "19 March 2024 01:14 PM",
  //         change: "-39.2 kg",
  //       },
  //       {
  //         type: "Shipment",
  //         id: 10280,
  //         date: "18 March 2024 09:10 AM",
  //         change: "+24.5 kg",
  //       },
  //       {
  //         type: "Shipment",
  //         id: 10282,
  //         date: "18 March 2024 09:10 AM",
  //         change: "+24.5 kg",
  //       },
  //       {
  //         type: "Usage",
  //         id: 10281,
  //         date: "18 March 2024 09:10 AM",
  //         change: "-24.5 kg",
  //       },
  //     ],
  //   },
  //   {
  //     number: 3,
  //     currentLoad: 50,
  //     capacity: 50,
  //     lastUpdated: "10 minutes ago",
  //     location: "Kecamatan Oebobo",
  //     details: {
  //       name: "Nama Oebobo",
  //       phone: "(+62) 813-4567-8901",
  //       email: "oebobo@xyz.id",
  //       address:
  //         "Jl. Oebobo Baru No. 5, RT.6/RW.7, Desa Oebobo, Kupang, Nusa Tenggara Timur, ID, 19220",
  //     },
  //     currentStock: 42.2,

  //     history: [
  //       {
  //         id: 10203,
  //         type: "Shipment",
  //         date: "18 March 2024 07:00 AM",
  //         change: "+50.0 kg",
  //       },
  //       {
  //         id: 10275,
  //         type: "Usage",
  //         date: "18 March 2024 01:00 PM",
  //         change: "-10.0 kg",
  //       },
  //     ],
  //   },
  //   {
  //     number: 4,
  //     currentLoad: 20,
  //     capacity: 50,
  //     lastUpdated: "15 minutes ago",
  //     location: "Kecamatan Tegal",
  //     details: {
  //       name: "Nama Tegal",
  //       phone: "(+62) 814-5678-9012",
  //       email: "tegal@xyz.id",
  //       address:
  //         "Jl. Tegal Asri No. 7, RT.8/RW.6, Desa Tegal, Kupang, Nusa Tenggara Timur, ID, 19221",
  //     },
  //     currentStock: 50,

  //     history: [
  //       {
  //         id: 10204,
  //         type: "Shipment",
  //         date: "17 March 2024 09:00 AM",
  //         change: "+20.0 kg",
  //       },
  //     ],
  //   },
  // ]);

  const [filteredMachines, setFilteredMachines] = useState(machines);

  useEffect(() => {
    let updatedMachines = machines;
    if (location !== "All") {
      updatedMachines = updatedMachines.filter(
        (machine) => machine.location === location
      );
    }

    if (sort === "heavy-light") {
      updatedMachines = [...updatedMachines].sort(
        (a, b) => b.currentLoad - a.currentLoad
      );
    } else if (sort === "light-heavy") {
      updatedMachines = [...updatedMachines].sort(
        (a, b) => a.currentLoad - b.currentLoad
      );
    }

    setFilteredMachines(updatedMachines);
  }, [location, sort, machines]);

  const getUniqueLocations = (machines) => {
    const locations = machines.map((machine) => machine.location);
    return ["All", ...new Set(locations)];
  };

  const handleCardClick = (location) => {
    navigate(`/stockdetail/${location}`, {
      state: { machines: filteredMachines },
    });
  };

  const renderMachines = () => {
    return filteredMachines.map((machine, index) => {
      const isLastCard = index === filteredMachines.length - 1;
      const machineCardMarginClass = isLastCard ? "mb-10" : "mb-4";
      return (
        <MachineCard
          key={machine.location + index} // Ensure a unique key
          machine={machine}
          extraMarginClass={machineCardMarginClass}
          onClick={() => handleCardClick(machine.location)} // Pass the location on click
        />
      );
    });
  };
  
  return (
    <div className="bg-000000">
      {isMobile ? (
        <div>
          <header className="w-full pt-4 h-16 fixed top-0 left-0 z-50 bg-white">
            <div className="flex flex-row justify-between mx-6 items-center">
              <button onClick={() => navigate(-1)}>
                <img src={back} alt="back" className="w-5 mr-2" />
              </button>
              <div className="font-vietnam text-xl font-bold select-none">
                Stock Management
              </div>
              <svg
                className="hover:cursor-pointer"
                onClick={null}
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.71171 16.6067C0.666667 16.6067 0 15.9634 0 15.0218C0 13.9496 0.792793 13.0919 1.64865 12.3273C2.34234 11.7027 2.46847 10.3508 2.65766 8.87776C2.9009 5.69855 3.95496 3.35843 6.18919 2.52866C6.6036 1.27935 7.66667 0.375 9 0.375C10.3333 0.375 11.3874 1.27935 11.8108 2.52866C14.045 3.35843 15.0991 5.69855 15.3423 8.87776C15.5225 10.3508 15.6577 11.7027 16.3514 12.3273C17.1982 13.0919 18 13.9496 18 15.0218C18 15.9634 17.3333 16.6067 16.2883 16.6067H1.71171ZM9 20.625C7.2973 20.625 6.05405 19.4037 5.94595 17.9586H12.0541C11.9459 19.4037 10.7027 20.625 9 20.625Z"
                  fill="black"
                />
              </svg>
            </div>
          </header>

          <div className="flex justify-between bg-white py-2 px-3 space-x-2 top-14 left-0 right-0 z-40 fixed">
            <div className="relative w-1/2">
              <div className="appearance-none w-full bg-white border border-black text-black py-1 px-2 leading-tight focus:outline-none focus:border-gray-500 flex flex-col items-center">
                <span className="font-bold text-sm text-center">Location</span>
                <div className="relative w-full">
                  <select
                    className="w-full bg-transparent mt-0.5 text-xs text-center appearance-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      border: "none",
                      padding: 0,
                      marginTop: "-0.25rem",
                    }}
                  >
                    {getUniqueLocations(machines).map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-1/2">
              <div className="appearance-none w-full bg-white border border-black text-black py-1 px-2 leading-tight focus:outline-none focus:border-gray-500 flex flex-col items-center">
                <span className="font-bold text-sm text-center">Sort By</span>
                <div className="relative w-full">
                  <select
                    className="w-full bg-transparent mt-0.5 text-xs text-center appearance-none"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    style={{
                      border: "none",
                      padding: 0,
                      marginTop: "-0.25rem",
                    }}
                  >
                    <option value="heavy-light">Heaviest to Lightest</option>
                    <option value="light-heavy">Lightest to Heaviest</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="machine-status my-4 px-4 mt-32">
            {renderMachines()}
          </div>

          <footer className="font-vietnam bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-bold">@2024 MORI</p>
            <p className="font-semibold">XYZ</p>
          </footer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">Not available for this device.</p>
        </div>
      )}
    </div>
  );
};

export default StockManagement;
