import React from "react";
import { useWindowSize } from "react-use";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllWarehouses, getWarehouseDetails } from "../../../service/warehousesService";

import moriLogo from "../../../assets/moriWhite.png";
import bell from "../../../assets/bell.png";
import hamburg from "../../../assets/hamburg.png";
import bg from "../../../assets/usercardBG2.png";
import collector from "../../../assets/collectorLogo.png";
import processor from "../../../assets/processorLogo.png";
import shipping from "../../../assets/shippingLogo.png";
import truck from "../../../assets/shippingTruck.png";
import StatusComponent from "./StatusComponent";
import rightArrow from "../../../assets/rightArrow.png";
import arrowDown from "../../../assets/arrowDown.png";
import { getCurrentUser } from "../../../service/users";

const shipmentData = [
  {
    id: "98478",
    status: "Missing",
    batches: [10201, 10273, 10279, 10330, 10345],
    totalWeight: 72.3,
    collected: "15 March 2024",
    time: "07:00 PM",
  },
];

const gaugeOptions = {
  responsive: true,
  cutout: "80%",
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  maintainAspectRatio: false,
  events: [],
};

export default function XYZHome() {
  const { width } = useWindowSize();
  const isMobile = width <= 640;
  const [username, setUsername]= useState("");

  const [warehouseId, setWarehouseId] = useState([]); // Default warehouseId to null
  const [machines, setMachines] = useState([]);
  const [warehouses, setWarehouses] = useState([]); // State to store all warehouse details

  useEffect(() => {
    fetchAllWarehouses(); // Fetch all warehouse details on component mount
    fetchUser();
  }, []);

  useEffect(() => {
    if (warehouseId !== null) {
      fetchWarehouseDetails(warehouseId);
    }
  }, [warehouseId]); // Fetch data when warehouseId changes

  const fetchAllWarehouses = async () => {
    try {
      const response = await getAllWarehouses();
      const data = response.data;
      setWarehouses(data);
      console.log("All warehouse details:", data); // Log all warehouse details
    } catch (error) {
      console.error("Error fetching all warehouses: ", error);
    }
  };

  const fetchWarehouseDetails = async (warehouse_id) => {
    try {
      const response = await getWarehouseDetails(warehouse_id);
      const data = response.data;
      console.log('Raw data from backend:', data);

      // Check if data is an array
      if (Array.isArray(data)) {
        // Transform the data if needed
        const transformedData = data.map(item => ({
          location: item.location,
          currentLoad: item.TotalStock,
          capacity: item.Capacity, // Assuming capacity is provided by the backend
          lastUpdated: item.lastUpdated || null, // Customize as needed
        }));
        console.log('Transformed data:', transformedData);

        setMachines(transformedData); // Update machines with transformed data
        console.log('Machines state:', machines); // Log machines state to debug
      } else {
        console.error('Data is not an array:', data);
        // Handle case where data is not an array if needed
      }
    } catch (error) {
      console.error('Error fetching warehouse details:', error);
      // Handle error state if needed
    }
  };

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("User data:", user);
      setUsername(user.data.FirstName); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const renderMachine = () => {
    if (machines.length === 0) return null;
    const machine = machines[0];
    return (
      <MachineCard
        key={machine.location}
        machine={machine}
        extraMarginClass="mb-10"
      />
    );
  };

  const MachineCard = ({ machine, extraMarginClass }) => {
    const chartColor =
      machine.currentLoad === machine.capacity
        ? "#0F3F43"
        : machine.currentLoad > machine.capacity / 2
          ? "#A7AD6F"
          : "#99D0D580";
    const linkTo = `/dryingmachine/${machine.location}`;

    const [region, location] = machine.location.split(" ");

    return (
      <div
        className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machine.status}`}
        style={{
          width: "auto",
          flexGrow: 1,
          minHeight: "100px",
          maxWidth: "none",
          position: "relative",
        }}
      >
        {/* Machine Location Button */}
        <div
          className="machine-location w-auto h-[26px] px-2.5 py-1 bg-black rounded justify-start items-center gap-2 inline-flex text-white text-sm font-medium font-['Be Vietnam Pro']"
          style={{ position: "absolute", left: "15px", top: "9px" }}
        >
          <span className="text-sm">{region} </span>
          <span className="font-bold text-sm">{location}</span>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 5C6 5.13464 5.9724 5.26019 5.9172 5.37664C5.86569 5.48945 5.78289 5.60044 5.66881 5.70961L1.50138 9.74891C1.33211 9.9163 1.12603 10 0.883165 10C0.724931 10 0.577737 9.95997 0.441582 9.87991C0.305428 9.80349 0.196872 9.69978 0.115915 9.56878C0.0386385 9.43777 0 9.29221 0 9.1321C0 8.89192 0.0938362 8.67722 0.281509 8.48799L3.91904 4.99454L0.281509 1.50655C0.0938362 1.3246 0 1.11172 0 0.867904C0 0.707787 0.0386385 0.562227 0.115915 0.431223C0.196872 0.300218 0.305428 0.196507 0.441582 0.120087C0.577737 0.0400291 0.724931 0 0.883165 0C1.12603 0 1.33211 0.0818777 1.50138 0.245633L5.66881 4.28493C5.78289 4.3941 5.86569 4.50691 5.9172 4.62336C5.96872 4.73617 5.99632 4.86172 6 5Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Machine Info */}
        <div
          className="machine-info flex justify-center items-center w-full mb-2"
          style={{ marginTop: "18px" }}
        >
          <div
            className="chart-container"
            style={{ width: "150px", height: "120px", position: "relative" }}
          >
            <Doughnut
              data={{
                labels: ["Current Load", "Capacity"],
                datasets: [
                  {
                    data: [
                      machine.currentLoad,
                      machine.capacity - machine.currentLoad,
                    ],
                    backgroundColor: [chartColor, "#EFEFEF"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={gaugeOptions}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ fontSize: "0" }}
            >
              <span
                className="font-vietnam font-bold"
                style={{ fontSize: "24px", lineHeight: "1.2" }}
              >
                {machine.currentLoad} kg
              </span>
              <span
                className="font-vietnam font-bold"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.2",
                  marginBottom: "-30px",
                }}
              >{`/ ${machine.capacity} kg`}</span>
            </div>
          </div>
        </div>
        <div
          className="last-updated"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "10px",
            color: "#666666",
          }}
        >
          {/* <div>Last updated:</div> */}
          <div style={{ fontWeight: "bold" }}>{machine.lastUpdated}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <style>
        {`
          .bg-custom-c16548 { background-color: #C16548; }
          .bg-custom-86b788 { background-color: #86B788; }
          .bg-custom-f4df67 { background-color: #F4DF67; }
        `}
      </style>

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
                <Link to="/xyz/m/navigation">
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
                <Link to="/xyz/m/notification">
                  <img
                    src={bell}
                    alt="notifications"
                    className="text-6xl mr-2 font-bold text-gray-700 w-5"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-5 p-3">
              <div className="w-16 h-16 bg-black rounded-full"></div>
              <div className="">
                <p className="text-lg text-white font-semibold">
                  Selamat pagi,
                </p>
                <p className="text-3xl text-white font-semibold">{username}</p>
              </div>
            </div>
            {/* <div className="mt-auto flex items-center justify-between px-10">
              <div>
                <span className="text-white text-sm font-medium font-['Be Vietnam Pro']">
                  Warehouse{" "}
                </span>
                <span className="text-white text-sm font-bold font-['Be Vietnam Pro']">
                  Kupang
                </span>
                <span className="text-white text-sm font-medium font-['Be Vietnam Pro']">
                  {" "}
                  Kecamatan{" "}
                </span>
                <span className="text-white text-sm font-bold font-['Be Vietnam Pro']">
                  Semau
                </span>
              </div>
              <img src={arrowDown} alt="right arrow" />
            </div> */}
          </header>
          {/* Current Stock Management */}
          <div className="p-5">
            <div className="mt-[-10px]">
              <h2 className="text-black text-xl font-bold font-['Be Vietnam Pro']">
                Current Stock Management
              </h2>
            </div>
            <div className="machine-status my-4">{renderMachine()}</div>

            {/* View all locations */}
            <div className="mt-[-20px]">
            <Link to="/xyz/m/stockmanagement">
              <div className="mb-[10px] w-full h-[38px] px-4 py-2.5 bg-white rounded justify-center items-center gap-2 inline-flex cursor-pointer">
                <div className="text-black text-sm font-medium font-['Be Vietnam Pro']">
                  View All
                </div>
                <img
                  src={rightArrow}
                  alt="right arrow"
                  className="w-[6.69px] h-[11.87px] relative"
                />
              </div>
            </Link>
          </div>
          </div>
          {/* Quick Access */}
          <div className="p-5">
            <div className="mt-[-30px]">
              <h2 className="text-black text-xl font-bold font-['Be Vietnam Pro']">
                Quick Access
              </h2>
            </div>
            <div className="flex flex-row text-white justify-between w-full gap-3">
              <Link
                to="/xyz/m/stockmanagement"
                className="py-3 px-4 flex flex-row bg-[#5C612C] rounded-lg items-center w-1/2 justify-between"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="font-vietnam font-bold text-base">
                    Stock
                    <br />
                    Management
                  </div>
                  <div className="text-[8px] font-normal font-vietnam">
                    2 Warehouse almost FULL
                  </div>
                </div>
                <div className="self-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                  >
                    <path
                      d="M10.3051 20V10.5699L18.9265 5.64338C18.9755 5.82721 19 6.06005 19 6.34191V13.5018C19 14.1697 18.8866 14.663 18.6599 14.9816C18.4393 15.2941 18.1146 15.5729 17.6857 15.818L10.489 19.9173C10.4583 19.9357 10.4277 19.951 10.3971 19.9632C10.3664 19.9816 10.3358 19.9939 10.3051 20ZM9.04596 20C9.01532 19.9939 8.98468 19.9816 8.95405 19.9632C8.92953 19.951 8.90196 19.9357 8.87132 19.9173L1.66544 15.818C1.24265 15.5729 0.917894 15.2941 0.691178 14.9816C0.464463 14.663 0.351105 14.1697 0.351105 13.5018V6.34191C0.351105 6.06005 0.375615 5.82721 0.424634 5.64338L9.04596 10.5699V20ZM9.68015 9.46691L1.01287 4.54963C1.14767 4.42708 1.31924 4.3076 1.52758 4.19118L4.90074 2.27022L13.6048 7.24265L9.68015 9.46691ZM14.8824 6.51654L6.14155 1.55331L8.00735 0.496324C8.57721 0.165441 9.1348 0 9.68015 0C10.2194 0 10.7739 0.165441 11.3438 0.496324L17.8327 4.19118C18.0349 4.3076 18.2034 4.42708 18.3382 4.54963L14.8824 6.51654Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                to="/xyz/m/shippinginformation"
                className="py-3 px-4 flex flex-row bg-black/60 rounded-lg items-center w-1/2 justify-between"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="font-vietnam font-bold text-base">
                    Shipping
                    <br />
                    Information
                  </div>
                  <div className="text-[8px] font-normal font-vietnam">
                    4 Shipment Arriving
                  </div>
                </div>
                <div className="self-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="20"
                    viewBox="0 0 28 20"
                    fill="none"
                  >
                    <path
                      d="M3.07915 15.567V9.39666C3.42147 9.545 3.77805 9.66196 4.1489 9.74754C4.52545 9.82741 4.91056 9.86735 5.30423 9.86735C6.05733 9.86735 6.76479 9.72187 7.42661 9.43089C8.09413 9.13992 8.68178 8.74055 9.18955 8.23278C9.70303 7.725 10.1024 7.14021 10.3877 6.47839C10.6786 5.81087 10.8241 5.10056 10.8241 4.34745C10.8241 3.93097 10.7785 3.52589 10.6872 3.13222C10.5959 2.73855 10.4647 2.36486 10.2935 2.01113H16.7976C17.5621 2.01113 18.1412 2.21081 18.5349 2.61018C18.9285 3.00385 19.1254 3.58009 19.1254 4.3389V15.276C18.8515 15.567 18.6433 15.9064 18.5006 16.2944C18.358 16.6767 18.2867 17.0874 18.2867 17.5267C18.2867 17.6466 18.2952 17.7664 18.3124 17.8862H12.8609C12.878 17.7721 12.8866 17.6551 12.8866 17.5353C12.8866 17.0561 12.7953 16.6082 12.6127 16.1917C12.4359 15.7695 12.1877 15.4015 11.8682 15.0877C11.5544 14.7682 11.1864 14.52 10.7642 14.3432C10.3477 14.1606 9.90272 14.0693 9.42918 14.0693C8.94993 14.0693 8.49921 14.1606 8.07701 14.3432C7.66053 14.52 7.29253 14.7682 6.97303 15.0877C6.65924 15.4015 6.41106 15.7695 6.22849 16.1917C6.05163 16.6082 5.96319 17.0561 5.96319 17.5353C5.96319 17.6551 5.97175 17.7721 5.98887 17.8862H5.40692C4.89915 17.8862 4.47125 17.7977 4.12323 17.6209C3.78091 17.4497 3.52132 17.193 3.34445 16.8507C3.16759 16.5026 3.07915 16.0747 3.07915 15.567ZM20.2978 6.73513H22.5742C22.9964 6.73513 23.3559 6.79218 23.6525 6.90629C23.9492 7.0204 24.2259 7.21723 24.4827 7.49679L27.3924 10.7831C27.632 11.0512 27.7917 11.3079 27.8716 11.5533C27.9572 11.7929 28 12.1238 28 12.546V15.567C28 16.3201 27.806 16.8935 27.4181 17.2871C27.0301 17.6865 26.4596 17.8862 25.7065 17.8862H25.1844C25.2015 17.7664 25.2101 17.6466 25.2101 17.5267C25.2101 17.0475 25.116 16.5996 24.9277 16.1831C24.7451 15.7609 24.4912 15.393 24.166 15.0792C23.8465 14.7597 23.4757 14.5115 23.0535 14.3346C22.637 14.152 22.1891 14.0608 21.7099 14.0608C21.4531 14.0608 21.205 14.095 20.9653 14.1635C20.7257 14.2262 20.5032 14.3146 20.2978 14.4288V6.73513ZM22.5143 12.1951H26.3483C26.3312 12.0981 26.2998 12.0068 26.2542 11.9213C26.2085 11.8357 26.1515 11.7558 26.083 11.6816L23.4728 8.75481C23.3074 8.56654 23.1505 8.44673 23.0021 8.39538C22.8538 8.34403 22.6826 8.31836 22.4887 8.31836H21.7356V11.4163C21.7356 11.656 21.804 11.8471 21.9409 11.9897C22.0836 12.1267 22.2747 12.1951 22.5143 12.1951ZM9.42918 20C8.97275 20 8.55626 19.8887 8.17971 19.6662C7.80886 19.4437 7.51219 19.1442 7.28968 18.7677C7.07288 18.3968 6.96448 17.986 6.96448 17.5353C6.96448 17.0789 7.07288 16.6652 7.28968 16.2944C7.51219 15.9178 7.80886 15.6212 8.17971 15.4044C8.55626 15.1819 8.97275 15.0706 9.42918 15.0706C9.8799 15.0706 10.2907 15.1819 10.6615 15.4044C11.0381 15.6212 11.3376 15.9178 11.5601 16.2944C11.7826 16.6652 11.8939 17.0789 11.8939 17.5353C11.8939 17.986 11.7826 18.3968 11.5601 18.7677C11.3376 19.1442 11.0409 19.4437 10.6701 19.6662C10.2992 19.8887 9.8856 20 9.42918 20ZM21.7441 20C21.2934 20 20.8798 19.8887 20.5032 19.6662C20.1324 19.4437 19.8357 19.1442 19.6132 18.7677C19.3907 18.3911 19.2794 17.9775 19.2794 17.5267C19.2794 17.0703 19.3907 16.6567 19.6132 16.2858C19.8357 15.9093 20.1324 15.6126 20.5032 15.3958C20.8798 15.1733 21.2934 15.062 21.7441 15.062C22.2005 15.062 22.6142 15.1733 22.985 15.3958C23.3559 15.6126 23.6525 15.9093 23.875 16.2858C24.0976 16.6567 24.2088 17.0703 24.2088 17.5267C24.2088 17.9832 24.0976 18.3968 23.875 18.7677C23.6582 19.1442 23.3616 19.4437 22.985 19.6662C22.6142 19.8887 22.2005 20 21.7441 20ZM5.31279 8.69491C4.71943 8.69491 4.16031 8.58365 3.63542 8.36115C3.11053 8.13293 2.6484 7.81914 2.24903 7.41977C1.84966 7.0204 1.53586 6.55827 1.30765 6.03338C1.07944 5.50849 0.965332 4.94651 0.965332 4.34745C0.965332 3.7484 1.07944 3.18927 1.30765 2.67009C1.53586 2.1452 1.84966 1.68307 2.24903 1.2837C2.6484 0.878619 3.11053 0.564827 3.63542 0.342319C4.16031 0.114106 4.71943 0 5.31279 0C5.91184 0 6.47382 0.114106 6.99871 0.342319C7.5236 0.564827 7.98573 0.875767 8.3851 1.27514C8.78447 1.67451 9.09541 2.13664 9.31792 2.66153C9.54613 3.18642 9.66024 3.7484 9.66024 4.34745C9.66024 4.94081 9.54613 5.49993 9.31792 6.02482C9.08971 6.54971 8.77306 7.01184 8.36799 7.41121C7.96861 7.81058 7.50648 8.12438 6.98159 8.35259C6.4567 8.5808 5.90043 8.69491 5.31279 8.69491ZM3.28454 5.01498H5.36413C5.51247 5.01498 5.63514 4.96363 5.73213 4.86093C5.83482 4.75824 5.88617 4.63272 5.88617 4.48438V1.81429C5.88617 1.67166 5.83482 1.55185 5.73213 1.45486C5.62943 1.35216 5.50677 1.30081 5.36413 1.30081C5.2158 1.30081 5.09028 1.35216 4.98758 1.45486C4.88489 1.55185 4.83354 1.67166 4.83354 1.81429V3.96234H3.28454C3.14191 3.96234 3.01639 4.01369 2.90799 4.11639C2.8053 4.21908 2.75395 4.34175 2.75395 4.48438C2.75395 4.62701 2.8053 4.75253 2.90799 4.86093C3.01069 4.96363 3.13621 5.01498 3.28454 5.01498Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            {/* Recent Shipping Status */}
            <div className="pt-5">
              <div className="mt-[5px]">
                <h2 className="text-black text-xl font-bold font-['Be Vietnam Pro']">
                  Recent Shipping Status
                </h2>
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

              {/* View all locations */}
              <div className="pt-5">
                <div className="mt-[-15px]">
                  <div className="mb-[10px] w-full h-[38px] px-4 py-2.5 bg-white rounded justify-center items-center gap-2 inline-flex">
                    <div className="text-black text-sm font-medium font-['Be Vietnam Pro']">
                      View All Locations
                    </div>
                    <img
                      src={rightArrow}
                      alt="right arrow"
                      className="w-[6.69px] h-[11.87px] relative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Empty Space */}
          <div style={{ height: "30px" }} />{" "}
          <footer className="font-vietnam bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-bold">@2024 MORI</p>
            <p className="font-semibold">XYZ</p>
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
