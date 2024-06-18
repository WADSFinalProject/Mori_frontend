import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";
import { readExpeditions } from "../../../../service/shipments";

const XYZShippingInformation = () => {
  useEffect(() => {
    readExpeditions()
      .then((res) => {
        console.log("Success : ", res);
        const expeditions = res.data;

        // Group batches by expedition ID
        const groupedExpeditions = expeditions.reduce((acc, expedition) => {
          const id = expedition?.Expedition?.CentralID;

          if (!acc[id]) {
            acc[id] = {
              id: id,
              batchIds: [],
              flouredDates: [],
              driedDates: [],
              weights: [],
              status: expedition.status,
              checkpoint: `${expedition.Expedition.Status} | ${new Date(expedition.statusdate).toLocaleString()}`,
            };
          }
          acc[id].batchIds.push(expedition.BatchID);
          acc[id].flouredDates.push(expedition.FlouredDate);
          acc[id].driedDates.push(expedition.DriedDate);
          acc[id].weights.push(expedition.Weight);
          return acc;
        }, {});

        // Convert grouped data object to array
        const resArr = Object.values(groupedExpeditions).map((expedition, index) => {
          return {
            id: index + 1,
            shipmentId: expedition.id, // Assuming AirwayBill is stored in expedition.id
            batchId: expedition.batchIds,
            driedDate: expedition.driedDates,
            flouredDate: expedition.flouredDates,
            weight: expedition.weights,
            status: expedition.status,
            checkpoint: expedition.checkpoint,
          };
        });

        // Set your state with resArr
        setSortedData(resArr);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  // const data = [
  //   {
  //     id: 1,
  //     batchId: ["#10202", "#10200"],
  //     shipmentId: "100029837238",
  //     driedDate: ["11/11/24", "12/12/24"],
  //     flouredDate: ["11/11/24", "12/12/24"],
  //     weight: ["23kg", "24kg"],
  //     status: "To Deliver",
  //     checkpoint: "Preparing to Ship | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 2,
  //     batchId: ["#10202", "#10200"],
  //     shipmentId: "100029837239",
  //     driedDate: ["11/11/24", "12/12/24"],
  //     flouredDate: ["11/11/24", "12/12/24"],
  //     weight: ["23kg", "24kg"],
  //     status: "Completed",
  //     checkpoint: "Arrived at Warehouse | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 3,
  //     batchId: ["#10202", "#10200"],
  //     shipmentId: "100029837240",
  //     driedDate: ["11/11/24", "12/12/24"],
  //     flouredDate: ["11/11/24", "12/12/24"],
  //     weight: ["23kg", "24kg"],
  //     status: "Shipped",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 4,
  //     batchId: "#10204",
  //     shipmentId: "100029837241",
  //     driedDate: "11/14/24",
  //     flouredDate: "11/14/24",
  //     weight: "26kg",
  //     status: "Missing",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 5,
  //     batchId: "#10205",
  //     shipmentId: "100029837242",
  //     driedDate: "11/15/24",
  //     flouredDate: "11/15/24",
  //     weight: "27kg",
  //     status: "To Deliver",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 6,
  //     batchId: ["#10202", "#10200"],
  //     shipmentId: "100029837243",
  //     driedDate: ["11/11/24", "12/12/24"],
  //     flouredDate: ["11/11/24", "12/12/24"],
  //     weight: ["23kg", "24kg"],
  //     status: "Shipped",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 7,
  //     batchId: "#10207",
  //     shipmentId: "100029837244",
  //     driedDate: "11/17/24",
  //     flouredDate: "11/17/24",
  //     weight: "29kg",
  //     status: "Completed",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 8,
  //     batchId: ["#10202", "#10200", "#10203"],
  //     shipmentId: "100029837246",
  //     driedDate: ["11/11/24", "12/12/24", "10/10/24"],
  //     flouredDate: ["11/11/24", "12/12/24", "10/10/24"],
  //     weight: ["23kg", "24kg", "30kg"],
  //     status: "Completed",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 9,
  //     batchId: "#10207",
  //     shipmentId: "100029837245",
  //     driedDate: "11/17/24",
  //     flouredDate: "11/17/24",
  //     weight: "29kg",
  //     status: "Completed",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 10,
  //     batchId: ["#10202", "#10200", "#10203"],
  //     shipmentId: "100029837290",
  //     driedDate: ["11/11/24", "12/12/24", "10/10/24"],
  //     flouredDate: ["11/11/24", "12/12/24", "10/10/24"],
  //     weight: ["23kg", "24kg", "30kg"],
  //     status: "Completed",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  //   {
  //     id: 11,
  //     batchId: ["#10202", "#10200"],
  //     shipmentId: "100029837249",
  //     driedDate: ["11/11/24", "12/12/24"],
  //     flouredDate: ["11/11/24", "12/12/24"],
  //     weight: ["23kg", "24kg"],
  //     status: "Completed",
  //     checkpoint: "Arrived to DC | 18-03-2024 08:00 PM",
  //   },
  // ];

  const [sortedData, setSortedData] = useState([]);
  const [filterKey, setFilterKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleSearchAndFilter(searchQuery, filterKey);
  }, [filterKey, searchQuery]);

  const handleFilterChange = (filterValue) => {
    setFilterKey(filterValue);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchAndFilter = (searchValue, filterValue) => {
    let filteredData = sortedData.filter((row) =>
      row.shipmentId.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filterValue !== "all") {
      filteredData = filteredData.filter((row) => row.status === filterValue);
    }

    setSortedData(filteredData);
  };
  
  return (
    <div className="bg-transparent">
      <div className="flex flex-col w-full gap-5 ">
        <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
          Shipment Details
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
              Filter By:
            </div>
            {/* Filter */}
            <select
              className="bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent py-2.5"
              value={filterKey}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="To Deliver">To Deliver</option>
              <option value="Completed">Completed</option>
              <option value="Shipped">Shipped</option>
              <option value="Missing">Missing</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden">
          <TableComponent data={sortedData} />
        </div>
      </div>
    </div>
  );
};

export default XYZShippingInformation;
