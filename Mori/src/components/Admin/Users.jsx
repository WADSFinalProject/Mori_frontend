import React, { useState, useMemo } from 'react';
import DatePicker from "react-tailwindcss-datepicker";

const Users = () => {
  const initialNewUserState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    location: '',
    birthdate: '',
    address: '',
  };

  const [newUser, setNewUser] = useState(initialNewUserState);

  const [users, setUsers] = useState([
    { name: 'ana Taira', email: 'yanawbu@gmail.com', phone: '081292742841', role: 'XYZ Manager', location: 'Kupang', date: '15/11/24' },
    { name: 'Radja Liandra', email: 'liandra00008@gmail.com', phone: '087792742841', role: 'Harbour Guard', location: 'Kupang', date: '10/11/24' },
    { name: 'Zhafira Azzahra', email: 'zhafeypew@gmail.com', phone: '08178261022', role: 'Centra Manager', location: 'Kecamatan Semau', date: '12/10/24' },
    { name: 'Lunar Soegiyno', email: 'lunarsoe@gmail.com', phone: '08178261022', role: 'Admin', location: '-', date: '12/11/24' },
    { name: 'Vivian Catharina', email: 'kucing123@gmail.com', phone: '082816032859', role: 'Centra Worker', location: 'Kecamatan Semau', date: '12/11/24' },
    { name: 'Vivian Catharina', email: 'kucing123@gmail.com', phone: '082816032859', role: 'Centra Worker', location: 'Kecamatan Semau', date: '12/11/24' },
  ]);

  const [sortOrder, setSortOrder] = useState('newest');
  const [filterOption, setFilterOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editDate, setEditDate] = useState(null);
  const [isAddNewVisible, setAddNewVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editUserIndex, setEditUserIndex] = useState(null);

  const uniqueLocations = useMemo(() => {
    const locations = users.map(user => user.location);
    return ['All', ...new Set(locations)];
  }, [users]);

  const handleSortSelection = (order) => {
    setSortOrder(order);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().startsWith(searchQuery.toLowerCase());
    const matchesLocation = filterOption === 'All' || user.location === filterOption;
    return matchesSearch && matchesLocation;
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else if (sortOrder === 'oldest') {
      return dateA - dateB;
    } else if (sortOrder === 'AtoZ') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'ZtoA') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const Icon = () => (
    <svg width="16" height="16" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5647 16.1158C4.0847 16.1158 3.65101 16.0021 3.26365 15.7747C2.87628 15.5389 2.56891 15.2274 2.34154 14.84C2.11417 14.4526 2.00049 14.0274 2.00049 13.5642C2.00049 13.0926 2.11417 12.6632 2.34154 12.2758C2.56891 11.8884 2.87628 11.5811 3.26365 11.3537C3.65101 11.1179 4.0847 11 4.5647 11C5.02786 11 5.45312 11.1179 5.84049 11.3537C6.22786 11.5811 6.53523 11.8884 6.76259 12.2758C6.98996 12.6632 7.10365 13.0926 7.10365 13.5642C7.10365 14.0274 6.98996 14.4526 6.76259 14.84C6.53523 15.2274 6.22786 15.5389 5.84049 15.7747C5.45312 16.0021 5.02786 16.1158 4.5647 16.1158ZM14.0005 16.1158C13.5289 16.1158 13.0994 16.0021 12.7121 15.7747C12.3247 15.5389 12.0131 15.2274 11.7773 14.84C11.55 14.4526 11.4363 14.0274 11.4363 13.5642C11.4363 13.0926 11.55 12.6632 11.7773 12.2758C12.0131 11.8884 12.3247 11.5811 12.7121 11.3537C13.0994 11.1179 13.5289 11 14.0005 11C14.4721 11 14.8973 11.1179 15.2763 11.3537C15.6636 11.5811 15.971 11.8884 16.1984 12.2758C16.4342 12.6632 16.5521 13.0926 16.5521 13.5642C16.5521 14.0274 16.4342 14.4526 16.1984 14.84C15.971 15.2274 15.6636 15.5389 15.2763 15.7747C14.8973 16.0021 14.4721 16.1158 14.0005 16.1158ZM23.4363 16.1158C22.9647 16.1158 22.5352 16.0021 22.1479 15.7747C21.7605 15.5389 21.4531 15.2274 21.2258 14.84C20.9984 14.4526 20.8847 14.0274 20.8847 13.5642C20.8847 13.0926 20.9984 12.6632 21.2258 12.2758C21.4531 11.8884 21.7605 11.5811 22.1479 11.3537C22.5352 11.1179 22.9647 11 23.4363 11C23.9079 11 24.3373 11.1179 24.7247 11.3537C25.1121 11.5811 25.4194 11.8884 25.6468 12.2758C25.8826 12.6632 26.0005 13.0926 26.0005 13.5642C26.0005 14.0274 25.8826 14.4526 25.6468 14.84C25.4194 15.2274 25.1121 15.5389 24.7247 15.7747C24.3373 16.0021 23.9079 16.1158 23.4363 16.1158Z" fill="black"/>
    </svg>
  );

  const handleAddNewClick = () => {
    setAddNewVisible(true);
    setEditVisible(false);
  };

  const handleEditClick = (index) => {
    setEditUserIndex(index);
    setEditVisible(true);
    setAddNewVisible(false);
    const userToEdit = users[index];
    setNewUser({
      firstName: userToEdit.name.split(' ')[0],
      lastName: userToEdit.name.split(' ')[1],
      email: userToEdit.email,
      phone: userToEdit.phone,
      role: userToEdit.role,
      location: userToEdit.location,
      birthdate: userToEdit.birthdate || '',
      address: userToEdit.address || ''
    });
  };

  const handleBackToUserList = () => {
    setAddNewVisible(false);
    setEditVisible(false);
    setNewUser(initialNewUserState);
  };

  const updateUser = () => {
    const updatedUsers = users.map((user, index) =>
      index === editUserIndex
        ? {
            ...user,
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            location: newUser.location,
            birthdate: newUser.birthdate,
            address: newUser.address
          }
        : user
    );
    setUsers(updatedUsers);
    setEditVisible(false);
    setNewUser(initialNewUserState);
    setEditUserIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const addUser = () => {
    if (
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.phone &&
      newUser.role &&
      newUser.location &&
      editDate &&
      newUser.address
    ) {
      const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

      const newUserEntry = {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        location: newUser.location,
        date: formattedDate
      };

      setUsers((prevState) => [...prevState, newUserEntry]);
      setAddNewVisible(false);
      setNewUser(initialNewUserState);
      setEditDate(null);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      {!isAddNewVisible && !isEditVisible ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold">User Details</h2>
          </div>
          <div className="mb-6 p-4 w-48 border rounded-lg" style={{ backgroundColor: 'rgba(205, 72, 72, 0.4)' }}>
            <h3 className="text-xl">Total Centra</h3>
            <p className="text-2xl font-bold">{users.length} Users</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 border rounded-lg"
              />
              <div className="flex items-center space-x-3 ml-3">
                <div className="font-vietnam font-bold text-md text-center ml-24">
                  Sort By
                </div>
                <select
                  className="bg-transparent font-vietnam text-sm border-black focus:border-black/50 focus:ring-transparent"
                  value={sortOrder}
                  onChange={(e) => handleSortSelection(e.target.value)}
                >
                  <option value="newest">Newest to Oldest</option>
                  <option value="oldest">Oldest to Newest</option>
                  <option value="AtoZ">A to Z</option>
                  <option value="ZtoA">Z to A</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <div className="font-vietnam font-bold text-md text-center ml-7">
                  Channel Filter
                </div>
                <select
                  className="bg-transparent font-vietnam text-sm border-black focus:border-black/50 focus:ring-transparent"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="px-4 py-2 text-white bg-[#CD4848] rounded-lg"
              onClick={handleAddNewClick}
            >
              + ADD NEW
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Name</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Email</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Role</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Location</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Created Date</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">{user.name}</td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">{user.email}</td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">{user.phone}</td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      <span className={`px-2 py-1 rounded-lg ${user.role === 'Admin' ? 'bg-[#A7AD6F] text-white' : user.role === 'XYZ Manager' ? 'bg-[#A7AD6F] text-white' : user.role === 'Harbour Guard' ? 'bg-[#9AD1B3] text-black' : user.role === 'Centra Manager' ? 'bg-[#5D9EA4] text-white' : 'bg-[#CCE8EA] text-black'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center font-bold">{user.location}</td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">{user.date}</td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      <button onClick={() => handleEditClick(index)}>
                        <Icon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold">{isAddNewVisible ? 'Add User' : 'Edit User'}</h2>
          </div>
          <form className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              className="col-span-1 p-2 border rounded-lg"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              className="col-span-1 p-2 border rounded-lg"
              placeholder="Last Name"
            />
            <input
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Email"
            />
            <input
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Phone Number"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="col-span-1 p-2 border rounded-lg"
            >
              <option value="">Choose Role</option>
              <option value="Centra Manager">Centra Manager</option>
              <option value="Admin">Admin</option>
              <option value="Harbour Guard">Harbour Guard</option>
              <option value="XYZ Manager">XYZ Manager</option>
              <option value="Centra Worker">Centra Worker</option>
            </select>
            <input
              name="location"
              value={newUser.location}
              onChange={handleInputChange}
              className="col-span-1 p-2 border rounded-lg"
              placeholder="Location"
            />
            <div className="col-span-1">
              <DatePicker
                useRange={false}
                asSingle={true}
                value={{ startDate: editDate, endDate: editDate }}
                onChange={(date) => {
                  if (date) {
                    setEditDate(date.startDate);
                    setNewUser((prevState) => ({
                      ...prevState,
                      birthdate: date.startDate
                    }));
                  }
                }}
                inputClassName="w-full h-10 rounded-md focus:ring-0 bg-[#EFEFEF] dark:bg-gray-900 dark:placeholder:text-gray-100 border-gray-300 text-sm text-gray-500"
                placeholder="Select Birthdate"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <input
              name="address"
              value={newUser.address}
              onChange={handleInputChange}
              className="col-span-1 p-2 border rounded-lg"
              placeholder="Birthplace"
            />
            <textarea
              name="address"
              value={newUser.address}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Address"
            ></textarea>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-white bg-gray-500 rounded-lg mr-2"
                onClick={handleBackToUserList}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white bg-[#CD4848] rounded-lg"
                onClick={isAddNewVisible ? addUser : updateUser}
              >
                {isAddNewVisible ? 'Add User' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
