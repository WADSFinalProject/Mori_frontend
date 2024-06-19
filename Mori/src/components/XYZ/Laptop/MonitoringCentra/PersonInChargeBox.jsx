import React, { useState, useEffect } from 'react';
import { getUserCentra } from "../../../../service/userCentra";

const PersonInChargeBox = ({ centraId }) => {
  const [personInCharge, setPersonInCharge] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserCentra();
        const data = response.data;

        console.log('Fetched Data:', data);

        // Find the user centra with the matching centraId and active status
        const activePerson = data.find(userCentra => userCentra.usercentra.CentraID === centraId && userCentra.usercentra.Active);

        if (activePerson) {
          console.log('Active Person:', activePerson);

          setPersonInCharge({
            name: `${activePerson.user.FirstName} ${activePerson.user.LastName}`,
            email: activePerson.user.Email,
          });
        } else {
          setPersonInCharge({ name: '', email: '' }); // Reset to blank if no active person found
          console.warn('No active person found for this Centra ID');
        }
      } catch (error) {
        console.error("Error fetching user centra: ", error);
        setPersonInCharge({ name: '', email: '' }); // Reset to blank in case of error
      }
    };

    if (centraId) {
      fetchData();
    } else {
      setPersonInCharge({ name: '', email: '' }); // Reset to blank if no centraId is provided
    }
  }, [centraId]);

  return (
    <div className="w-full max-w-screen-md p-6 rounded-xl border border-black/opacity-20 flex justify-start items-center gap-4">
      <div className="w-16 h-16 bg-zinc-500 rounded-full"></div>
      <div className="flex flex-col justify-start items-start gap-0.5 flex-grow">
        <div>
          <span className="text-black text-xs font-medium font-vietnam-pro">Current </span>
          <span className="text-black text-xs font-bold font-vietnam-pro">Person in Charge</span>
        </div>
        <div className="text-black text-[22px] font-semibold font-vietnam-pro">{personInCharge.name}</div>
        <div className="text-black text-xs font-normal font-vietnam-pro underline">{personInCharge.email}</div>
      </div>
      <div className="flex-shrink-0 text-right text-black/25 text-sm font-sf-pro">
        <button className="text-black/25 text-l font-sf-pro focus:outline-none">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PersonInChargeBox;
