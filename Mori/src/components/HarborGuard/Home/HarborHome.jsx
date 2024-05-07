import React from "react";
import { useWindowSize } from "react-use"; // Import useWindowSize hook from react-use library
import moriLogo from "../../../assets/moriWhite.png";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import bg from "../../../assets/usercardBG.png";
import collector from "../../../assets/collectorLogo.png";
import processor from "../../../assets/processorLogo.png";
import shipping from "../../../assets/shippingLogo.png";
import { Doughnut } from "react-chartjs-2";
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
            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* Sort */}
              <div
                className="flex items-center justify-between box-border border-[2px] border-solid border-black text-black text-xs py-1 px-3 ml-3 font-vietnam"
                style={{ height: "clamp(50px, 9vw, 65px)" }}
              >
                <div
                  className="flex-1 text-center"
                  style={{ fontSize: "clamp(12px, 2vw, 15px)" }}
                >
                  <p className="font-semibold">Sort By</p>
                  <p className="mt-1">Newest to Oldest</p>
                </div>
                <svg
                  style={{ filter: "brightness(0) saturate(100%)" }}
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 8.02344C6.80208 8.02344 6.625 7.94792 6.46875 7.79688L0.421875 1.60938C0.354167 1.54167 0.302083 1.46615 0.265625 1.38281C0.229167 1.29427 0.210938 1.20052 0.210938 1.10156C0.210938 0.966146 0.242188 0.84375 0.304688 0.734375C0.367188 0.625 0.450521 0.539062 0.554688 0.476562C0.664062 0.414062 0.786458 0.382812 0.921875 0.382812C1.11979 0.382812 1.28906 0.450521 1.42969 0.585938L7.41406 6.70312H6.57812L12.5625 0.585938C12.7083 0.450521 12.8776 0.382812 13.0703 0.382812C13.2057 0.382812 13.3255 0.414062 13.4297 0.476562C13.5391 0.539062 13.625 0.625 13.6875 0.734375C13.75 0.84375 13.7812 0.966146 13.7812 1.10156C13.7812 1.29427 13.7109 1.46094 13.5703 1.60156L7.52344 7.79688C7.45573 7.86979 7.375 7.92708 7.28125 7.96875C7.19271 8.00521 7.09896 8.02344 7 8.02344Z"
                    fill="#6D7DD2"
                  />
                </svg>
              </div>

              {/* Channel Filter */}
              <div
                className="flex items-center justify-between box-border border-[2px] border-solid border-black text-black text-xs py-1 px-3 mr-3 font-vietnam"
                style={{ height: "clamp(50px, 9vw, 65px)" }}
              >
                <div
                  className="flex-1 text-center"
                  style={{ fontSize: "clamp(12px, 2vw, 15px)" }}
                >
                  <p className="font-semibold">Channel Filter</p>
                  <p className="mt-1">All</p>
                </div>
                <svg
                  style={{ filter: "brightness(0) saturate(100%)" }}
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 8.02344C6.80208 8.02344 6.625 7.94792 6.46875 7.79688L0.421875 1.60938C0.354167 1.54167 0.302083 1.46615 0.265625 1.38281C0.229167 1.29427 0.210938 1.20052 0.210938 1.10156C0.210938 0.966146 0.242188 0.84375 0.304688 0.734375C0.367188 0.625 0.450521 0.539062 0.554688 0.476562C0.664062 0.414062 0.786458 0.382812 0.921875 0.382812C1.11979 0.382812 1.28906 0.450521 1.42969 0.585938L7.41406 6.70312H6.57812L12.5625 0.585938C12.7083 0.450521 12.8776 0.382812 13.0703 0.382812C13.2057 0.382812 13.3255 0.414062 13.4297 0.476562C13.5391 0.539062 13.625 0.625 13.6875 0.734375C13.75 0.84375 13.7812 0.966146 13.7812 1.10156C13.7812 1.29427 13.7109 1.46094 13.5703 1.60156L7.52344 7.79688C7.45573 7.86979 7.375 7.92708 7.28125 7.96875C7.19271 8.00521 7.09896 8.02344 7 8.02344Z"
                    fill="#6D7DD2"
                  />
                </svg>
              </div>
            </div>

            <div className="overflow-y-auto">
              {shipmentData.map((shipment) => (
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
