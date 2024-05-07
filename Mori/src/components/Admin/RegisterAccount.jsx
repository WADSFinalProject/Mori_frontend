import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterAccount() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    if (selectedRole === 'Centra') {
      setShowLocationDropdown(true);
    } else {
      setShowLocationDropdown(false);
      setLocation('');
    }
  };

  return (
    <div className="w-96">
      <div className="bg-white w-80 sm:w-80 md:w-80 lg:w-90 xl:w-90 p-10 rounded-3xl sh gap-40 mx-auto">
        <h1 className="text-3xl pb-2.5 font-bold font-vietnam">Register Account</h1>

        <form className="mt-0.1">
          {/* Email Field */}
          <div className="flex flex-col items-start w-full">
            <label htmlFor="email" className="text-black text-base font-medium font-vietnam">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full py-px pt-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
            />
          </div>

          {/* First Name Field */}
          <div className="flex flex-col items-start w-full mt-4">
            <label htmlFor="firstName" className="text-black text-base font-medium font-vietnam">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              className="w-full py-px pt-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
            />
          </div>

          {/* Last Name Field */}
          <div className="flex flex-col items-start w-full mt-4">
            <label htmlFor="lastName" className="text-black text-base font-medium font-vietnam">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
              className="w-full py-px pt-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
            />
          </div>

          {/* Role Field */}
          <div className="flex flex-col items-start w-full mt-4">
            <label htmlFor="role" className="text-black text-base font-medium font-vietnam">Role</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full py-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
            >
              <option value="">Select Role</option>
              <option value="Centra">Centra</option>
              <option value="harbour guard">Harbour Guard</option>
              <option value="XYZ phone">XYZ Phone</option>
              <option value="XYZ desktop">XYZ Desktop</option>
            </select>
          </div>

          {/* Location Field */}
          {showLocationDropdown && (
            <div className="flex flex-col items-start w-full mt-4">
              <label htmlFor="location" className="text-black text-base font-medium font-vietnam">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-1 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-gray placeholder:text-gray focus:outline-none text-gray placeholder:text-xs"
              >
                <option value="">Select Location</option>
                <option value="location 1">Location 1</option>
                <option value="location 2">Location 2</option>
                <option value="location 3">Location 3</option>
              </select>
            </div>
          )}

          {/* Register button */}
          <button 
            type="button"
            className="bg-zinc-500 hover:bg-zinc-700  text-white text-sm font-light font-vietnam py-2.5 px-7 rounded-xl mt-5 w-full"
          >
            REGISTER
          </button>
        </form>

      </div>
    </div>
  );
}
