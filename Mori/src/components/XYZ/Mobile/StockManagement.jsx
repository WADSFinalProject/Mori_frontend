import React, { useState, useEffect } from "react";
import { useWindowSize } from 'react-use';
import { useNavigate } from "react-router-dom";
import bell from '../../../assets/bell.png'; 
import hamburg from '../../../assets/hamburg.png'; 
import back from '../../../assets/back.png'; 
import arrowright from '../../../assets/arrowright.png';
import MachineCard from '../MachineCard'; // Import the MachineCard component

const StockManagement = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 640;
  const navigate = useNavigate();

  const [sort, setSort] = useState('heavy-light');
  const [location, setLocation] = useState('All');

  const [machines, setMachines] = useState([
    {
      number: 1,
      currentLoad: 24,
      capacity: 50,
      lastUpdated: '1 minute ago',
      location: 'Kecamatan Semau',
      details: {
        name: 'Nama Orang',
        phone: '(+62) 849-1289-2947',
        email: 'nama@xyz.id',
        address: 'Jl. Batuinan Raya 1 No. 2b, RT.7/RW.8, Desa Batuinan, Semau, Kupang, Nusa Tenggara Timur, ID, 19218'
      },
      currentStock: 38.1,
      history: [
        { type: 'Shipment', id: 10201, date: '19 March 2024 07:08 PM', change: '+42.3 kg' },
        { type: 'Usage', id: 10273, date: '19 March 2024 01:12 PM', change: '-40.4 kg' },
        { type: 'Shipment', id: 10279, date: '18 March 2024 09:08 AM', change: '+25.2 kg' }
      ]
    },
    {
      number: 2,
      currentLoad: 30,
      capacity: 50,
      lastUpdated: '5 minutes ago',
      location: 'Kecamatan Kupang',
      details: {
        name: 'Nama Kupang',
        phone: '(+62) 812-3456-7890',
        email: 'kupang@xyz.id',
        address: 'Jl. Kupang Indah No. 3, RT.4/RW.9, Desa Kupang, Kupang, Nusa Tenggara Timur, ID, 19219'
      },
      currentStock: 35.2,
      history: [
        { type: 'Shipment', id: 10202, date: '19 March 2024 07:10 PM', change: '+41.1 kg' },
        { type: 'Usage', id: 10274, date: '19 March 2024 01:14 PM', change: '-39.2 kg' },
        { type: 'Shipment', id: 10280, date: '18 March 2024 09:10 AM', change: '+24.5 kg' },
        { type: 'Shipment', id: 10282, date: '18 March 2024 09:10 AM', change: '+24.5 kg' },
        { type: 'Usage', id: 10281, date: '18 March 2024 09:10 AM', change: '-24.5 kg' }

      ]
    },
    {
      number: 3,
      currentLoad: 50,
      capacity: 50,
      lastUpdated: '10 minutes ago',
      location: 'Kecamatan Oebobo',
      details: {
        name: 'Nama Oebobo',
        phone: '(+62) 813-4567-8901',
        email: 'oebobo@xyz.id',
        address: 'Jl. Oebobo Baru No. 5, RT.6/RW.7, Desa Oebobo, Kupang, Nusa Tenggara Timur, ID, 19220'
      },
      currentStock: 42.2,

      history: [
        { id: 10203, type: 'Shipment', date: '18 March 2024 07:00 AM', change: '+50.0 kg' },
        { id: 10275, type: 'Usage', date: '18 March 2024 01:00 PM', change: '-10.0 kg' }
      ]
    },
    {
      number: 4,
      currentLoad: 20,
      capacity: 50,
      lastUpdated: '15 minutes ago',
      location: 'Kecamatan Tegal',
      details: {
        name: 'Nama Tegal',
        phone: '(+62) 814-5678-9012',
        email: 'tegal@xyz.id',
        address: 'Jl. Tegal Asri No. 7, RT.8/RW.6, Desa Tegal, Kupang, Nusa Tenggara Timur, ID, 19221'
      },
      currentStock: 50,

      history: [
        { id: 10204, type: 'Shipment', date: '17 March 2024 09:00 AM', change: '+20.0 kg' }
      ]
    }
    ]);

  const [filteredMachines, setFilteredMachines] = useState(machines);

  useEffect(() => {
    let updatedMachines = machines;
    if (location !== 'All') {
      updatedMachines = updatedMachines.filter(machine => machine.location === location);
    }
    
    if (sort === 'heavy-light') {
      updatedMachines = [...updatedMachines].sort((a, b) => b.currentLoad - a.currentLoad);
    } else if (sort === 'light-heavy') {
      updatedMachines = [...updatedMachines].sort((a, b) => a.currentLoad - b.currentLoad);
    }

    setFilteredMachines(updatedMachines);
  }, [location, sort, machines]);

  const getUniqueLocations = (machines) => {
    const locations = machines.map(machine => machine.location);
    return ['All', ...new Set(locations)];
  };

  const handleCardClick = (location) => {
    navigate(`/stockdetail/${location}`, { state: { machines: filteredMachines } });
  };

  const renderMachines = () => {
    return filteredMachines.map((machine, index) => {
      const isLastCard = index === filteredMachines.length - 1;
      const machineCardMarginClass = isLastCard ? 'mb-10' : 'mb-4';
      return (
        <MachineCard 
          key={machine.number} 
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
          <div className="p-4 shadow-md flex justify-between items-center bg-white fixed top-0 left-0 right-0 z-50">
            <button onClick={() => navigate(-1)}> 
              <img src={back} alt="back" className="w-5 mr-2" /> 
            </button>
            <span className="font-bold text-xl font-vietnam flex-1 text-center">Stock Management</span>
            <div className="flex space-x-2">
              <img src={bell} alt="notifications" className="w-5" />
              <img src={hamburg} alt="menu" className="w-5" />
            </div>
          </div>

          <div className="flex justify-between bg-white py-2 px-3 space-x-2 top-14 left-0 right-0 z-40 fixed">
            <div className="relative w-1/2">
              <div className="appearance-none w-full bg-white border border-black text-black py-1 px-2 leading-tight focus:outline-none focus:border-gray-500 flex flex-col items-center">
                <span className="font-bold text-sm text-center">Location</span>
                <div className="relative w-full">
                  <select
                    className="w-full bg-transparent mt-0.5 text-xs text-center appearance-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ border: 'none', padding: 0, marginTop: '-0.25rem' }}
                  >
                    {getUniqueLocations(machines).map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M7 10l5 5 5-5H7z"/>
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
                    style={{ border: 'none', padding: 0, marginTop: '-0.25rem' }}
                  >
                    <option value="heavy-light">Heaviest to Lightest</option>
                    <option value="light-heavy">Lightest to Heaviest</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M7 10l5 5 5-5H7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="machine-status my-4 px-4 mt-32">
            {renderMachines()}
          </div>
          
          <footer className="bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-semibold">@2024 AMIN</p>
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
};

export default StockManagement;
