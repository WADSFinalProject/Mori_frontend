import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import ShippingBox from "./ShippingBox";
import StatusComponent from "./StatusComponent";
import "./Shipping.css";

const Shipping = () => {
  const { width } = useWindowSize(); // Get the window width using the useWindowSize hook
  const { height } = useWindowSize(); // Get the window height using the useWindowSize hook
  // Check if the window width is greater than a mobile device width (e.g., 640px)

  const headerHeight = 90;
  const footerHeight = 40;

  const [maxScrollHeight, setMaxScrollHeight] = useState(0);
  const [activeTab, setActiveTab] = useState("toShip");

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new-old");

  useEffect(() => {
    const availableHeight = height - (headerHeight + footerHeight);
    setMaxScrollHeight(availableHeight);
  }, [height, headerHeight, footerHeight]);

  // Dummy data for To Ship tab
  const batchToShip = [
    { id: "1", weight: "10kg", date: "11/11/25" },
    { id: "2", weight: "29kg", date: "11/11/25" },
    { id: "3", weight: "30kg", date: "11/11/25" },
    { id: "4", weight: "30kg", date: "11/11/25" },
    { id: "5", weight: "30kg", date: "11/11/25" },
  ];

  // State to track checked boxes
  const [checkedState, setCheckedState] = useState(
    new Array(batchToShip.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, position) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const selectAll = () => {
    setCheckedState(new Array(batchToShip.length).fill(true));
  };

  const deselectAll = () => {
    setCheckedState(new Array(batchToShip.length).fill(false));
  };

  const allChecked = checkedState.every(Boolean);
  const anyChecked = checkedState.some(Boolean);
  const checkedCount = checkedState.filter(Boolean).length;
  const batchText = checkedCount === 1 ? "Batch" : "Batches";

  // Dummy data for Shipped tab
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

  // Filter the data based on the selected filter
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
    <div className="max-w-[640px] h-screen relative bg-slate-50 overflow-hidden flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border leading-[normal] tracking-[normal] ml-auto mr-auto">
      <header
        className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full text-left text-base text-black font-vietnam"
        style={{ height: `${headerHeight}px` }}
      >
        {/* Dynamically showing components based on checkbox state */}
        {!anyChecked && (
          // No checkbox selected
          <nav className="m-0 self-stretch flex flex-row items-start justify-start py-0 pr-6 pl-5 box-border max-w-full">
            <nav className="m-0 flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] text-right text-xl text-[#828282] font-vietnam">
              <div className="flex flex-row items-start justify-start gap-[20px]">
                <div className="flex flex-row items-start justify-start">
                  <h3 className="m-0 w-6 relative text-inherit tracking-[-0.02em] font-semibold font-inherit inline-block min-w-[24px]">
                    <svg
                      className="w-[26px] h-[26px] text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                      />
                    </svg>
                  </h3>
                </div>
                <h3 className="m-0 relative text-inherit font-bold font-vietnam text-black text-left inline-block min-w-[89px]">
                  Shipping
                </h3>
              </div>
              <div className="flex flex-row items-start justify-start gap-[15px] text-left text-black">
                <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                  <h3 className="m-0 relative text-inherit tracking-[-0.02em] font-bold font-inherit inline-block min-w-[24px]">
                    <svg
                      className="w-[26px] h-[26px] text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                    </svg>
                  </h3>
                </div>
                <h3 className="m-0 relative text-[22px] tracking-[-0.02em] font-bold font-inherit inline-block min-w-[28px]">
                  <svg
                    className="w-[30px] h-[30px] text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      d="M5 7h14M5 12h14M5 17h14"
                    />
                  </svg>
                </h3>
              </div>
            </nav>
          </nav>
        )}
        {anyChecked && !allChecked && (
          // Some checkboxes selected
          <div className="relative grid grid-cols-3 w-full items-center justify-center text-[#828282] mb-[0.465rem]">
            <button
              className="cursor-pointer [border:none] px-7 py-0.5 bg-[transparent] w-max font-medium font-vietnam text-[#4e5995] justify-self-start"
              style={{ fontSize: "1rem" }}
              onClick={selectAll}
            >
              Select All
            </button>
            <p className="m-0 font-semibold text-center text-base">
              {checkedCount} {batchText}
            </p>
            <button
              className="cursor-pointer [border:none] px-7 py-0.5 bg-[transparent] w-max font-semibold font-vietnam text-[#4e5995] justify-self-end"
              style={{ fontSize: "1.25rem" }}
            >
              Ship
            </button>
          </div>
        )}
        {allChecked && (
          // All checkboxes selected
          <div className="relative grid grid-cols-3 w-full items-center justify-center text-[#828282] mb-[0.465rem]">
            <button
              className="cursor-pointer [border:none] px-7 py-0.5 bg-[transparent] w-max font-medium font-vietnam text-[#4e5995] justify-self-start"
              style={{ fontSize: "1rem" }}
              onClick={deselectAll}
            >
              Deselect All
            </button>
            <p className="m-0 font-semibold text-center">
              {checkedCount} {batchText}
            </p>
            <button
              className="cursor-pointer [border:none] px-7 py-0.5 bg-[transparent] w-max font-semibold font-vietnam text-[#4e5995] justify-self-end"
              style={{ fontSize: "1.25rem" }}
            >
              Ship
            </button>
          </div>
        )}

        {/* Tabs chooser */}
        <div className="relative left-[0px] w-full h-9 text-left text-base">
          <div
            onClick={() => setActiveTab("toShip")}
            className={`absolute w-1/2 box-border flex flex-row items-center justify-center py-2 px-2.5 font-vietnam font-bold select-none ${
              activeTab === "toShip"
                ? "border-b-[2px] border-solid border-black text-black"
                : "border-b-[1px] border-solid border-black/25 text-black/25 cursor-pointer hover:border-gray-400 hover:text-gray-400"
            }`}
          >
            To Ship
          </div>
          <div
            onClick={() => setActiveTab("shipped")}
            className={`absolute left-1/2 box-border w-1/2 flex flex-row items-center justify-center py-2 px-2.5 font-vietnam font-bold select-none ${
              activeTab === "shipped"
                ? "border-b-[2px] border-solid border-black text-black"
                : "border-b-[1px] border-solid border-black/25 text-black/25 cursor-pointer hover:border-gray-400 hover:text-gray-400"
            }`}
          >
            Shipped
          </div>
        </div>
      </header>

      {/* Main content for TO SHIP tab */}
      {activeTab === "toShip" && (
        <main className="self-stretch flex flex-row items-start justify-start mt-5 px-6 mb-12 box-border max-w-full text-left text-lg text-black font-vietnam overflow-y-auto">
          <div className="flex-1 flex flex-col items-start justify-start gap-[8px] max-w-full">
            {batchToShip.map((batch, index) => (
              <ShippingBox
                key={batch.id}
                batchId={batch.id}
                weight={batch.weight}
                date={batch.date}
                checked={checkedState[index]}
                onChange={() => handleCheckboxChange(index)}
              />
            ))}
          </div>
        </main>
      )}

      {/* Main content for SHIPPED tab */}
      {activeTab === "shipped" && (
        <main className="w-full flex flex-col overflow-x-hidden">
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

          <hr className="mt-4 mb-[-0.5px] w-full bg-zinc-300 h-1 border-none" />

          {/* Batches (Only show based on the filters) */}
          <div
            className="mb-[40px] overflow-y-auto"
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
      )}

      {/* Footer */}

      <footer
        className="absolute bottom-0 w-full self-stretch bg-[#efefef] box-border flex flex-row items-start justify-start py-2.5 px-6 max-w-full text-left text-[15px] text-black font-vietnam border-t-[1px] border-solid border-[#828282]"
        style={{ height: `${footerHeight}px` }}
      >
        <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px]">
          <b className="relative leading-[19.33px] inline-block min-w-[84px]">
            <span>©</span>
            <span className="text-xs"> 2024 MORI</span>
          </b>
          <div className="flex items-start justify-start text-xs">
            <span className="relative inline-block min-w-[51px] pt-0.5">
              CENTRA
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shipping;
