import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";

const CentraDetails = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("location-a-z");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("../../../public/data_centra.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setSortedData(data);
        handleSortChange({ target: { value: "location-a-z" } }); // Initial sort
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchQuery]);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortKey(sortValue);
    handleSearchAndSort(sortValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchAndSort = (sortValue = sortKey) => {
    let filteredData = data.filter(
      (row) =>
        row.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortValue === "location-a-z") {
      filteredData.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortValue === "location-z-a") {
      filteredData.sort((a, b) => b.location.localeCompare(a.location));
    } else if (sortValue === "picname-a-z") {
      filteredData.sort((a, b) => a.picName.localeCompare(b.picName));
    } else if (sortValue === "picname-z-a") {
      filteredData.sort((a, b) => b.picName.localeCompare(a.picName));
    }

    setSortedData(filteredData);
  };

  return (
    <div className="bg-transparent">
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
              className="grow border-none focus:border-none focus:ring-0 m-0 p-0 font-vietnam w-96"
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
              <option value="picname-a-z">PIC Name (A to Z)</option>
              <option value="picname-z-a">PIC Name (Z to A)</option>
            </select>
          </div>
          <button className="bg-[#CD4848] rounded py-2 px-6 flex gap-2 items-center justify-center hover:bg-[#CD4848]/80">
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
          <TableComponent data={sortedData} />
        </div>
      </div>
    </div>
  );
};

export default CentraDetails;
