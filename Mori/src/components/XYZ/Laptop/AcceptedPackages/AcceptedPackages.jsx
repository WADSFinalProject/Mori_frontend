import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent"
import { readExpeditions } from "../../../../service/expeditionService";

const AcceptedPackages = () => {


  useEffect(() => {
    readExpeditions()
      .then((res) => {
        console.log("Fetched Expeditions:", res.data);
        const expeditions = res.data;

        const groupedExpeditions = expeditions.reduce((acc, expedition) => {
          const expeditionDetails = expedition?.expedition;

          if (!expeditionDetails || !expedition.batches) {
            console.log("Skipping expedition due to missing details or batches:", expedition);
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
            };
          }

          expedition.batches.forEach((batch) => {
            acc[airwayBill].batchIds.push(batch.BatchID);
            acc[airwayBill].flouredDates.push(new Date(batch.FlouredDate).toLocaleDateString());
            acc[airwayBill].driedDates.push(new Date(batch.DriedDate).toLocaleDateString());
            acc[airwayBill].weights.push(batch.Weight);
          });

          return acc;
        }, {});

        console.log("Grouped Expeditions:", groupedExpeditions);

        const resArr = Object.values(groupedExpeditions)
          .filter((expedition) => expedition.status === "XYZ_Completed")
          .flatMap((expedition) => {
            return expedition.batchIds.map((batchId, index) => ({
              batchId: batchId,
              shipmentId: expedition.id,
              driedDate: expedition.driedDates[index],
              flouredDate: expedition.flouredDates[index],
              weight: expedition.weights[index],
            }));
          });

        console.log("Resulting Array:", resArr);
        setSortedData(resArr);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

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
    let filteredData = sortedData.filter(
      (row) =>
        // row.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <div className="bg-transparent">
      <div className="flex flex-col w-full gap-5">
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

        <div className="overflow-hidden">
          <TableComponent data={sortedData} />
        </div>
      </div>
    </div>
  );
};

export default AcceptedPackages;
