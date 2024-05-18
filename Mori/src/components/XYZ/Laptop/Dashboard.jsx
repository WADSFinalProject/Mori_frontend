import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 p-10 mt-24 text-2xl font-bold"> {/* Adjusted margin-top */}
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
