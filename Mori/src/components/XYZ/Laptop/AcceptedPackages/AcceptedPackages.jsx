import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";

const AcceptedPackages = () => {
  const data = [
    {
      id: 1,
      batchId: "#10201",
      shipmentId: "100029837238",
      driedDate: "11/11/24",
      flouredDate: "11/11/24",
      weight: "23kg",
    },
    {
      id: 2,
      batchId: "#10202",
      shipmentId: "100029837239",
      driedDate: "11/12/24",
      flouredDate: "11/12/24",
      weight: "24kg",
    },
    {
      id: 3,
      batchId: "#10203",
      shipmentId: "100029837240",
      driedDate: "11/13/24",
      flouredDate: "11/13/24",
      weight: "25kg",
    },
    {
      id: 4,
      batchId: "#10204",
      shipmentId: "100029837241",
      driedDate: "11/14/24",
      flouredDate: "11/14/24",
      weight: "26kg",
    },
    {
      id: 5,
      batchId: "#10205",
      shipmentId: "100029837242",
      driedDate: "11/15/24",
      flouredDate: "11/15/24",
      weight: "27kg",
    },
    {
      id: 6,
      batchId: "#10206",
      shipmentId: "100029837243",
      driedDate: "11/16/24",
      flouredDate: "11/16/24",
      weight: "28kg",
    },
    {
      id: 7,
      batchId: "#10207",
      shipmentId: "100029837244",
      driedDate: "11/17/24",
      flouredDate: "11/17/24",
      weight: "29kg",
    },
  ];

  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("new-old");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleSortChange({ target: { value: "new-old" } }); // Initial sort
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
        row.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.shipmentId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortValue === "new-old") {
      filteredData.sort(
        (a, b) => new Date(b.driedDate) - new Date(a.driedDate)
      );
    } else if (sortValue === "old-new") {
      filteredData.sort(
        (a, b) => new Date(a.driedDate) - new Date(b.driedDate)
      );
    } else if (sortValue === "heavy-light") {
      filteredData.sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
    } else if (sortValue === "light-heavy") {
      filteredData.sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
    }
    setSortedData(filteredData);
  };

  return (
    <div className="w-[1072px] bg-transparent">
      <div className="flex flex-col w-full gap-5 mt-8 mx-12">
        <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
          Accepted Packages
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
            {/* Sort */}
            <select
              className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
              value={sortKey}
              onChange={handleSortChange}
            >
              <option value="new-old">Newest to Oldest</option>
              <option value="old-new">Oldest to Newest</option>
              <option value="heavy-light">Heaviest to Lightest</option>
              <option value="light-heavy">Lightest to Heaviest</option>
            </select>
          </div>
        </div>

        <TableComponent
          data={sortedData}
        />
      </div>
    </div>
  );
};

export default AcceptedPackages;
