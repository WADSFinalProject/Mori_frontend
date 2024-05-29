import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const gaugeOptions = {
  responsive: true,
  cutout: '75%',
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

const MachineCard = ({ machine, extraMarginClass, onClick }) => {
  let chartColor = '#E0EA74';
  if (machine.currentLoad === machine.capacity) {
    chartColor = '#5C612C';
  } else if (machine.currentLoad > machine.capacity / 2) {
    chartColor = '#A7AD6F';
  }

  return (
    <div 
      className={`machine-card bg-white shadow ${extraMarginClass} flex flex-col items-center font-vietnam`} 
      style={{ width: 'auto', flexGrow: 1, maxWidth: 'none', position: 'relative' }}
      onClick={onClick}
    >
      <div className="flex items-center absolute top-4 left-4 bg-black text-white rounded px-2 py-1">
        <span className="text-sm font-semibold">{machine.location}</span>
      </div>
      <div className="machine-info flex justify-center items-center w-full mt-1">
        <div className="chart-container" style={{ width: '180px', height: '150px', position: 'relative', marginTop: '20px' }}>
          <Doughnut
            data={{
              labels: ['Current Load', 'Capacity'],
              datasets: [{
                data: [machine.currentLoad, machine.capacity - machine.currentLoad],
                backgroundColor: [chartColor, '#EFEFEF'],
                borderWidth: 0
              }]
            }}
            options={gaugeOptions}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
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

const DashboardMachineCard = ({ machines }) => {
  return (
    <div className="dashboard-machine-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {machines.map((machine, index) => (
        <MachineCard
          key={index}
          machine={machine}
          extraMarginClass={index % 3 === 0 ? 'ml-0' : 'ml-4'}
          onClick={() => console.log(`Clicked on machine: ${machine.location}`)}
        />
      ))}
    </div>
  );
};

export default DashboardMachineCard;
