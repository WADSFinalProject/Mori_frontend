import React, { useEffect, useState } from 'react';
import LeavesStatusDashboard from './LeavesStatusCard';
import PersonInChargeBox from './PersonInChargeBox';
import FlouringScheduleBox from './FlouringScheduleBox';
import DryingMachineBoxDashboard from './DryingMachineBox';
import FlouringMachineBoxDashboard from './FlouringMachineBox';
import { getLeavesData } from '../../../service/centras';

const dummyDryingMachines = [
  {
    machineNumber: 1,
    driedDate: '13 March 2024',
    startTime: '02:45 PM',
    filledWeight: 24.1,
    totalWeight: 30,
    lastUpdated: '1 Minute Ago',
    duration: 0, // Duration in minutes
  },
  {
    machineNumber: 2,
    driedDate: '13 March 2024',
    startTime: '02:45 PM',
    filledWeight: 30,
    totalWeight: 30,
    lastUpdated: '1 Minute Ago',
    duration: 20, // Duration in minutes
  },
  {
    machineNumber: 3,
    driedDate: '13 March 2024',
    startTime: '02:45 PM',
    filledWeight: 17.2,
    totalWeight: 30,
    lastUpdated: '1 Minute Ago',
    duration: 0, // Duration in minutes
  },
];

const dummyFlouringMachines = [
  {
    machineNumber: 1,
    flouredDate: '13 March 2024',
    startTime: '02:45 PM',
    filledWeight: 24.1,
    totalWeight: 30,
    lastUpdated: '1 Minute Ago',
    duration: 0,
  },
  {
    machineNumber: 2,
    flouredDate: '13 March 2024',
    startTime: '02:45 PM',
    filledWeight: 30,
    totalWeight: 30,
    lastUpdated: '1 Minute Ago',
    duration: 25,
  },
  {
    machineNumber: 3,
    flouredDate: '13 March 2024',
    startTime: '02:45 PM',
    filledWeight: 17.2,
    totalWeight: 30,
    lastUpdated: '1 Minute Ago',
    duration: 0,
  },
];

const CentraDetailsMachine = ({ centraId, location }) => {
  const [leavesStatus, setLeavesStatus] = useState(null);
  const [dryingMachines, setDryingMachines] = useState([]);
  const [flouringMachines, setFlouringMachines] = useState([]);
  const [personInCharge, setPersonInCharge] = useState({ name: '', email: '' });
  const [flouringSchedule, setFlouringSchedule] = useState({ every: 0, nearest: '' });

  useEffect(() => {
    if (centraId) {
      fetchData();
    }
  }, [centraId]);

  const fetchData = async () => {
    try {
      // const response = await getLeavesData(centraId);

      // Process the response to fit the expected structure
      // const { wetLeaves, driedLeaves, flouredLeaves } = response.data;

      // const processedLeavesStatus = {
      //   wetLeaves: {
      //     totalWeight: wetLeaves.reduce((sum, leaf) => sum + leaf.Weight, 0),
      //     proportions: wetLeaves.map(leaf => leaf.Weight / wetLeaves.reduce((sum, leaf) => sum + leaf.Weight, 0)),
      //   },
      //   driedLeaves: {
      //     totalWeight: driedLeaves.reduce((sum, leaf) => sum + leaf.Weight, 0),
      //     proportions: driedLeaves.map(leaf => leaf.Weight / driedLeaves.reduce((sum, leaf) => sum + leaf.Weight, 0)),
      //   },
      //   flouredLeaves: {
      //     totalWeight: flouredLeaves.reduce((sum, leaf) => sum + leaf.Weight, 0),
      //     proportions: flouredLeaves.map(leaf => leaf.Weight / flouredLeaves.reduce((sum, leaf) => sum + leaf.Weight, 0)),
      //   },
      // };

      // setLeavesStatus(processedLeavesStatus);

      getLeavesData(centraId)
        .then(res => {
          setLeavesStatus(res.data)
        })
        .catch(err => {
          console.error(err)
        });

      // Process the drying and flouring machines data if needed
      setDryingMachines(dummyDryingMachines); // Replace with actual data processing if needed
      setFlouringMachines(dummyFlouringMachines); // Replace with actual data processing if needed

      // Mock data for person in charge and flouring schedule
      setPersonInCharge({ name: 'John Doe', email: 'john.doe@example.com' });
      setFlouringSchedule({ every: 3, nearest: '2' });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-[28px] font-bold font-['Be Vietnam Pro'] mb-4">
          {location}
        </h1>
      </div>

      <div>
        {leavesStatus && (
          <LeavesStatusDashboard data={leavesStatus} />
        )}
      </div>

      <div className="mt-6 flex gap-6">
        <div className="flex-grow flex flex-col gap-6">
          <div className="flex gap-6">
            <PersonInChargeBox
              name={personInCharge.name}
              email={personInCharge.email}
            />
            <FlouringScheduleBox every={flouringSchedule.every} nearest={flouringSchedule.nearest} />
          </div>
        </div>
      </div>

      <div className="mt-4 text-black text-[28px] font-semibold font-['Be Vietnam Pro'] mb-4">
        Drying Machine
      </div>

      <div className="mt-6 flex gap-6">
        <DryingMachineBoxDashboard data={dryingMachines} />
      </div>

      <div className="mt-4 text-black text-[28px] font-semibold font-['Be Vietnam Pro'] mb-4">
        Flouring Machine
      </div>

      <div className="mt-6 flex gap-6">
        <FlouringMachineBoxDashboard data={flouringMachines} />
      </div>
    </div>
  );
};

export default CentraDetailsMachine;
