import React from "react";
import { useWindowSize } from 'react-use';
import { Doughnut } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { useState } from 'react';

import moriLogo from '../../assets/moriWhite.png';
import bell from '../../assets/bell.png';
import hamburg from '../../assets/hamburg.png';
import bg from '../../assets/usercardBG.png';
import collector from '../../assets/collectorLogo.png';
import processor from '../../assets/processorLogo.png';
import shipping from '../../assets/shippingLogo.png';

const gaugeOptions = {
  responsive: true,
  cutout: '80%',
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  maintainAspectRatio: false,
  events: [],
};

export default function CentraHome() {
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  const [machinesData, setMachines] = useState([
    { number: 1, status: 'FULL', currentLoad: 24, capacity: 30, lastUpdated: '1 hour ago' },
    { number: 2, status: 'FULL', currentLoad: 30, capacity: 30, lastUpdated: '2 hours ago' },
    { number: 3, status: 'EMPTY', currentLoad: 10, capacity: 30, lastUpdated: '30 minutes ago' },
  ]);
  
  const renderMachines = () => {
    return machinesData.map((machine, index) => (
      <MachineCard key={machine.number} machine={machine} extraMarginClass={index === machinesData.length - 1 ? 'mb-10' : 'mb-4'} />
    ));
  };
  
  const MachineCard = ({ machine, extraMarginClass }) => {
    const chartColor = machine.currentLoad === machine.capacity ? '#0F3F43' : (machine.currentLoad > machine.capacity / 2 ? '#5D9EA4' : '#99D0D580');
  
    const linkTo = `/dryingmachine/${machine.number}`;
  
    return (
      <div className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machine.status.toLowerCase()}`} style={{ width: 'auto', flexGrow: 1, minWidth: '300px', minHeight: '100px', maxWidth: 'none', position: 'relative' }}>
        <div className="machine-number bg-black text-white rounded-full h-6 w-6 flex items-center justify-center" style={{ position: 'absolute', left: '15px', top: '15px' }}>
          <span className="font-bold text-sm">{machine.number}</span>
        </div>
        <div className="machine-info flex justify-center items-center w-full mb-2">
          <div className="chart-container" style={{ width: '150px', height: '120px', position: 'relative' }}>
            <Doughnut data={{ labels: ['Current Load', 'Capacity'], datasets: [{ data: [machine.currentLoad, machine.capacity - machine.currentLoad], backgroundColor: [chartColor, '#EFEFEF'], borderWidth: 0 }] }} options={gaugeOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ fontSize: '0' }}>
              <span className="font-vietnam font-bold" style={{ fontSize: '24px', lineHeight: '1.2' }}>{machine.currentLoad} kg</span>
              <span className="font-vietnam font-bold" style={{ fontSize: '12px', lineHeight: '1.2', marginBottom: '-30px' }}>{`/ ${machine.capacity} kg`}</span>
            </div>
          </div>
        </div>
        <div className="last-updated" style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '10px', color: '#666666' }}>
          <div>Last updated:</div>
          <div style={{ fontWeight: 'bold' }}>{machine.lastUpdated}</div>
        </div>
      </div>
    );
  };
  

  return (
    <div>
      <style>
        {`
          .bg-custom-c16548 { background-color: #C16548; }
          .bg-custom-86b788 { background-color: #86B788; }
          .bg-custom-f4df67 { background-color: #F4DF67; }
        `}
      </style>

      {isMobile ? (
        <div className="bg-[#F0F0F0]">
          <header className="flex flex-col p-4 shadow-md" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link to="/centranavigation">
                  <img src={hamburg} alt="divisions" className="text-6xl font-bold text-gray-700 w-5" />
                </Link>
              </div>
              <img src={moriLogo} alt="mori logo" className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-20" />
              <div className="flex">
                <img src={bell} alt="notifications" className="text-6xl mr-2 font-bold text-gray-700 w-5" />
              </div>
            </div>
            <div className="flex flex-row gap-5 p-3">
              <div className="w-16 h-16 bg-black rounded-full"></div>
              <div className="">
                <p className="text-lg text-white font-semibold">Selamat pagi,</p>
                <p className="text-3xl text-white font-semibold">John Doe</p>
              </div>
            </div>
          </header>

          <div className="p-5">
            <div className="mt-">
              <h2 className="text-gray-600 font-bold">Quick Access</h2>
            </div>
            <div className="flex">
              <Link to="/collectormain">
                <div className="mt-3 mr-3 rounded-lg flex justify-center items-center relative" style={{ width: "110px", height: "100px", backgroundColor: "#5D9EA4"}}>
                  <img src={collector} alt="mori logo" className="absolute top-3 right-2 w-6" style={{ marginTop: "5px", marginRight: "5px" }} />
                  <p className="text-white text-center font-semibold absolute bottom-3 left-2" style={{ marginBottom: "5px", marginLeft: "5px" }}>Collector</p>
                </div>  
              </Link>
              <Link to="/centraprocessor">
                <div className="mt-3 mr-3 rounded-lg flex justify-center items-center relative" style={{ width: "110px", height: "100px", backgroundColor: "#4D946D"}}>
                  <img src={processor} alt="mori logo" className="absolute top-3 right-2 w-6" style={{ marginTop: "5px", marginRight: "5px" }} />
                  <p className="text-white text-center font-semibold absolute bottom-3 left-2" style={{ marginBottom: "5px", marginLeft: "5px" }}>Processor</p>
                </div> 
              </Link>
              <Link to="/centrashipping">
                <div className="mt-3 mr-3 rounded-lg flex justify-center items-center relative" style={{ width: "110px", height: "100px", backgroundColor: "#606060"}}>
                  <img src={shipping} alt="mori logo" className="absolute top-3 right-2 w-6" style={{ marginTop: "5px", marginRight: "5px" }} />
                  <p className="text-white text-center font-semibold absolute bottom-3 left-2" style={{ marginBottom: "5px", marginLeft: "5px" }}>Shipping</p>
                </div> 
              </Link>
            </div>
          </div>

            {/* Machine Stock Status */}
          <div className="p-5">
          <div className="mt-">
              <h2 className="text-gray-600 font-bold ">Machine Stock Status</h2>
            </div>
            <div className="machine-status my-4">{renderMachines()}</div>
          </div>

          <footer className="bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-semibold">@2024 AMIN</p>
            <p className="font-semibold">CENTRA</p>
          </footer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </div>
  );
}

