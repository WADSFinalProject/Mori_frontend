import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readExpeditions_byAWB } from "../../../service/expeditionService"; // Update the path as necessary

const ShipDetails = () => {
  const { awb } = useParams();
  const [shipmentDetails, setShipmentDetails] = useState(null);

  useEffect(() => {
    // Fetch shipment details using the AWB
    const fetchShipmentDetails = async () => {
      try {
        const response = await readExpeditions_byAWB(awb);
        setShipmentDetails(response.data);
      } catch (error) {
        console.error("Error fetching shipment details: ", error);
      }
    };

    fetchShipmentDetails();
  }, [awb]);

  return (
    <div className="max-w-[425px] mx-auto h-screen flex flex-col items-start justify-start bg-white">
      <header className="w-full flex flex-row items-center justify-between gap-12 px-6 bg-white py-4">
        <Link to={"/centra/shipping"}>
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
        {shipmentDetails && (
          <>
            <div className="flex flex-row p-5 gap-3 bg-[#9AD1B380]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="27"
                viewBox="0 0 24 27"
                fill="none"
              >
                <path
                  d="M1.66419 20.8759C1.12531 20.5669 0.713224 20.2103 0.427935 19.8061C0.142645 19.402 0 18.7759 0 17.928V8.5134C0 7.89527 0.114908 7.38412 0.344725 6.97996C0.582467 6.56788 0.954928 6.21919 1.46211 5.9339L9.86627 1.1553C10.5874 0.743213 11.3006 0.53717 12.0059 0.53717C12.7112 0.53717 13.4205 0.743213 14.1337 1.1553L22.5498 5.9339C23.049 6.21919 23.4136 6.56788 23.6434 6.97996C23.8811 7.38412 24 7.89527 24 8.5134V17.928C24 18.7759 23.8574 19.402 23.5721 19.8061C23.2947 20.2103 22.8826 20.5669 22.3358 20.8759L12.9926 26.1776C12.6518 26.3678 12.319 26.4629 11.9941 26.4629C11.6771 26.4629 11.3522 26.3678 11.0193 26.1776L1.66419 20.8759ZM2.73403 19.3069L11.0669 24.0498V14.1835L1.80684 8.89378V17.8685C1.80684 18.1934 1.8742 18.4668 2.00892 18.6887C2.14364 18.9106 2.38534 19.1167 2.73403 19.3069ZM21.2779 19.3069C21.6186 19.1167 21.8564 18.9106 21.9911 18.6887C22.1258 18.4668 22.1932 18.1934 22.1932 17.8685V8.89378L12.9331 14.1835V24.0498L21.2779 19.3069ZM12.0059 12.5193L15.679 10.4391L6.50223 5.22068L2.82912 7.32469L12.0059 12.5193ZM17.5929 9.35738L21.1828 7.32469L13.3492 2.85515C12.4616 2.34004 11.5661 2.34004 10.6627 2.85515L8.38039 4.15084L17.5929 9.35738Z"
                  fill="#217045"
                />
              </svg>
              <div className="flex flex-col font-vietnam">
                <div className="text-lg font-bold tracking-tight text-[#217045]">
                  Shipped
                </div>
                <div className="text-sm font-normal tracking-tight">
                  Estimated Arrival{" "}
                  <b>
                    {new Date(
                      shipmentDetails.expedition.EstimatedArrival
                    ).toLocaleDateString()}
                  </b>
                </div>
                <div className="text-[#00000066] text-xs font-medium tracking-tight mt-1">
                  Shipped with{" "}
                  {shipmentDetails.expedition.ExpeditionServiceDetails}
                </div>
              </div>
            </div>
            <div className="flex flex-row p-5 gap-3">
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
                  {shipmentDetails.expedition.ExpeditionServiceDetails} - {awb}
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
                      Pesanan sampai di sorting center JAKARTA
                    </div>
                    <div className="text-xs font-medium text-[#828282]">
                      18-03-2024 08:40 PM
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-base text-[#5D9EA4] font-semibold cursor-pointer ml-1 h-fit">
                Track
              </div>
            </div>

            <hr className="bg-[#D9D9D9] w-full h-1" />

            <div className="flex flex-col font-vietnam p-5">
              <div className="text-lg font-semibold tracking-tight mb-1">
                Batch Information
              </div>
              <hr className="bg-[#d9d9d9] w-full border" />
              {/* Render batch information dynamically */}
              {shipmentDetails.batches.map((batch) => (
                <div
                  key={batch.BatchID}
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

              <div className="flex flex-row my-3 justify-between font-bold text-sm">
                <div>Total Weight</div>
                <div className="text-[#5D9EA4]">
                  {shipmentDetails.expedition.TotalWeight} kg
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ShipDetails;
