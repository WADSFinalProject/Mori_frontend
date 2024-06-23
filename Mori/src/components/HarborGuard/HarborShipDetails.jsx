import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  readExpeditions_byAWB,
  updateExpeditionStatus,
  createCheckpointStatus,
} from "../../service/expeditionService";

const HarborShipDetails = () => {
  const { awb } = useParams();
  const [shipmentDetails, setShipmentDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await readExpeditions_byAWB(awb);
        console.log(response.data)
        setShipmentDetails(response.data);
      } catch (error) {
        console.error("Error fetching shipment details: ", error);
      }
    };

    fetchShipmentDetails();
  }, [awb]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCheckpointDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PKG_Delivered":
        return "Delivered";
      case "PKG_Delivering":
        return "Shipping";
      case "Missing":
        return "Missing";
      case "XYZ_PickingUp":
        return "Scheduled";
      case "XYZ_Completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "PKG_Delivered":
        return "#838948"; // Green for Delivered
      case "PKG_Delivering":
        return "#9AD1B380"; // Light blue for Shipping
      case "Missing":
        return "#CD484866"; // Light red for Missing
      case "XYZ_PickingUp":
        return "#4D946D"; // Green for Scheduled
      case "XYZ_Completed":
        return "#838948"; // Yellow for Completed
      default:
        return "#FFFFFF"; // Default white
    }
  };

  const getEstimatedArrivalTextColor = (status) => {
    switch (status) {
      case "PKG_Delivered":
        return "#FFFFFF"; // White for Delivered
      case "PKG_Delivering":
        return "#000000"; // Black for Shipping
      case "Missing":
        return "#000000"; // Black for Missing
      case "XYZ_PickingUp":
        return "#FFFFFF"; // White for Scheduled
      case "XYZ_Completed":
        return "#000000"; // Black for Completed
      default:
        return "#000000"; // Default black
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "PKG_Delivered":
        return "#B8F3D3"; // Light green for Delivered
      case "PKG_Delivering":
        return "#217045"; // Green for Shipping
      case "Missing":
        return "#852222"; // Dark red for Missing
      case "XYZ_PickingUp":
        return "#B8F3D3"; // Light green for Scheduled
      case "XYZ_Completed":
        return "#217045"; // Green for Completed
      default:
        return "#000000"; // Default black
    }
  };

  const getSvgColor = (status) => {
    switch (status) {
      case "PKG_Delivered":
        return "#B8F3D3"; // Light green for Delivered
      case "PKG_Delivering":
        return "#217045"; // Green for Shipping
      case "Missing":
        return "#852222"; // Dark red for Missing
      case "XYZ_PickingUp":
        return "#B8F3D3"; // Light green for Scheduled
      case "XYZ_Completed":
        return "#217045"; // Green for Completed
      default:
        return "#000000"; // Default black
    }
  };

  const getExpeditionTextColor = (status) => {
    switch (status) {
      case "PKG_Delivered":
        return "#B8D4C5"; // Light green for Delivered
      case "PKG_Delivering":
        return "#00000066"; // Grey for Shipping
      case "Missing":
        return "#5E4949"; // Dark grey for Missing
      case "XYZ_PickingUp":
        return "#B8D4C5"; // Light green for Scheduled
      case "XYZ_Completed":
        return "#00000066"; // Grey for Completed
      default:
        return "#000000"; // Default black
    }
  };

  const isDeclareMissingDisabled =
    shipmentDetails?.expedition?.Status === "XYZ_PickingUp" ||
    shipmentDetails?.expedition?.Status === "Missing" ||
    shipmentDetails?.expedition?.Status === "XYZ_Completed";

  const isConfirmShipmentDisabled =
    shipmentDetails?.expedition?.Status !== "PKG_Delivering";

  const getCurrentWITATime = () => {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() + 8); // Add 8 hours to the current UTC time
    return now.toISOString();
  };

  const handleDeclareMissing = async () => {
    try {
      await updateExpeditionStatus(awb, "Missing");
      await createCheckpointStatus(awb, "Missing", getCurrentWITATime());
      setShipmentDetails({
        ...shipmentDetails,
        expedition: {
          ...shipmentDetails.expedition,
          Status: "Missing",
        },
      });
    } catch (error) {
      console.error("Error declaring shipment missing: ", error);
    }
  };

  const handleConfirmShipment = async () => {
    try {
      await updateExpeditionStatus(awb, "PKG_Delivered");
      await createCheckpointStatus(
        awb,
        "Arrived at Harbour Guard",
        getCurrentWITATime()
      );
      setShipmentDetails({
        ...shipmentDetails,
        expedition: {
          ...shipmentDetails.expedition,
          Status: "PKG_Delivered",
        },
      });
    } catch (error) {
      console.error("Error confirming shipment: ", error);
    }
  };


  return (
    <div className="max-w-[425px] mx-auto h-screen flex flex-col items-start justify-start bg-white">
      <header className="w-full flex flex-row items-center justify-between gap-12 px-6 bg-white py-4">
        <Link to={"/harbor/home"}>
          <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.818359 8.42969C0.818359 8.09766 0.964844 7.76562 1.19922 7.53125L7.5957 1.14453C7.86914 0.871094 8.17188 0.744141 8.47461 0.744141C9.17773 0.744141 9.66602 1.24219 9.66602 1.90625C9.66602 2.25781 9.51953 2.55078 9.29492 2.77539L7.11719 4.98242L4.53906 7.33594L6.75586 7.20898H18.2695C19.0117 7.20898 19.5098 7.70703 19.5098 8.42969C19.5098 9.15234 19.0117 9.65039 18.2695 9.65039H6.75586L4.53906 9.52344L7.11719 11.877L9.29492 14.084C9.51953 14.2988 9.66602 14.5918 9.66602 14.9531C9.66602 15.6074 9.17773 16.1055 8.47461 16.1055C8.17188 16.1055 7.86914 15.9883 7.61523 15.7344L1.19922 9.32812C0.964844 9.09375 0.818359 8.76172 0.818359 8.42969Z"
              fill="#828282"
            />
          </svg>
        </Link>

        <div className="flex flex-row font-vietnam gap-2">
          <svg
            width="27"
            height="20"
            viewBox="0 0 27 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.57031 8.13281C2.35156 8.13281 0.515625 6.29688 0.515625 4.07031C0.515625 1.84375 2.35156 0.0078125 4.57031 0.0078125C6.79688 0.0078125 8.63281 1.84375 8.63281 4.07031C8.63281 6.28125 6.78125 8.13281 4.57031 8.13281ZM2.71094 4.77344H4.625C4.96094 4.77344 5.21875 4.51562 5.21875 4.17969V1.84375C5.21875 1.52344 4.95312 1.26562 4.625 1.26562C4.29688 1.26562 4.03125 1.52344 4.03125 1.84375V3.59375H2.71094C2.38281 3.59375 2.11719 3.85938 2.11719 4.17969C2.11719 4.50781 2.375 4.77344 2.71094 4.77344ZM2.52344 14.625V8.84375C3.15625 9.11719 3.84375 9.26562 4.57031 9.26562C7.40625 9.26562 9.76562 6.90625 9.76562 4.07031C9.76562 3.25 9.57031 2.48438 9.23438 1.79688H15.5391C17.1172 1.79688 17.9844 2.67188 17.9844 4.25V14.0547C17.2578 14.6562 16.8203 15.5703 16.8203 16.5938C16.8203 16.7578 16.8359 16.9141 16.8594 17.0703H12.1406C12.1719 16.9141 12.1797 16.7578 12.1797 16.6016C12.1797 14.6719 10.6094 13.0938 8.67969 13.0938C6.74219 13.0938 5.17188 14.6719 5.17188 16.6016C5.17188 16.7578 5.17969 16.9141 5.21094 17.0625H4.77344C3.3125 17.0625 2.52344 16.1406 2.52344 14.625ZM19.1094 6.11719H21.2109C22.0625 6.11719 22.6406 6.32812 23.1562 6.90625L25.8828 9.97656C26.3594 10.5234 26.4922 10.9219 26.4922 11.7734V14.625C26.4922 16.1562 25.6875 17.0781 24.1953 17.0781H23.7891C23.8203 16.9141 23.8359 16.7578 23.8359 16.5938C23.8359 14.6641 22.2422 13.0938 20.3047 13.0938C19.875 13.0938 19.4688 13.1875 19.1094 13.3516V6.11719ZM21.4453 11.3984H24.6484C24.625 11.2188 24.5391 11.0859 24.4219 10.9453L22.1406 8.375C21.8516 8.05469 21.6328 7.98438 21.2578 7.98438H20.6562V10.6094C20.6562 11.0938 20.9609 11.3984 21.4453 11.3984ZM20.3281 19.1094C18.9453 19.1094 17.8203 17.9844 17.8203 16.5938C17.8203 15.2109 18.9453 14.0859 20.3281 14.0859C21.7109 14.0859 22.8359 15.2109 22.8359 16.5938C22.8359 18 21.7188 19.1094 20.3281 19.1094ZM8.67969 19.1094C7.28906 19.1094 6.16406 17.9844 6.16406 16.6016C6.16406 15.2188 7.28906 14.0938 8.67969 14.0938C10.0625 14.0938 11.1875 15.2188 11.1875 16.6016C11.1875 17.9844 10.0625 19.1094 8.67969 19.1094Z"
              fill="#828282"
            />
          </svg>

          <div className="text-[#828282] font-semibold text-base">
            Shipment Details
          </div>
        </div>

        <div className="w-2 h-7 text-transparent select-none">t</div>
      </header>

      <main className="flex flex-col w-full">
      {Object.keys(shipmentDetails).length > 0 && (
          <>
            <div
              className="flex flex-row p-5 gap-3"
              style={{
                backgroundColor: getStatusBgColor(
                  shipmentDetails.expedition.Status
                ),
              }}
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={getSvgColor(shipmentDetails.expedition.Status)}
              >
                <path
                  d="M12.5 13V22M12.5 13L4.5 8M12.5 13L20.5 8M8.5 5.5L16.5 10.5M4.5 8L12.5 3L20.5 8V17L12.5 22L4.5 17V8Z"
                  stroke={getSvgColor(shipmentDetails.expedition.Status)}
                  strokeWidth="1.2"
                />
              </svg>
              <div className="flex flex-col font-vietnam">
                <div
                  className="text-lg font-bold tracking-tight"
                  style={{
                    color: getStatusTextColor(
                      shipmentDetails.expedition.Status
                    ),
                  }}
                >
                  {getStatusText(shipmentDetails.expedition.Status)}
                </div>
                <div
                  className="text-sm font-normal tracking-tight"
                  style={{
                    color: getEstimatedArrivalTextColor(
                      shipmentDetails.expedition.Status
                    ),
                  }}
                >
                  {shipmentDetails.expedition.Status === "Missing" ? (
                    <>
                      The package is missing. Please{" "}
                      <b>
                        contact{" "}
                        <a
                          className="underline"
                          href="https://wa.me/81212333232"
                        >
                          Harbour Guard
                        </a>
                      </b>{" "}
                      or{" "}
                      <b>
                        <a
                          className="underline"
                          href="https://wa.me/6281383438301"
                        >
                          Delivery Service
                        </a>{" "}
                        for further investigation.
                      </b>
                    </>
                  ) : (
                    <>
                      Estimated Arrival{" "}
                      <b>
                        {formatDate(
                          shipmentDetails.expedition.EstimatedArrival
                        )}
                      </b>
                    </>
                  )}
                </div>
                <div
                  className="text-xs font-medium tracking-tight mt-1"
                  style={{
                    color: getExpeditionTextColor(
                      shipmentDetails.expedition.Status
                    ),
                  }}
                >
                  Shipped with{" "}
                  {shipmentDetails.expedition.ExpeditionServiceDetails}
                </div>
              </div>
            </div>
            <div className="flex flex-row p-5 gap-3 justify-between">
              <div className="flex flex-row gap-3">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 9 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.486328 4.81055C0.486328 2.59375 2.27344 0.787109 4.5 0.787109C6.72656 0.787109 8.50391 2.59375 8.50391 4.81055C8.50391 6.63672 7.27344 8.18945 5.59375 8.66797V17.9355C5.59375 20.4355 4.91016 22.1152 4.5 22.1152C4.08008 22.1152 3.38672 20.4258 3.38672 17.9355V8.66797C1.70703 8.17969 0.486328 6.63672 0.486328 4.81055ZM3.35742 5.03516C4.10938 5.03516 4.72461 4.40039 4.72461 3.6582C4.72461 2.91602 4.10938 2.29102 3.35742 2.29102C2.63477 2.29102 1.99023 2.91602 1.99023 3.6582C1.99023 4.40039 2.63477 5.03516 3.35742 5.03516Z"
                    fill="black"
                  />
                </svg>
                <div className="flex flex-col font-vietnam tracking-tight gap-1">
                  <div className="text-lg font-semibold">
                    Shipping Information
                  </div>
                  <div className="text-sm text-[#828282] font-medium">
                    {shipmentDetails.expedition.ExpeditionServiceDetails} -{" "}
                    {awb}
                  </div>
                  <div className="flex flex-row gap-2">
                    <svg
                      width="9"
                      height="30"
                      viewBox="0 0 9 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <path
                        d="M9 4.5C9 6.98528 6.98528 9 4.5 9C2.01472 9 0 6.98528 0 4.5C0 2.01472 2.01472 0 4.5 0C6.98528 0 9 2.01472 9 4.5Z"
                        fill="#9AD1B3"
                      />
                      <line
                        x1="4.5"
                        y1="3.5"
                        x2="4.5"
                        y2="29.5"
                        stroke="#9AD1B3"
                        strokeLinecap="round"
                        strokeDasharray="2 3"
                      />
                    </svg>
                    <div className="flex flex-col gap-1">
                      <div className="text-[#9AD1B3] text-sm font-medium">
                        {shipmentDetails.checkpoint_status}
                      </div>
                      <div className="text-xs font-medium text-[#828282]">
                        {shipmentDetails.checkpoint_statusdate
                          ? formatCheckpointDate(
                              shipmentDetails.checkpoint_statusdate
                            )
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/tracking/${awb}`)}
                className="text-base text-[#5D9EA4] font-semibold cursor-pointer ml-1 h-fit"
              >
                Track
              </button>
            </div>

            <hr className="bg-[#D9D9D9] w-full h-1" />

            <div className="flex flex-col font-vietnam p-5">
              <div className="text-lg font-semibold tracking-tight mb-1">
                Batch Information
              </div>
              <hr className="bg-[#d9d9d9] w-full border" />
              {shipmentDetails.batches.map((batch, index) => (
                <div
                  key={index}
                  className="mt-3 mb-2 flex flex-col w-full gap-1"
                >
                  <div className="flex flex-row justify-between">
                    <div className="font-bold text-sm">
                      Batch #{batch.BatchID}
                    </div>
                    <div className="font-bold text-sm text-[#5D9EA4]">
                      {batch.Weight} kg
                    </div>
                  </div>
                  <div className="flex flex-row justify-between text-xs text-[#828282] font-medium">
                    <div>Dried Date</div>
                    <div>{new Date(batch.DriedDate).toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-row justify-between text-xs text-[#828282] font-medium">
                    <div>Floured Date</div>
                    <div>
                      {new Date(batch.FlouredDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}

              <hr className="bg-[#D9D9D9] w-full border" />

              <div className="flex flex-row mt-3 justify-between font-bold text-sm">
                <div>Total Weight</div>
                <div className="text-[#5D9EA4]">
                  {shipmentDetails.expedition.TotalWeight} kg
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-gray-200 bg-white px-5 py-3 flex flex-row gap-2">
        <button
          className={`w-1/2 rounded-lg border px-5 py-2 font-medium text-sm ${
            isDeclareMissingDisabled
              ? "border-[#D9D9D9] text-[#D9D9D9] cursor-not-allowed"
              : "border-[#852222] text-[#852222] hover:bg-[#852222] hover:text-white"
          }`}
          onClick={handleDeclareMissing}
          disabled={isDeclareMissingDisabled}
        >
          Declare Missing
        </button>
        <button
          className={`w-1/2 rounded-lg px-5 py-2 font-medium text-sm ${
            isConfirmShipmentDisabled
              ? "bg-[#D9D9D9] text-[#00000033] cursor-not-allowed"
              : "bg-[#5C612C] text-[#F2F9A9] hover:bg-[#434924]"
          }`}
          onClick={handleConfirmShipment}
          disabled={isConfirmShipmentDisabled}
        >
          Confirm Shipment
        </button>
      </div>
    </div>
  );
};

export default HarborShipDetails;
