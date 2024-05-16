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

const ChartWithBox = ({ data, label, labelStyle }) => (
  <div className="chart-box-container rounded-lg shadow font-vietnam" style={{ backgroundColor: '#f0f0f0', width: '150px', height: '170px', position: 'relative', marginTop: '20px' }}>
    <div className="chart-box-label text-sm font-bold text-center" style={{ position: 'absolute', top: '10px', width: '100%', fontSize: '13px', paddingLeft: '20px', paddingRight: '20px', ...labelStyle }}>
      {label}
    </div>
    <div className="chart-box-doughnut" style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px' }}>
      <Doughnut data={data} options={gaugeOptions} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold">{data.datasets[0].data[0]}kg</span>
      </div>
    </div>
  </div>
);

export default function CentraHome() {
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  const [activeTab, setActiveTab] = useState('drying');
  const [dryingMachines, setDryingMachines] = useState([
    { number: 1, status: 'FULL', currentLoad: 24, capacity: 30, lastUpdated: '1 hour ago' },
    { number: 2, status: 'FULL', currentLoad: 30, capacity: 30, lastUpdated: '2 hours ago' },
    { number: 3, status: 'EMPTY', currentLoad: 10, capacity: 30, lastUpdated: '30 minutes ago' },
  ]);
  
  const [flouringMachines, setFlouringMachines] = useState([
    { number: 1, status: 'FULL', currentLoad: 24, capacity: 30, lastUpdated: '45 minutes ago' },
    { number: 2, status: 'FULL', currentLoad: 10, capacity: 30, lastUpdated: '3 hours ago' },
    { number: 3, status: 'EMPTY', currentLoad: 10, capacity: 30, lastUpdated: '1 hour ago' },
  ]);
  

  const handleTabClick = (tab) => setActiveTab(tab);

  const wetLeavesData = { temperature: 25, humidity: 70 };
const driedLeavesData = { temperature: 30, humidity: 20 };
const Unfloureddriedleaves = { temperature: 28, humidity: 40 };
const flouredleaves = { temperature: 32, humidity: 25 };


  const renderMachines = () => {
    const machines = activeTab === 'drying' ? dryingMachines : flouringMachines;
    return machines.map((machine, index) => (
      <MachineCard key={machine.number} machine={machine} extraMarginClass={index === machines.length - 1 ? 'mb-10' : 'mb-4'} />
    ));
  };

  const MachineCard = ({ machine, extraMarginClass }) => {
    const chartColor = machine.currentLoad === machine.capacity ? '#0F3F43' : (machine.currentLoad > machine.capacity / 2 ? '#5D9EA4' : '#99D0D580');

    const linkTo = activeTab === 'drying' ? `/dryingmachine/${machine.number}` : `/flouringmachine/${machine.number}`;

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
                <Link to="/navigation">
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
              <Link to="/collector">
                <div className="mt-3 mr-3 rounded-lg flex justify-center items-center relative" style={{ width: "110px", height: "100px", backgroundColor: "#5D9EA4"}}>
                  <img src={collector} alt="mori logo" className="absolute top-3 right-2 w-6" style={{ marginTop: "5px", marginRight: "5px" }} />
                  <p className="text-white text-center font-semibold absolute bottom-3 left-2" style={{ marginBottom: "5px", marginLeft: "5px" }}>Collector</p>
                </div>  
              </Link>
              <Link to="/processor">
                <div className="mt-3 mr-3 rounded-lg flex justify-center items-center relative" style={{ width: "110px", height: "100px", backgroundColor: "#4D946D"}}>
                  <img src={processor} alt="mori logo" className="absolute top-3 right-2 w-6" style={{ marginTop: "5px", marginRight: "5px" }} />
                  <p className="text-white text-center font-semibold absolute bottom-3 left-2" style={{ marginBottom: "5px", marginLeft: "5px" }}>Processor</p>
                </div> 
              </Link>
              <Link to="/shipping">
                <div className="mt-3 mr-3 rounded-lg flex justify-center items-center relative" style={{ width: "110px", height: "100px", backgroundColor: "#606060"}}>
                  <img src={shipping} alt="mori logo" className="absolute top-3 right-2 w-6" style={{ marginTop: "5px", marginRight: "5px" }} />
                  <p className="text-white text-center font-semibold absolute bottom-3 left-2" style={{ marginBottom: "5px", marginLeft: "5px" }}>Shipping</p>
                </div> 
              </Link>
            </div>
          </div>

          <div className="p-5">
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

