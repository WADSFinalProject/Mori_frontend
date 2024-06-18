import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const LeavesStatusCard = ({ title, totalWeight, proportions, colors, labels }) => {
  const calculateWeights = (total) => {
    return proportions.map(proportion => (total * proportion).toFixed(1));
  };

  const weights = calculateWeights(totalWeight);

  const data = {
    labels: labels,
    datasets: [
      {
        data: weights,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map(color => `${color}99`), // Add transparency to the colors for hover effect
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '50%',
  };

  return (
    <div className="w-[500px] h-[199px] p-6 rounded-xl border border-black/opacity-20 flex-col justify-start items-start inline-flex relative">
      <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }}>
        <Doughnut data={data} options={options} style={{ width: '150px', height: '150px' }} />
      </div>
      <div style={{ marginBottom: '-10px', textAlign: 'left' }}>
        <div style={{ marginBottom: '-10px', fontSize: '1.5em', fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{totalWeight}kg</div>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'left' }}>
        {data.labels.map((label, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: data.datasets[0].backgroundColor[index], marginRight: '5px' }}></div>
            <div style={{ color: '#828282', fontSize: '11px', fontWeight: 'medium', fontFamily: 'Be Vietnam Pro' }}>
              <span style={{ color: data.datasets[0].backgroundColor[index] }}>{weights[index]}kg</span> {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeavesStatusDashboard = ({ data }) => {
  const { wetLeaves, driedLeaves, flouredLeaves } = data;

  return (
    <div className="flex flex-wrap gap-6">
      <LeavesStatusCard
        title="Wet Leaves"
        totalWeight={wetLeaves.totalWeight}
        proportions={wetLeaves.proportions}
        colors={['#CCE8EA', '#4D946D', '#CD4848']}
        labels={['Wet Leaves', 'Drying', 'Near Expiry']}
      />
      <LeavesStatusCard
        title="Dried Leaves"
        totalWeight={driedLeaves.totalWeight}
        proportions={driedLeaves.proportions}
        colors={['#9AD1B3', '#A7AD6F']}
        labels={['Wet Leaves', 'Drying']}
      />
      <LeavesStatusCard
        title="Floured Leaves"
        totalWeight={flouredLeaves.totalWeight}
        proportions={flouredLeaves.proportions}
        colors={['#666666', '#E0EA74']}
        labels={['To Ship', 'Floured Leaves']}
      />
    </div>
  );
};

export default LeavesStatusDashboard;
