import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import StatusComponent from "./StatusComponent";
import back from "../../../assets/back.png";
import { useNavigate } from "react-router-dom";
import { readExpeditions } from "../../../service/expeditionService";

const XYZShippingInformationMobile = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const isMobile = width <= 1024;

  const [sort, setSort] = useState("new-old");
  const [filter, setFilter] = useState("all");
  const [shipmentData, setShipmentData] = useState([]);
  const [maxScrollHeight, setMaxScrollHeight] = useState(0);

  const headerHeight = 20;
  const footerHeight = 40;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readExpeditions();
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
        setShipmentData(expeditions);
      } catch (error) {
        console.error("Error fetching shipments: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const availableHeight = height - (headerHeight + footerHeight);
    setMaxScrollHeight(availableHeight);
  }, [height]);

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

  const filterData = (data, filter) => {
    if (filter === "all") return data;
    return data.filter(
      (shipment) => shipment.status.toLowerCase() === filter.replace("-", " ")
    );
  };

  const sortData = (data, sort) => {
    switch (sort) {
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

  const sortedAndFilteredData = sortData(
    filterData([...shipmentData], filter),
    sort
  );

  return (
    <div>
      {isMobile ? (
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
            <div className="grid grid-cols-2 gap-3 select-none pb-2">
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
};

export default XYZShippingInformationMobile;
