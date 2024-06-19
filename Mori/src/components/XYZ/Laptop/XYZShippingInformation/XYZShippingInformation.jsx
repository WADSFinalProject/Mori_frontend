import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";
import { readExpeditions } from "../../../../service/expeditionService";
import { getPackageReceiptDetails } from "../../../../service/packageReceiptService";
import { readPickups } from "../../../../service/pickup";

const XYZShippingInformation = () => {
  const [sortedData, setSortedData] = useState([]);
  const [filterKey, setFilterKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Data to display

  useEffect(() => {
    fetchExpeditions();
  }, []);

  useEffect(() => {
    handleSearchAndFilter(searchQuery, filterKey);
  }, [filterKey, searchQuery]);

  const fetchExpeditions = async () => {
    try {
      const res = await readExpeditions();
      console.log("Fetched Expeditions: ", res.data);
      const expeditions = res.data;

      const groupedExpeditions = expeditions.reduce((acc, expedition) => {
        const expeditionDetails = expedition?.expedition;

        if (!expeditionDetails || !expedition.batches) {
          console.log("Skipping expedition due to missing details or batches: ", expedition);
          return acc; // Skip if essential data is missing
        }

        const airwayBill = expeditionDetails.AirwayBill;

        if (!acc[airwayBill]) {
          acc[airwayBill] = {
            id: airwayBill,
            batchIds: [],
            flouredDates: [],
            driedDates: [],
            weights: [],
            status: expeditionDetails.Status || "Unknown",
            checkpoint: `${expedition.checkpoint_status || "Unknown"} | ${
              expedition.checkpoint_statusdate ? new Date(expedition.checkpoint_statusdate).toLocaleString() : "Unknown"
            }`,
            receptionNotes: "Null", // Initialize with "Null"
          };
        }

        expedition.batches.forEach((batch) => {
          acc[airwayBill].batchIds.push(batch.BatchID);
          acc[airwayBill].flouredDates.push(batch.FlouredDate);
          acc[airwayBill].driedDates.push(batch.DriedDate);
          acc[airwayBill].weights.push(batch.Weight);
        });

        return acc;
      }, {});

      console.log("Grouped Expeditions: ", groupedExpeditions);

      const resArr = Object.values(groupedExpeditions).map((expedition, index) => ({
        id: index + 1,
        shipmentId: expedition.id,
        batchId: expedition.batchIds,
        driedDate: expedition.driedDates,
        flouredDate: expedition.flouredDates,
        weight: expedition.weights,
        status: expedition.status,
        checkpoint: expedition.checkpoint,
        receptionNotes: expedition.receptionNotes,
      }));

      console.log("Resulting Array: ", resArr);

      await fetchAndSetReceptionNotes(resArr);

    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const fetchAndSetReceptionNotes = async (expeditions) => {
    try {
      const pickups = await readPickups();
      console.log("Fetched Pickups: ", pickups.data);

      const updatedExpeditions = await Promise.all(expeditions.map(async (expedition) => {
        const pickup = pickups.data.find(p => p.expeditionID === expedition.shipmentId);

        if (pickup) {
          const receiptDetails = await getPackageReceiptDetails(pickup.id);
          expedition.receptionNotes = receiptDetails.notes || "No notes available";
        }

        return expedition;
      }));

      console.log("Updated Expeditions with Reception Notes: ", updatedExpeditions);

      setSortedData(updatedExpeditions);
    } catch (err) {
      console.error("Error fetching reception notes: ", err);
    }
  };

  const handleFilterChange = (selectedValue) => {
    setFilterKey(selectedValue);
    handleSearchAndFilter(searchQuery, selectedValue);
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

    setFilteredData(filteredData);
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
              <option value="PKG_Delivered">PKG_Delivered</option>
              <option value="PKG_Delivering">PKG_Delivering</option>
              <option value="XYZ_PickingUp">XYZ_PickingUp</option>
              <option value="XYZ_Completed">XYZ_Completed</option>
              <option value="Missing">Missing</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden">
          <TableComponent data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default XYZShippingInformation;
