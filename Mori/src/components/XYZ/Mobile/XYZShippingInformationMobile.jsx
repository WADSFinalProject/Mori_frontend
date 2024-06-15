import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import StatusComponent from "./StatusComponent";
import back from "../../../assets/back.png";
import { useNavigate } from "react-router-dom";

const XYZShippingInformationMobile = () => {
  const navigate = useNavigate();
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

  const headerHeight = 20;
  const footerHeight = 40;

  const { width } = useWindowSize();
  const { height } = useWindowSize();
  const isMobile = width <= 1024;

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new-old");

  const [maxScrollHeight, setMaxScrollHeight] = useState(0);

  useEffect(() => {
    const availableHeight = height - (headerHeight + footerHeight);
    setMaxScrollHeight(availableHeight);
  }, [height, headerHeight, footerHeight]);

  const filteredData = shipmentData.filter((shipment) => {
    if (filter === "all") return true;
    return shipment.status.toLowerCase() === filter.replace("-", " ");
  });

  // Sort the filtered data
  const sortedData = filteredData.sort((a, b) => {
    switch (sort) {
      case "new-old":
        return new Date(b.collected) - new Date(a.collected);
      case "old-new":
        return new Date(a.collected) - new Date(b.collected);
      case "heavy-light":
        return b.totalWeight - a.totalWeight;
      case "light-heavy":
        return a.totalWeight - b.totalWeight;
      default:
        return 0;
    }
  });
  return (
    <div>
      {isMobile ? (
        // Header
        <div className="bg-[#F0F0F0] h-screen flex flex-col justify-between overflow-hidden">
          <header
            className="w-full mt-5"
            style={{ height: `${headerHeight}px` }}
          >
            <div className="flex flex-row justify-between mx-6 items-center">
              <button onClick={() => navigate(-1)}>
                <img src={back} alt="back" className="w-5 mr-2" />
              </button>
              <div className="font-vietnam text-xl font-bold select-none">
                Shipping Information
              </div>
              <svg
                className="hover:cursor-pointer"
                onClick={null}
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.71171 16.6067C0.666667 16.6067 0 15.9634 0 15.0218C0 13.9496 0.792793 13.0919 1.64865 12.3273C2.34234 11.7027 2.46847 10.3508 2.65766 8.87776C2.9009 5.69855 3.95496 3.35843 6.18919 2.52866C6.6036 1.27935 7.66667 0.375 9 0.375C10.3333 0.375 11.3874 1.27935 11.8108 2.52866C14.045 3.35843 15.0991 5.69855 15.3423 8.87776C15.5225 10.3508 15.6577 11.7027 16.3514 12.3273C17.1982 13.0919 18 13.9496 18 15.0218C18 15.9634 17.3333 16.6067 16.2883 16.6067H1.71171ZM9 20.625C7.2973 20.625 6.05405 19.4037 5.94595 17.9586H12.0541C11.9459 19.4037 10.7027 20.625 9 20.625Z"
                  fill="black"
                />
              </svg>
            </div>
          </header>

          <hr className="mt-4 mb-[-0.5px] w-full bg-zinc-300 h-0.5 border-none" />

          <main className="w-full mb-auto mt-4">
            <div className="grid grid-cols-2 gap-3 select-none">
              <div className="font-vietnam items-center justify-center font-bold text-md text-center mb-[-3px]">
                Sort By
              </div>
              <div className="font-vietnam items-center justify-center font-bold text-md text-center mb-[-3px]">
                Channel Filter
              </div>

              {/* Sort */}
              <select
                className="ml-3 bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="new-old">Newest to Oldest</option>
                <option value="old-new">Oldest to Newest</option>
                <option value="heavy-light">Heaviest to Lightest</option>
                <option value="light-heavy">Lightest to Heaviest</option>
              </select>

              {/* Channel Filter */}
              <select
                className="mr-3 bg-transparent font-vietnam font-base text-sm border-black focus:border-black/50 focus:ring-transparent"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="to-deliver">To Deliver</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="missing">Missing</option>
              </select>
            </div>

            <div
              className="overflow-y-auto pb-[121px]"
              style={{ maxHeight: `${maxScrollHeight}px` }}
            >
              {sortedData.map((shipment) => (
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
          <footer className="font-vietnam bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-bold">@2024 MORI</p>
            <p className="font-semibold">XYZ</p>
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
};

export default XYZShippingInformationMobile;
