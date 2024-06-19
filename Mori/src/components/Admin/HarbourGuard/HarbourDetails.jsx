import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {
  addHarborGuard,
  getAllHarborGuards,
  modifyHarborGuard,
  removeHarborGuard,
} from "../../../service/harborGuardService";

const HarbourDetails = () => {
  const initialNewHarbourState = {
    id: 0,
    harbourName: "",
    location: "",
    phone: "",
    openingHour: "00:00",
    closingHour: "00:00",
  };

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("harbourName-a-z");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [isAddNewVisible, setAddNewVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editHarbourIndex, setEditHarbourIndex] = useState(null);
  const [newHarbour, setNewHarbour] = useState(initialNewHarbourState);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [harbourToDelete, setHarbourToDelete] = useState(null);

  const handleDeleteClick = (index) => {
    setHarbourToDelete(sortedData[index]);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // const updatedData = data.filter((_, index) => index !== editHarbourIndex);
    // setData(updatedData);

    removeHarborGuard(newHarbour.id)
      .then(res => {
        setEditVisible(false);
        setNewHarbour(initialNewHarbourState);
        setEditHarbourIndex(null);
        setDeleteModalOpen(false);
        fetchData();
      })
      .catch(err => {
        console.error(err)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllHarborGuards()
      .then((res) => {
        let resArr = [];
        res.data.forEach((dt) => {
          // Format the opening and closing hours
          const openingHour = new Date(`1970-01-01T${dt.OpeningHour}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const closingHour = new Date(`1970-01-01T${dt.ClosingHour}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
          resArr.push({
            id: dt.HarbourID,
            harbourName: dt.HarbourName,
            location: dt.Location,
            phone: dt.phone,
            openingHour: openingHour,
            closingHour: closingHour,
          });
        });
  
        setData(resArr);
        handleSearchAndSort(resArr, sortKey); // Initial sort with fetched data
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };
  

  useEffect(() => {
    handleSearchAndSort(data, sortKey); // Call with current data and sort key
  }, [searchQuery, filterLocation]);

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
    setFilterLocation(e.target.value);
    handleSearchAndSort(data, sortKey);
  };

  const handleSearchAndSort = (data, sortValue) => {
    let filteredData = data.filter(
      (row) =>
        row.harbourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterLocation) {
      filteredData = filteredData.filter((row) =>
        row.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (sortValue === "harbourName-a-z") {
      filteredData.sort((a, b) => a.harbourName.localeCompare(b.harbourName));
    } else if (sortValue === "harbourName-z-a") {
      filteredData.sort((a, b) => b.harbourName.localeCompare(a.harbourName));
    }

    setSortedData(filteredData);
  };

  const handleAddNewClick = () => {
    setAddNewVisible(true);
    setEditVisible(false);
    setNewHarbour(initialNewHarbourState);
  };

  const handleEditClick = (index) => {
    const harbourToEdit = sortedData[index];
    const originalIndex = data.findIndex(
      (item) =>
        item.id === harbourToEdit.id &&
        item.harbourName === harbourToEdit.harbourName &&
        item.location === harbourToEdit.location &&
        item.phone === harbourToEdit.phone &&
        item.openingHour === harbourToEdit.openingHour &&
        item.closingHour === harbourToEdit.closingHour
    );

    setEditHarbourIndex(originalIndex);
    setEditVisible(true);
    setAddNewVisible(false);
    setNewHarbour({
      id: harbourToEdit.id,
      harbourName: harbourToEdit.harbourName,
      location: harbourToEdit.location,
      phone: harbourToEdit.phone,
      openingHour: harbourToEdit.openingHour,
      closingHour: harbourToEdit.closingHour,
    });
  };

  const handleBackToList = () => {
    setAddNewVisible(false);
    setEditVisible(false);
    setNewHarbour(initialNewHarbourState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHarbour((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addHarbour = () => {
    if (
      newHarbour.harbourName &&
      newHarbour.location &&
      newHarbour.phone &&
      newHarbour.openingHour &&
      newHarbour.closingHour
    ) {
      addHarborGuard(
        newHarbour.harbourName, 
        newHarbour.location, 
        newHarbour.phone, 
        newHarbour.openingHour, 
        newHarbour.closingHour
      )
        .then((res) => {
          setAddNewVisible(false);
          setNewHarbour(initialNewHarbourState);
          fetchData();
        })
        .catch((err) => {
          console.error("Error : ", err);
        });
    } else {
      alert("Please fill in all fields");
    }
  };

  const updateHarbour = () => {
    if (
      newHarbour.harbourName &&
      newHarbour.location &&
      newHarbour.phone &&
      newHarbour.openingHour &&
      newHarbour.closingHour
    ) {
      modifyHarborGuard(
        newHarbour.id,
        newHarbour.harbourName, 
        newHarbour.location, 
        newHarbour.phone, 
        newHarbour.openingHour, 
        newHarbour.closingHour
      ).then(res => {
        setEditVisible(false);
        setNewHarbour(initialNewHarbourState);
        setEditHarbourIndex(null);
        fetchData();
      })
      .catch(err => {
        console.error(err)
      })

    } else {
      alert("Please fill in all fields");
    }
  };

  const uniqueLocations = [...new Set(data.map((item) => item.location))];

  const formatTimeWithoutSeconds = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-transparent">
      {!isAddNewVisible && !isEditVisible ? (
        <div className="flex flex-col w-full gap-5">
          <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
            Harbour Guard
          </div>
          <div className="flex flex-col p-4 rounded bg-[#CCE8EA] w-1/3 gap-1">
            <div className="text-[#828282] font-vietnam text-sm font-medium">
              Total Harbour Guard
            </div>
            <div className="text-black font-vietnam text-3xl font-semibold">
              {sortedData.length} Harbour Guard
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
                  <option value="harbourName-a-z">Harbour Name (A to Z)</option>
                  <option value="harbourName-z-a">Harbour Name (Z to A)</option>
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="font-vietnam font-semibold text-md items-center">
                  Location:
                </div>
                <select
                  className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
                  value={filterLocation}
                  onChange={handleFilterChange}
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
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
            <TableComponent data={sortedData} onEditClick={handleEditClick} />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold">
              {isAddNewVisible ? "Add Harbour" : "Edit Harbour"}
            </h2>
          </div>
          <form className="grid grid-cols-2 gap-4">
            <input
              name="harbourName"
              value={newHarbour.harbourName}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Harbour Name"
            />
            <input
              name="location"
              value={newHarbour.location}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Location"
            />
            <input
              name="phone"
              value={newHarbour.phone}
              onChange={handleInputChange}
              className="col-span-2 p-2 border rounded-lg"
              placeholder="Phone"
            />
            <div className="col-span-1">
              <label className="block mb-1">Start time:</label>
              <div className="relative max-w-sm flex items-center">
                <div className="h-10 bg-[#EFEFEF] leading-none border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 relative flex items-center justify-left">
                  <select
                    name="openingHour"
                    className="bg-transparent text-xs appearance-none outline-none border-none text-center"
                    value={newHarbour.openingHour?.split(":")[0] || ""}
                    onChange={(e) =>
                      setNewHarbour((prevState) => ({
                        ...prevState,
                        openingHour: `${e.target.value}:${prevState.openingHour?.split(":")[1] || "00"}`,
                      }))
                    }
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <option key={hour} value={String(hour).padStart(2, "0")}>
                        {String(hour).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span className="text-s mr-3">:</span>
                  <select
                    name="openingMinutes"
                    className="bg-transparent text-xs appearance-none outline-none mr-4 border-none"
                    value={newHarbour.openingHour?.split(":")[1] || ""}
                    onChange={(e) =>
                      setNewHarbour((prevState) => ({
                        ...prevState,
                        openingHour: `${prevState.openingHour?.split(":")[0] || "00"}:${e.target.value}`,
                      }))
                    }
                  >
                    {[...Array(60).keys()].map((minute) => (
                      <option
                        key={minute}
                        value={String(minute).padStart(2, "0")}
                      >
                        {String(minute).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <label className="block mb-1">End time:</label>
              <div className="relative max-w-sm flex items-center">
                <div className="h-10 bg-[#EFEFEF] leading-none border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 relative flex items-center justify-left">
                  <select
                    name="closingHour"
                    className="bg-transparent text-xs appearance-none outline-none border-none text-center"
                    value={newHarbour.closingHour?.split(":")[0] || ""}
                    onChange={(e) =>
                      setNewHarbour((prevState) => ({
                        ...prevState,
                        closingHour: `${e.target.value}:${prevState.closingHour?.split(":")[1] || "00"}`,
                      }))
                    }
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <option key={hour} value={String(hour).padStart(2, "0")}>
                        {String(hour).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span className="text-s mr-3">:</span>
                  <select
                    name="closingMinutes"
                    className="bg-transparent text-xs appearance-none outline-none mr-4 border-none"
                    value={newHarbour.closingHour?.split(":")[1] || ""}
                    onChange={(e) =>
                      setNewHarbour((prevState) => ({
                        ...prevState,
                        closingHour: `${prevState.closingHour?.split(":")[0] || "00"}:${e.target.value}`,
                      }))
                    }
                  >
                    {[...Array(60).keys()].map((minute) => (
                      <option
                        key={minute}
                        value={String(minute).padStart(2, "0")}
                      >
                        {String(minute).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex justify-between">
              {isEditVisible && (
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-[#852222] rounded-lg"
                  onClick={handleDeleteClick}
                >
                  Delete Harbour
                </button>
              )}
              <div>
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg mr-2"
                  onClick={handleBackToList}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-[#CD4848] rounded-lg"
                  onClick={isAddNewVisible ? addHarbour : updateHarbour}
                >
                  {isAddNewVisible ? "Add Harbour" : "Save Changes"}
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
        harbourName={harbourToDelete?.harbourName}
      />
    </div>
  );
};

export default HarbourDetails;