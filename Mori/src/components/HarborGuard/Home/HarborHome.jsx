import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import moriLogo from "../../../assets/moriWhite.png";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import bg from "../../../assets/usercardBG.png";
import { Link } from "react-router-dom";
import StatusComponent from "./StatusComponent";
import { readExpeditions } from "../../../service/expeditionService";

export default function HarborHome() {
  const { width } = useWindowSize();
  const isMobile = width <= 1025;

  const [sortOption, setSortOption] = useState("new-old");
  const [filterOption, setFilterOption] = useState("all");
  const [shipmentData, setShipmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readExpeditions();
        console.log("Fetched Expeditions Data:", response.data);
        const expeditions = response.data.map((expedition) => ({
          id: expedition.expedition.AirwayBill,
          status: mapStatus(expedition.expedition.Status),
          batches: expedition.batches.map((batch) => batch.BatchID),
          totalWeight: expedition.expedition.TotalWeight,
          collected: expedition.expedition.ExpeditionDate.split("T")[0],
          time: expedition.expedition.ExpeditionDate.split("T")[1].split(
            "."
          )[0],
        }));
        console.log("Mapped Expeditions Data:", expeditions);
        setShipmentData(expeditions);
      } catch (error) {
        console.error("Error fetching shipments: ", error);
      }
    };

    fetchData();
  }, []);

  const mapStatus = (status) => {
    switch (status) {
      case "PKG_Delivering":
        return "Shipping";
      case "PKG_Delivered":
        return "Delivered";
      case "Missing":
        return "Missing";
      case "XYZ_PickingUp":
        return "Scheduled";
      case "XYZ_Completed":
        return "Completed";
      default:
        return status;
    }
  };

  const sortData = (data, sortOption) => {
    switch (sortOption) {
      case "new-old":
        return data.sort(
          (a, b) => new Date(b.collected) - new Date(a.collected)
        );
      case "old-new":
        return data.sort(
          (a, b) => new Date(a.collected) - new Date(b.collected)
        );
      case "heavy-light":
        return data.sort((a, b) => b.totalWeight - a.totalWeight);
      case "light-heavy":
        return data.sort((a, b) => a.totalWeight - b.totalWeight);
      default:
        return data;
    }
  };

  const filterData = (data, filterOption) => {
    if (filterOption === "all") return data;
    return data.filter(
      (shipment) => shipment.status.toLowerCase() === filterOption.toLowerCase()
    );
  };

  const sortedAndFilteredData = sortData(
    filterData([...shipmentData], filterOption),
    sortOption
  );

  return (
    <div>
      {isMobile ? (
        <div className="bg-[#F0F0F0]">
          <header
            className="flex flex-col p-4 shadow-md"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link to="/harbor/navigation">
                  <img
                    src={hamburg}
                    alt="divisions"
                    className="text-6xl font-bold text-gray-700 w-5"
                  />
                </Link>
              </div>
              <img
                src={moriLogo}
                alt="mori logo"
                className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-20"
              />
              <div className="flex">
                <Link to="/harbor/notification">
                  <img
                    src={bell}
                    alt="notifications"
                    className="text-6xl mr-2 font-bold text-gray-700 w-5"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-5 p-3">
              <div className="w-16 h-16 bg-black rounded-full">
                {/* to put an icon or image inside the circle */}
              </div>
              <div>
                <p className="text-lg text-white font-semibold">
                  Selamat pagi,
                </p>
                <p className="text-3xl text-white font-semibold">John Doe</p>
              </div>
            </div>
          </header>

          <main className="bg-[#F0F0F0]">
            {/* FILTERS */}
            <div className="grid grid-cols-2 gap-3 mt-7">
              <div className="font-vietnam items-center justify-center font-bold text-md text-center">
                Sort By
              </div>
              <div className="font-vietnam items-center justify-center font-bold text-md text-center">
                Channel Filter
              </div>

              {/* Sort */}
              <select
                className="ml-3 bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="new-old">Newest to Oldest</option>
                <option value="old-new">Oldest to Newest</option>
                <option value="heavy-light">Heaviest to Lightest</option>
                <option value="light-heavy">Lightest to Heaviest</option>
              </select>

              {/* Channel Filter */}
              <select
                className="mr-3 bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="all">All</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
                <option value="missing">Missing</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="overflow-y-auto mb-10">
              {sortedAndFilteredData.map((shipment) => (
                <StatusComponent
                  key={shipment.id}
                  id={shipment.id}
                  status={shipment.status}
                  batches={shipment.batches}
                  totalWeight={shipment.totalWeight}
                  collected={shipment.collected}
                  time={shipment.time}
                />
              ))}
            </div>
          </main>

          <footer className="font-vietnam bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-bold">@2024 MORI</p>
            <p className="font-semibold">HARBOR GUARD</p>
          </footer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </div>
  );
}
