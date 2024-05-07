import React, { useState } from "react";
import { useWindowSize } from 'react-use';
import { Link } from "react-router-dom";
import bell from '../../../assets/bell.png'; 
import hamburg from '../../../assets/hamburg.png'; 
import back from '../../../assets/back.png'; 
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'; //


const gaugeOptions = {
    responsive: true,
    cutout: '80%',
    circumference: 180,
    rotation: -90,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
    events: [],
  };

  const ChartWithBox = ({ data, label, backgroundColor, labelStyle }) => (
    <div className="chart-box-container rounded-lg shadow font-vietnam" style={{
      backgroundColor: backgroundColor,
      width: '150px',
      height: '170px',
      position: 'relative',
      marginTop: '20px'
    }}>
      <div className="chart-box-label text-sm font-bold text-center" style={{
        position: 'absolute',
        top: '10px',
        width: '100%',
        fontSize: '13px',
        paddingLeft: '20px',
        paddingRight: '20px',
        ...labelStyle // Apply custom label style
      }}>
        {label}
      </div>
      <div className="chart-box-doughnut" style={{
        position: 'absolute',
        top: '65%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px'
      }}>
        <Doughnut data={data} options={gaugeOptions} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">{data.datasets[0].data[0]}kg</span>
        </div>
      </div>
    </div>
  );
  
  
  
export default function Processor() {
    const { width } = useWindowSize();
    const isMobile = width <= 640;
    const [activeTab, setActiveTab] = useState('drying'); // State to manage active tab
    const [dryingMachines, setDryingMachines] = useState([
      { number: 1, status: 'FULL' },
      { number: 2, status: 'EMPTY' },
      { number: 3, status: 'EMPTY' }
    ]);
    const [flouringMachines, setFlouringMachines] = useState([
      { number: 1, status: 'EMPTY' },
      { number: 2, status: 'FULL' },
      { number: 3, status: 'EMPTY' }
    ]);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const wetLeavesData = {
        labels: ['Unprocessed Wet Leaves', 'Empty'],
        datasets: [
          {
            data: [10, 90], 
            backgroundColor: ['#FFFF', '#00000040'],
            borderColor: ['#FFFF', '#00000040'],
            borderWidth: 1,
            circumference: 360,
            rotation: -90,
            cutout: '75%',
          },
        ],
      };
      const driedLeavesData = {
        labels: ['Dried Leaves', 'Empty'],
        datasets: [
            {
                data: [20, 90], 
                backgroundColor: ['#000000', '#00000040'],
                borderColor: ['#000000', '#00000040'],
                borderWidth: 1,
                circumference: 360,
                rotation: -90,
                cutout: '75%',
            },
        ],
    };
    const Unfloureddriedleaves = {
        labels: ['Unfloured dried Leaves', 'Empty'],
        datasets: [
          {
            data: [10, 90], 
            backgroundColor: ['#FFFF', '#00000040'],
            borderColor: ['#FFFF', '#00000040'],
            borderWidth: 1,
            circumference: 360,
            rotation: -90,
            cutout: '75%',
          },
        ],
      };
      const flouredleaves = {
        labels: ['floured Leaves', 'Empty'],
        datasets: [
          {
            data: [10, 90], 
            backgroundColor: ['#000000', '#00000040'],
            borderColor: ['#000000', '#00000040'],
            borderWidth: 1,
            circumference: 360,
            rotation: -90,
            cutout: '75%',
          },
        ],
      };

      const renderMachines = () => {
        const machines = activeTab === 'drying' ? dryingMachines : flouringMachines;
        return machines.map((machine, index) => {
          const isLastCard = index === machines.length - 1;
          const machineCardMarginClass = isLastCard ? 'mb-10' : 'mb-4';
          return (
            <MachineCard 
              key={machine.number} 
              machine={machine} 
              extraMarginClass={machineCardMarginClass}
            />
          );
        });
      };
      const MachineCard = ({ machine, extraMarginClass }) => (
        <div className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machine.status.toLowerCase()}`} style={{ width: 'auto', flexGrow: 1, minWidth: '300px', minHeight: '100px', maxWidth: 'none' }}>
        <div className="machine-info flex justify-between w-full mb-2">
            <span className="font-bold text-xl">Machine {machine.number}</span>
            <div className={`status-circle flex items-center justify-center rounded-full h-6 w-14 font-vietnam font-semibold text-xs ${machine.status === 'FULL' ? 'text-black' : 'text-black'}`} style={{
              backgroundColor: machine.status === 'FULL' ? '#A1C598' : '#C59898'
            }}>
              <span className="status-text" style={{ fontSize: '9px' }}>{machine.status}</span> {/* Adjust font size inline */}
            </div>
          </div>
          <button 
            className={`start-btn text-white py-0.5 px-14 rounded-full mt-2 ${machine.status === 'EMPTY' ? 'opacity-50 cursor-not-allowed' : ''}`} 
            style={{ backgroundColor: '#6D7DD2' }} 
            disabled={machine.status === 'EMPTY'}
          >
            START PROCESS
          </button>
        </div>
      );
      
      
      
      
      
  
      
      
      
      
      
      

    return (
        <div >
          {isMobile ? (
            <div>
              <div className="p-4 shadow-md flex justify-between items-center bg-white ml-4">
  <Link to="/" className="flex items-center">
    <img src={back} alt="back" className="w-5 mr-2" /> 
  </Link>
  <span className="font-bold text-2xl lg:text-3xl xl:text-4xl mr-20 font-vietnam">Processor</span>
  <div className="flex">
    <img src={bell} alt="notifications" className="w-5 mr-2" />
    <img src={hamburg} alt="menu" className="w-5" />
  </div>
</div>


              
              <div className="flex bg-white">
              <div
                className={`flex-1 p-4 text-center font-vietnam ${activeTab === 'drying' ? 'border-b-2 border-black' : ''}`}
                onClick={() => handleTabClick('drying')}
              >
                Drying
              </div>
              <div
                className={`flex-1 p-4 text-center font-vietnam ${activeTab === 'flouring' ? 'border-b-2 border-black' : ''}`}
                onClick={() => handleTabClick('flouring')}
              >
                Flouring
              </div>
            </div>

    
              <div className="flex flex-col items-center justify-center space-y-4">
                {activeTab === 'drying' ? (
          <div className="flex justify-center gap-4" >
                    <ChartWithBox data={wetLeavesData} label="Total of unprocessed wet leaves" backgroundColor="#828282" 
                    labelStyle={{
                      color: 'white', 
                        
                      }} />
                    <ChartWithBox
                      data={driedLeavesData}
                      label="Total of dried leaves"
                      backgroundColor="#d9d9d9"
                      labelStyle={{
                        top: '20px'

                      }}
                    />
                  </div>
                ) : (
                    <div className="flex justify-center gap-4">
                    <ChartWithBox data={Unfloureddriedleaves} label="Total of Unfloured dried leaves" backgroundColor="#828282" 
                    labelStyle={{
                      color: 'white', 
                      }} />
                    <ChartWithBox data={flouredleaves} label="Total of Floured leaves" backgroundColor="#d9d9d9"
                    labelStyle={{
                      top: '20px'
                      }}  />
                  </div>
                )}
                <div className="machine-status my-4">
                    {renderMachines()}

                </div>
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
    }