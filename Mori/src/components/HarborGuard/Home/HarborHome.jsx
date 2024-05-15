import React, { useState } from "react";
import { useWindowSize } from "react-use"; // Import useWindowSize hook from react-use library
import moriLogo from "../../../assets/moriWhite.png";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import bg from "../../../assets/usercardBG.png";
import { Link } from "react-router-dom";
import StatusComponent from "./StatusComponent";

const shipmentData = [
  {
    id: "98478",
    status: "Missing",
    batches: [10201, 10273, 10279, 10330, 10345],
    totalWeight: 72.3,
    collected: "15 March 2024",
    time: "07:00 PM",
  },
  {
    id: "34523",
    status: "Shipped",
    batches: [10205, 10284],
    totalWeight: 85.5,
    collected: "13 March 2024",
    time: "02:45 PM",
  },
  {
    id: "23498",
    status: "To Deliver",
    batches: [10199, 10288, 10305, 10348],
    totalWeight: 60.2,
    collected: "13 March 2024",
    time: "02:45 PM",
  },
  {
    id: "89572",
    status: "Completed",
    batches: [10211],
    totalWeight: 90.1,
    collected: "13 March 2024",
    time: "02:45 PM",
  },
  {
    id: "56839",
    status: "Missing",
    batches: [10215, 10297, 10315, 10350, 10360, 10370],
    totalWeight: 75.0,
    collected: "13 March 2024",
    time: "02:45 PM",
  },
];

const gaugeOptions = {
  cutout: "80%",
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

export default function CentraHome() {
  const { width } = useWindowSize(); // Get the window width using the useWindowSize hook

  // Check if the window width is greater than a mobile device width (e.g., 640px)
  const isMobile = width <= 1024;

  const [sortOption, setSortOption] = useState("new-old");
  const [filterOption, setFilterOption] = useState("all");

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
        // Header
        <div className="bg-[#F0F0F0]">
          <header
            className="flex flex-col p-4 shadow-md" // Changed to flex-col to stack the sections vertically
            style={{
              backgroundImage: `url(${bg})`, // Set the background image
              backgroundSize: "cover", // Cover the entire background
              backgroundRepeat: "no-repeat", // Don't repeat the background image
            }}
          >
            <div className="flex items-center justify-between mb-4">
              {/* Added mb-4 for margin bottom */}
              <div className="flex items-center">
                <Link to="/navigation">
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
                <img
                  src={bell}
                  alt="notifications"
                  className="text-6xl mr-2 font-bold text-gray-700 w-5"
                />
              </div>
            </div>
            <div className="flex flex-row gap-5 p-3">
              <div className="w-16 h-16 bg-black rounded-full">
                {/* to put an icon or image inside the circle */}
              </div>
              <div className="">
                <p className="text-lg text-white font-semibold">
                  Selamat pagi,
                </p>
                <p className="text-3xl text-white font-semibold">John Doe</p>
              </div>
            </div>
          </header>

          <main className="">
            {/* FILTERS */}
            <div className="grid grid-cols-2 gap-3 mt-7">
              <div className="font-vietnam items-center justify-center font-bold text-md text-center mb-[-3px]">
                Sort By
              </div>
              <div className="font-vietnam items-center justify-center font-bold text-md text-center mb-[-3px]">
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
                <option value="to deliver">To Deliver</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="missing">Missing</option>
              </select>
            </div>

            <div className="overflow-y-auto">
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

          {/* Footer */}
          <footer className="sticky w-full bg-gray-200 text-black flex justify-between items-center h-10 px-3 bottom-0">
            <p className="font-semibold">@2024 AMIN</p>
            <p className="font-semibold">CENTRA</p>
          </footer>
        </div>
      ) : (
        // Display "Not available for this device" text for larger devices
        <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </div>
  );
}
