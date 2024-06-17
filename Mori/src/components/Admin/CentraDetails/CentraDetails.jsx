import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {
  createCentra,
  deleteCentra,
  getAllCentras,
  updateCentraDetails,
} from "../../../service/centras";

const CentraDetails = () => {
  const initialNewLocationState = {
    id: 0,
    location: "",
    // picName: "",
    // email: "",
    // phone: "",
    // dryingMachines: "",
    // flouringMachines: "",
  };

  const initialNewMachineState = {
    centraId: "",
    type: "",
    capacity: "",
    status: "",
    duration: "",
  };

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("location-a-z");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddNewVisible, setAddNewVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editLocationIndex, setEditLocationIndex] = useState(null);
  const [newLocation, setNewLocation] = useState(initialNewLocationState);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [centraToEdit, setCentraToEdit] = useState(null);
  const [machines, setMachines] = useState([]);
  const [isAddMachineVisible, setAddMachineVisible] = useState(false);
  const [newMachine, setNewMachine] = useState(initialNewMachineState);

  const handleAddNewClick = (type) => {
    if (type === "centra") {
      setAddNewVisible(true);
      setEditVisible(false);
      setAddMachineVisible(false);
      setNewLocation(initialNewLocationState);
    } else if (type === "machine") {
      setAddMachineVisible(true);
      setEditVisible(false);
      setAddNewVisible(false);
      setNewMachine(initialNewMachineState);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAddNewVisible) {
      setNewLocation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (isAddMachineVisible) {
      setNewMachine((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addLocation = () => {
    if (
      newLocation.location // &&
      // newLocation.picName &&
      // newLocation.email &&
      // newLocation.phone &&
      // newLocation.dryingMachines &&
      // newLocation.flouringMachines
    ) {
      // const newLocationEntry = { ...newLocation };

      createCentra(newLocation.location)
        .then(res => {
          console.log('Success create')

          // setData((prevState) => [...prevState, newLocationEntry]);
          setAddNewVisible(false);
          setNewLocation(initialNewLocationState);
          // handleSearchAndSort([...data, newLocationEntry], sortKey);
          fetchData();    
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      alert("Please fill in all fields");
    }
  };

  const addMachine = () => {
    if (
      newMachine.centraId &&
      newMachine.type &&
      newMachine.capacity &&
      newMachine.status &&
      newMachine.duration
    ) {
      setMachines((prevState) => [...prevState, newMachine]);
      setAddMachineVisible(false);
      setNewMachine(initialNewMachineState);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDeleteClick = (index) => {
    setLocationToDelete(sortedData[index]);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // const updatedData = data.filter((_, index) => index !== editLocationIndex);
    deleteCentra(newLocation.id)
      .then((res) => {
        console.log("Success : ", res);
        // setData(updatedData);
        setEditVisible(false);
        setNewLocation(initialNewLocationState);
        setEditLocationIndex(null);
        // handleSearchAndSort(updatedData, sortKey);
        setDeleteModalOpen(false);
        fetchData();
      })
      .catch((err) => {
        alert("Error : ", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllCentras()
      .then((res) => {
        console.log("Success : ", res);
        const resArr = res.data.map((dt) => ({
          id: dt.CentralID,
          location: dt.Address,
          // picName: "Nama orang",
          // email: "Nama@gmail.com",
          // phone: "081816032859",
          // dryingMachines: 3,
          // flouringMachines: 1,
        }));
        setData(resArr);
        handleSearchAndSort(resArr, sortKey); // Update sortedData
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }

  useEffect(() => {
    handleSearchAndSort(data, sortKey); // Call with current data and sort key
  }, [searchQuery]);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortKey(sortValue);
    handleSearchAndSort(data, sortValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearchAndSort(data, sortKey);
  };

  const handleSearchAndSort = (data, sortValue) => {
    let filteredData = data.filter(
      (row) =>
        row.location.toLowerCase().includes(searchQuery.toLowerCase()) // ||
        // row.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // row.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortValue === "location-a-z") {
      filteredData.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortValue === "location-z-a") {
      filteredData.sort((a, b) => b.location.localeCompare(a.location));
    } 
    // else if (sortValue === "picname-a-z") {
    //   filteredData.sort((a, b) => a.picName.localeCompare(b.picName));
    // } else if (sortValue === "picname-z-a") {
    //   filteredData.sort((a, b) => b.picName.localeCompare(a.picName));
    // }

    setSortedData(filteredData);
  };

  const handleEditClick = (index) => {
    const locationToEdit = sortedData[index];
    setCentraToEdit(locationToEdit);
    const originalIndex = data.findIndex(
      (item) =>
        item.id === locationToEdit.id &&
        item.location === locationToEdit.location // &&
        // item.picName === locationToEdit.picName &&
        // item.email === locationToEdit.email &&
        // item.phone === locationToEdit.phone
    );

    setEditLocationIndex(originalIndex);
    setEditVisible(true);
    setAddNewVisible(false);
    setAddMachineVisible(false);
    setNewLocation({
      id: locationToEdit.id,
      location: locationToEdit.location,
      // picName: locationToEdit.picName,
      // email: locationToEdit.email,
      // phone: locationToEdit.phone,
      // dryingMachines: locationToEdit.dryingMachines,
      // flouringMachines: locationToEdit.flouringMachines,
    });
  };

  const handleBackToList = () => {
    setAddNewVisible(false);
    setEditVisible(false);
    setAddMachineVisible(false);
    setNewLocation(initialNewLocationState);
    setNewMachine(initialNewMachineState);
  };

  return (
    <div className="bg-transparent">
      {!isAddNewVisible && !isEditVisible && !isAddMachineVisible ? (
        <div className="flex flex-col w-full gap-5">
          <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
            Centra Details
          </div>
          <div className="flex flex-col p-4 rounded bg-[#CCE8EA] w-1/4 gap-1">
            <div className="text-[#828282] font-vietnam text-sm font-medium">
              Total Centra
            </div>
            <div className="text-black font-vietnam text-3xl font-semibold">
              {sortedData.length} Centra
            </div>
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <label className="input input-bordered flex items-center gap-2 rounded-md px-5 h-10">
              <input
                type="text"
                className="grow border-none focus:border-none focus:ring-0 m-0 p-0 font-vietnam w-64"
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
            <div className="flex flex-row gap-5 items-center">
              <div className="font-vietnam font-semibold text-md items-center">
                Sort By:
              </div>
              <select
                className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
                value={sortKey}
                onChange={handleSortChange}
              >
                <option value="location-a-z">Location (A to Z)</option>
                <option value="location-z-a">Location (Z to A)</option>
                {/* <option value="picname-a-z">PIC Name (A to Z)</option>
                <option value="picname-z-a">PIC Name (Z to A)</option> */}
              </select>
            </div>
            <div className="flex flex-row gap-2">
              <button
                className="bg-[#CD4848] rounded py-2 px-6 flex gap-2 items-center justify-center hover:bg-[#CD4848]/80"
                onClick={() => handleAddNewClick("centra")}
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
                  ADD CENTRA
                </div>
              </button>
              <button
                className="bg-[#CD4848] rounded py-2 px-6 flex gap-2 items-center justify-center hover:bg-[#CD4848]/80"
                onClick={() => handleAddNewClick("machine")}
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
                  ADD MACHINE
                </div>
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <TableComponent data={sortedData} onEditClick={handleEditClick} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-7">
          {isAddNewVisible && (
            <>
              <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
                Add Centra
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-vietnam text-lg font-medium">Location</div>
                <input
                  className="w-1/2 bg-transparent text-gray-700 border border-[#00000033] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="location"
                  type="text"
                  name="location"
                  value={newLocation.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2 flex justify-between">
                {isEditVisible && (
                  <button
                    type="button"
                    className="text-white bg-[#852222] rounded py-3 px-6 items-center justify-center w-fit"
                    onClick={handleDeleteClick}
                  >
                    <div className="text-white font-vietnam text-base font-medium">
                      DELETE
                    </div>
                  </button>
                )}
                <div>
                  <button
                    type="button"
                    className="text-white bg-gray-500 rounded py-3 px-6 items-center justify-center w-fit mr-2"
                    onClick={handleBackToList}
                  >
                    <div className="text-white font-vietnam text-base font-medium">
                      CANCEL
                    </div>
                  </button>
                  <button
                    className="bg-[#CD4848] rounded py-3 px-6 items-center justify-center w-fit hover:bg-[#CD4848]/80"
                    onClick={addLocation}
                  >
                    <div className="text-white font-vietnam text-base font-medium">
                      ADD CENTRA
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
          {isAddMachineVisible && (
            <>
              <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
                Add Machine
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between gap-16">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="font-vietnam text-lg font-medium">Type</div>
                    <input
                      className="bg-transparent text-gray-700 border border-[#00000033] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="type"
                      type="text"
                      name="type"
                      value={newMachine.type}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <div className="font-vietnam text-lg font-medium">
                      Capacity
                    </div>
                    <input
                      className="bg-transparent text-gray-700 border border-[#00000033] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="capacity"
                      type="text"
                      name="capacity"
                      value={newMachine.capacity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-16">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="font-vietnam text-lg font-medium">
                      Status
                    </div>
                    <input
                      className="bg-transparent text-gray-700 border border-[#00000033] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="status"
                      type="text"
                      name="status"
                      value={newMachine.status}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <div className="font-vietnam text-lg font-medium">
                      Duration
                    </div>
                    <input
                      className="bg-transparent text-gray-700 border border-[#00000033] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="duration"
                      type="text"
                      name="duration"
                      value={newMachine.duration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              {isEditVisible && (
                <button
                  type="button"
                  className="text-white bg-[#852222] rounded py-3 px-6 items-center justify-center w-fit"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  <div className="text-white font-vietnam text-base font-medium">
                    DELETE
                  </div>
                </button>
              )}
              <div>
                <button
                  type="button"
                  className="text-white bg-gray-500 rounded py-3 px-6 items-center justify-center w-fit mr-2"
                  onClick={handleBackToList}
                >
                  <div className="text-white font-vietnam text-base font-medium">
                    CANCEL
                  </div>
                </button>
                <button
                  className="bg-[#CD4848] rounded py-3 px-6 mt-3 items-center justify-center w-fit hover:bg-[#CD4848]/80"
                  onClick={null}
                >
                  <div className="text-white font-vietnam text-base font-medium">
                    ADD MACHINE
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        locationName={locationToDelete?.location}
      />
    </div>
  );
};

export default CentraDetails;