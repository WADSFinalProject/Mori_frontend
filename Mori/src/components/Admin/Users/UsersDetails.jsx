import React, { useState, useEffect, useMemo } from "react";
import { TableComponent } from "./TableComponent";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DatePicker from "react-tailwindcss-datepicker";
import { getAllUsers } from "../../../service/users";

const UsersDetails = () => {
  const initialNewUserState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    birthdate: "",
    address: "",
  };

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("name-a-z");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [isAddNewVisible, setAddNewVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [newUser, setNewUser] = useState(initialNewUserState);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editUserIndex, setEditUserIndex] = useState(null);
  const [editDate, setEditDate] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        handleSearchAndSort(data, "name-a-z");
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    handleSearchAndSort(data, sortKey);
  }, [searchQuery, filterRole]);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortKey(sortValue);
    handleSearchAndSort(data, sortValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearchAndSort(data, sortKey);
  };

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
    handleSearchAndSort(data, sortKey);
  };

  const handleSearchAndSort = (data, sortValue) => {
    let filteredData = data.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterRole) {
      filteredData = filteredData.filter((row) =>
        row.role.toLowerCase().includes(filterRole.toLowerCase())
      );
    }

    if (sortValue === "name-a-z") {
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name-z-a") {
      filteredData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === "createdDate-asc") {
      filteredData.sort(
        (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
      );
    } else if (sortValue === "createdDate-desc") {
      filteredData.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    }

    setSortedData(filteredData);
  };

  const uniqueRoles = useMemo(() => {
    const roles = data.map((user) => user.role);
    return [...new Set(roles)];
  }, [data]);

  const handleAddNewClick = () => {
    setAddNewVisible(true);
    setEditVisible(false);
    setNewUser(initialNewUserState);
    setEditDate(null);
  };

  const handleEditClick = (index) => {
    const userToEdit = sortedData[index];
    const originalIndex = data.findIndex(
      (item) => item.email === userToEdit.email
    );
    setEditUserIndex(originalIndex);
    setEditVisible(true);
    setAddNewVisible(false);
    setNewUser({
      firstName: userToEdit.name.split(" ")[0],
      lastName: userToEdit.name.split(" ")[1],
      email: userToEdit.email,
      phone: userToEdit.phone,
      role: userToEdit.role,
      location: userToEdit.location,
      birthdate: userToEdit.birthdate,
      address: userToEdit.address,
    });
    setEditDate(userToEdit.birthdate);
  };

  const handleDeleteClick = (index) => {
    setUserToDelete(sortedData[index]);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedData = data.filter((_, index) => index !== editUserIndex);
    setData(updatedData);
    setEditVisible(false);
    setNewUser(initialNewUserState);
    setEditUserIndex(null);
    handleSearchAndSort(updatedData, sortKey);
    setDeleteModalOpen(false);
  };

  const handleBackToUserList = () => {
    setAddNewVisible(false);
    setEditVisible(false);
    setNewUser(initialNewUserState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUser = () => {
    if (Object.values(newUser).some((field) => field === "")) {
      alert("Please fill in all fields");
      return;
    }

    const newUserEntry = {
      ...newUser,
      name: `${newUser.firstName} ${newUser.lastName}`,
      createdDate: new Date().toISOString(),
    };

    const updatedData = [...data, newUserEntry];
    setData(updatedData);
    setAddNewVisible(false);
    setNewUser(initialNewUserState);
    setEditDate(null);
    handleSearchAndSort(updatedData, sortKey);
  };

  const updateUser = () => {
    const updatedData = data.map((user, index) =>
      index === editUserIndex
        ? {
            ...user,
            ...newUser,
            name: `${newUser.firstName} ${newUser.lastName}`,
            birthdate: editDate,
          }
        : user
    );

    setData(updatedData);
    setEditVisible(false);
    setNewUser(initialNewUserState);
    setEditUserIndex(null);
    handleSearchAndSort(updatedData, sortKey);
  };

  return (
    <div className="bg-transparent">
      {!isAddNewVisible && !isEditVisible ? (
        <div className="flex flex-col w-full gap-5">
          <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
            Users
          </div>
          <div className="flex flex-col p-4 rounded-xl bg-[#CCE8EA] w-1/4 gap-1">
            <div className="text-[#828282] font-vietnam text-sm font-medium">
              Total Users
            </div>
            <div className="text-black font-vietnam text-3xl font-semibold">
              {sortedData.length} Users
            </div>
          </div>
          <div className="flex flex-row w-full justify-between items-center gap-4">
            <label className="input input-bordered flex items-center gap-2 rounded-md px-5 h-10">
              <input
                type="text"
                className="grow border-none focus:border-none focus:ring-0 m-0 p-0 font-vietnam w-48"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center">
                <div className="font-vietnam font-semibold text-md items-center">
                  Sort By:
                </div>
                <select
                  className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
                  value={sortKey}
                  onChange={handleSortChange}
                >
                  <option value="name-a-z">Name (A to Z)</option>
                  <option value="name-z-a">Name (Z to A)</option>
                  <option value="createdDate-asc">Created Date (↑)</option>
                  <option value="createdDate-desc">Created Date (↓)</option>
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="font-vietnam font-semibold text-md items-center">
                  Role:
                </div>
                <select
                  className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
                  value={filterRole}
                  onChange={handleFilterChange}
                >
                  <option value="">All Roles</option>
                  {uniqueRoles.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="bg-[#CD4848] rounded py-2 px-6 flex gap-2 items-center justify-center hover:bg-[#CD4848]/80"
              onClick={handleAddNewClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M1.14263 7.09844C0.535977 7.09844 0.0441895 6.60665 0.0441895 6C0.0441895 5.39335 0.535976 4.90156 1.14263 4.90156H10.9016C11.5082 4.90156 12 5.39335 12 6C12 6.60665 11.5082 7.09844 10.9016 7.09844H1.14263ZM6.02211 12C5.41546 12 4.92368 11.5082 4.92368 10.9016V1.09844C4.92368 0.491787 5.41546 0 6.02211 0C6.62876 0 7.12055 0.491787 7.12055 1.09844V10.9016C7.12055 11.5082 6.62876 12 6.02211 12Z"
                  fill="white"
                />
              </svg>
              <div className="text-white font-vietnam text-base font-medium">
                ADD NEW
              </div>
            </button>
          </div>

          <div className="overflow-hidden">
            <TableComponent
              data={sortedData}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold">
              {isAddNewVisible ? "Add User" : "Edit User"}
            </h2>
          </div>
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
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
              <option value="Centra">Centra </option>
              <option value="Admin">Admin</option>
              <option value="Harbour Guard">Harbour Guard</option>
              <option value="XYZ">XYZ</option>
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
                      birthdate: date.startDate,
                    }));
                  }
                }}
                inputClassName="w-full h-10 rounded-md focus:ring-0 bg-[#EFEFEF] dark:bg-gray-900 dark:placeholder:text-gray-100 border-gray-300 text-sm text-gray-500"
                placeholder="Select Birthdate"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <textarea
              name="address"
              value={newUser.address}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Address"
            ></textarea>
            <div className="col-span-2 flex justify-between">
              {isEditVisible && (
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-[#852222] rounded-lg"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete User
                </button>
              )}
              <div>
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
                  {isAddNewVisible ? "Add User" : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.name}
      />
    </div>
  );
};

export default UsersDetails;