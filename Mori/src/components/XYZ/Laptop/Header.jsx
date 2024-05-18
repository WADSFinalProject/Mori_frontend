import React, { useState } from 'react';
import ArrowDown from '../../../assets/XYZ/arrowdown.png';
import notifIcon from '../../../assets/XYZ/notif.png';
import nonotifIcon from '../../../assets/XYZ/nonotif.png';

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Dummy user data
  const user = {
    name: 'Randy',
    loginDate: new Date(),
    hasNotification: true, // Add a flag for notifications
    email: 'Randy@gmail.com',
    phone: '0818282212',
  };

  const formattedDate = user.loginDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className="flex items-center justify-between p-7 shadow-md bg-white fixed top-0 left-64 right-0 z-10">
      <div>
        <h1 className="text-2xl font-bold ml-3">Welcome back, {user.name}</h1>
        <p className="text-sm text-gray-500 ml-3">{formattedDate}</p>
      </div>
      <div className="relative flex items-center">
        <button className="relative">
          <img
            src={user.hasNotification ? notifIcon : nonotifIcon}
            alt="Notification Icon"
            className="w-6 h-6 text-gray-600 mr-4"
          />
          {user.hasNotification && (
            <span className=""></span>
          )}
        </button>
        <div className="mx-2 h-5 border-l border-gray-400"></div> {/* Divider */}
        <div className="ml-4 flex items-center">
          <span className="font-bold text-gray-600 mr-2">{user.name}</span>
          <button className="ml-2 mr-12" onClick={toggleDropdown}>
            <img src={ArrowDown} alt="Arrow Down" className="w-4" />
          </button>
        </div>
        {isDropdownVisible && (
          <div className="absolute right-0 top-12 mt-4 w-96 h-48 bg-white border border-gray-300  shadow-md z-20">
            <div className="p-4 mt-3">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-red-500"></div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-[#852222]">{user.name}</h2>
                  <p className="text-lg text-gray-600">{user.email}</p>
                  <p className="text-lg text-gray-600">{user.phone}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between w-full">
                <button className="w-1/2 px-4 py-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg">EDIT PROFILE</button>
                <button className="w-1/2 px-4 py-2 ml-2 text-sm font-semibold text-white bg-[#852222] rounded-lg">LOGOUT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
