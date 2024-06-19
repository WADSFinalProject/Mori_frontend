import React, { useState, useEffect } from "react";
import { TableComponent } from "./TableComponent";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { readExpeditions, deleteExpedition } from "../../../service/expeditionService";

const AdminShipmentDetails = () => {
  const [originalData, setOriginalData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [filterKey, setFilterKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalShipments, setTotalShipments] = useState(0);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total shipments count
    const uniqueShipmentIds = new Set(originalData.map((item) => item.shipmentId));
    setTotalShipments(uniqueShipmentIds.size);
  }, [originalData]);

  useEffect(() => {
    handleSearchAndFilter(searchQuery, filterKey);
  }, [filterKey, searchQuery, originalData]);

  const fetchData = () => {
    readExpeditions()
      .then((res) => {
        const expeditions = res.data;
        const groupedExpeditions = expeditions.reduce((acc, expedition) => {
          const expeditionDetails = expedition?.expedition;
          if (!expeditionDetails || !expedition.batches) {
            return acc;
          }

          const airwayBill = expeditionDetails.AirwayBill;
          if (!acc[airwayBill]) {
            acc[airwayBill] = {
              id: airwayBill,
              expeditionID: expeditionDetails.ExpeditionID,
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
            acc[airwayBill].flouredDates.push(batch.FlouredDate);
            acc[airwayBill].driedDates.push(batch.DriedDate);
            acc[airwayBill].weights.push(batch.Weight);
          });

          return acc;
        }, {});

        const resArr = Object.values(groupedExpeditions).map((expedition, index) => ({
          id: index + 1,
          shipmentId: expedition.id,
          expeditionID: expedition.expeditionID,
          batchId: expedition.batchIds,
          driedDate: expedition.driedDates,
          flouredDate: expedition.flouredDates,
          weight: expedition.weights,
          status: expedition.status,
          checkpoint: expedition.checkpoint,
          receptionNotes: "Null",
        }));

        console.log("Resulting Array: ", resArr);

        // Set original data and sorted data state
        setOriginalData(resArr);
        setSortedData(resArr);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  const handleFilterChange = (filterValue) => {
    setFilterKey(filterValue);
    handleSearchAndFilter(searchQuery, filterValue);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchAndFilter = (searchValue, filterValue) => {
    let filteredData = originalData.filter((row) =>
      row.shipmentId.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filterValue !== "all") {
      filteredData = filteredData.filter((row) => row.status === filterValue);
    }

    setSortedData(filteredData);
  };

  // const openDeleteModal = (expeditionID) => {
  //   setShipmentToDelete(expeditionID);
  //   setIsDeleteModalOpen(true);
  // };

  const onDelete = () => {
    // setShipmentToDelete(null);
    // setIsDeleteModalOpen(false);
    fetchData();
  }

  // const closeDeleteModal = () => {
  //   setShipmentToDelete(null);
  //   setIsDeleteModalOpen(false);
  // };

  // const handleDeleteConfirm = () => {
  //   if (shipmentToDelete) {
  //     deleteExpedition(shipmentToDelete)
  //       .then((res) => {
  //         const updatedData = originalData.filter((item) => item.expeditionID !== shipmentToDelete);
  //         setOriginalData(updatedData);
  //         setSortedData(updatedData);
  //         setIsDeleteModalOpen(false);
  //       })
  //       .catch((err) => {
  //         console.error("Error deleting expedition: ", err);
  //       });
  //   }
  // };

  return (
    <div className="bg-transparent">
      <div className="flex flex-col w-full gap-5 mt-8">
        <div className="text-black font-vietnam text-3xl font-extrabold tracking-tight">
          Shipment Details
        </div>

        <div className="flex flex-col p-4 rounded bg-[#00000033] w-1/4 gap-1">
          <div className="text-[#828282] font-vietnam text-sm font-medium">
            Total Shipments
          </div>
          <div className="text-black font-vietnam text-3xl font-semibold">
            {totalShipments} Shipments
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
              Filter By:
            </div>
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
          <TableComponent data={sortedData} onDelete={onDelete} />
        </div>
      </div>
      {/* <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        shipmentId={shipmentToDelete}
      /> */}
    </div>
  );
};

export default AdminShipmentDetails;
