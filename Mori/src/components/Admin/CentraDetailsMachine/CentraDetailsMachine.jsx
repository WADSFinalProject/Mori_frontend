import React, { useEffect, useState } from 'react';
import LeavesStatusDashboard from './LeavesStatusCard';
import PersonInChargeBox from './PersonInChargeBox';
import FlouringScheduleBox from './FlouringScheduleBox';
import DryingMachineBoxDashboard from './DryingMachineBox';
import FlouringMachineBoxDashboard from './FlouringMachineBox';
// import { getLeavesStatus } from '../../services/leavesService';
// import { getDryingMachines, getFlouringMachines } from '../../services/machinesService';

const CentraDetailsMachine = ({ centraId }) => {
  const [leavesStatus, setLeavesStatus] = useState(null);
  const [dryingMachines, setDryingMachines] = useState([]);
  const [flouringMachines, setFlouringMachines] = useState([]);
  const [personInCharge, setPersonInCharge] = useState({ name: '', email: '' });
  const [flouringSchedule, setFlouringSchedule] = useState({ every: 0, nearest: '' });

  useEffect(() => {
    if (centraId) {
      fetchData(centraId);
    }
  }, [centraId]);

  const fetchData = async (id) => {
    try {
      // const leavesData = await getLeavesStatus(id);
      // setLeavesStatus(leavesData);

      // const dryingMachinesData = await getDryingMachines(id);
      // setDryingMachines(dryingMachinesData);

      // const flouringMachinesData = await getFlouringMachines(id);
      // setFlouringMachines(flouringMachinesData);

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
          Centra Semang, Kupang
        </h1>
      </div>

      <div>
        {leavesStatus && <LeavesStatusDashboard data={leavesStatus} />}
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
