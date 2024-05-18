import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import back from '../../../assets/back.png';
import MachineCard from '../MachineCard'; 
import point from '../../../assets/point.png';

const StockDetail = () => {
  const { location } = useParams();
  const { state } = useLocation();
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  const filteredMachines = state.machines.filter(machine => machine.location === location);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Location details copied to clipboard');
    }, () => {
      alert('Failed to copy to clipboard');
    });
  };

  return (
    <div className="bg-000000">
      {isMobile ? (
        <div>
          <div className="p-4 shadow-md flex justify-between items-center bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-400">
            <Link to="/xyz-stockmanagement" className="flex items-center">
              <img src={back} alt="back" className="w-5 mr-2" />
            </Link>
            <span className="font-bold text-xs text-gray-500 mx-auto font-vietnam">{location}</span>
          </div>

          <div className="machine-status my-4 px-4 mt-16">
            {filteredMachines.map((machine, index) => (
              <div key={machine.number} className="mb-2">
                <MachineCard 
                  machine={machine} 
                  extraMarginClass="mb-2"
                />
              </div>
            ))}
          </div>

          <div className="bg-white py-2 px-4 border-t border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src={point} alt="Point" className="h-6 mr-3" />
                <h2 className="font-bold text-lg mr-2">Location</h2>
              </div>
              <button 
                className="font-bold"
                onClick={() => copyToClipboard(`
                  ${filteredMachines[0].details.name}
                  ${filteredMachines[0].details.phone}
                  ${filteredMachines[0].details.email}
                  ${filteredMachines[0].details.address}
                `)}
                style={{ color: '#9CA25F' }}
              >
                COPY
              </button>
            </div>
            <div className="ml-7 text-gray-500 text-sm">
              <p><strong>{filteredMachines[0].details.name}</strong></p>
              <p>{filteredMachines[0].details.phone}</p>
              <p>{filteredMachines[0].details.email}</p>
              <p>{filteredMachines[0].details.address}</p>
            </div>
          </div>

          <div className="bg-white py-2 px-4 border-t border-gray-400 mt-2">
            <h2 className="font-bold text-lg mb-2">History</h2>
            {filteredMachines[0].history.slice(0, showAllHistory ? filteredMachines[0].history.length : 3).map((entry, index) => (
              <div key={index} className="flex justify-between items-center text-sm text-gray-600 mb-4"> {/* Increased margin bottom to increase gap */}
                <div>
                  <p className="font-bold">{entry.type} #{entry.id}</p> {/* Bolded text */}
                  <p>{entry.date}</p>
                </div>
                <p className={`font-semibold ${entry.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{entry.change}</p>
              </div>
            ))}
            {filteredMachines[0].history.length > 3 && (
              <div className="text-center border-t border-gray-400 py-2">
                <button 
                  className="text-xs font-bold text-gray-500" 
                  onClick={() => setShowAllHistory(!showAllHistory)}
                >
                  {showAllHistory ? 'SHOW LESS' : 'VIEW ALL'}
                </button>
              </div>
            )}
            <div className="text-center border-t border-gray-400 py-2">
              <h2 className="font-bold text-lg">Current Stock</h2>
              <p className="font-bold text-2xl" style={{ color: '#9CA25F' }}>{filteredMachines[0].currentLoad} kg</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">Not available for this device.</p>
        </div>
      )}
    </div>
  );
};

export default StockDetail;
