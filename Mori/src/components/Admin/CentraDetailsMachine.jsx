import React from 'react';
import LeavesStatusDashboard from './LeavesStatusDashboard';
import PersonInChargeBox from './PersonInChargeBox';
import FlouringScheduleBox from './FlouringScheduleBox';
import DryingMachineBoxDashboard from './DryingMachineBoxDashboard';
import FlouringMachineBoxDashboard from './FlouringMachineBoxDashboard';
import LeavesStatusCard from "./LeavesStatusCard";
import PersonInChargeBox from "./PersonInChargeBox";
import FlouringScheduleBox from "./FlouringScheduleBox";
import DryingMachineBox from "./DryingMachineBox";
import DryingMachineBoxDashboard from "./DryingMachineBox";
import LeavesStatusDashboard from "./LeavesStatusCard";
import FlouringMachineBoxDashboard from "./FlouringMachineBox";
import FlouringMachineBox from "./FlouringMachineBox";

const CentraDetailsMachine = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-[28px] font-extrabold font-['Be Vietnam Pro'] mb-4">
          Centra Semang, Kupang
        </h1>
      </div>

      <div>
        <LeavesStatusDashboard />
      </div>

      <div className="mt-6 flex gap-6">
        <div className="flex-grow flex flex-col gap-6">
          <div className="flex gap-6">
            <PersonInChargeBox
              name="John Doe"
              email="john.doe@example.com"
            />
            <FlouringScheduleBox every={3} nearest={"2"} />
          </div>
        </div>
      </div>

      <div className="mt-4 text-black text-[28px] font-extrabold font-['Be Vietnam Pro'] mb-4">
        Drying Machine
      </div>

      <div className="mt-6 flex gap-6">
        <DryingMachineBoxDashboard />
      </div>

      <div className="mt-4 text-black text-[28px] font-extrabold font-['Be Vietnam Pro'] mb-4">
        Flouring Machine
      </div>

      <div className="mt-6 flex gap-6">
        <FlouringMachineBoxDashboard />
      </div>
    </div>
  );
};

export default CentraDetailsMachine;
