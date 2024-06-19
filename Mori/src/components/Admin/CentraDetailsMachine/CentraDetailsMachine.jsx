import React, { useEffect, useState } from 'react';
import LeavesStatusDashboard from './LeavesStatusCard';
import PersonInChargeBox from './PersonInChargeBox';
import DryingMachineBoxDashboard from './DryingMachineBox';
import FlouringMachineBoxDashboard from './FlouringMachineBox';
import { getLeavesData } from '../../../service/centras';
import { getFlouringMachines_byCentra } from '../../../service/flouringMachine';
import { getDryingMachine_byCentra } from '../../../service/dryingMachine';

const CentraDetailsMachine = ({ centraId, location }) => {
  const [leavesStatus, setLeavesStatus] = useState(null);
  const [dryingMachines, setDryingMachines] = useState([]);
  const [flouringMachines, setFlouringMachines] = useState([]);

  useEffect(() => {
    if (centraId) {
      fetchData();
    }
  }, [centraId]);

  const fetchData = async () => {
    try {
      const leavesResponse = await getLeavesData(centraId);
      setLeavesStatus(leavesResponse.data);

      const dryingResponse = await getDryingMachine_byCentra(centraId);
      setDryingMachines(dryingResponse.data);

      const flouringResponse = await getFlouringMachines_byCentra(centraId);
      setFlouringMachines(flouringResponse.data);
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
            <PersonInChargeBox centraId={centraId} />
          </div>
        </div>
      </div>

      <div className="mt-4 text-black text-[28px] font-semibold font-['Be Vietnam Pro'] mb-4">
        Drying Machine
      </div>

      <div className="mt-6 flex gap-6">
        <DryingMachineBoxDashboard centraId={centraId} />
      </div>

      <div className="mt-4 text-black text-[28px] font-semibold font-['Be Vietnam Pro'] mb-4">
        Flouring Machine
      </div>

      <div className="mt-6 flex gap-6">
        <FlouringMachineBoxDashboard centraId={centraId} />
      </div>
    </div>
  );
};

export default CentraDetailsMachine;
