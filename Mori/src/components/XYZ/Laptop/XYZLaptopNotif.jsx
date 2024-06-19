import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function XYZLaptopNotif() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-white">
        <header className="mt-4 self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full text-left text-base text-black font-vietnam">
          <nav className="m-0 self-stretch flex flex-row items-start justify-start py-0 pr-6 pl-5 box-border max-w-full">
            <nav className="m-0 flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] text-right text-xl text-[#828282] font-vietnam">
              <div className="flex flex-row items-start justify-start gap-[20px]">
                <div className="flex flex-row items-start justify-start">
                  <h3 className="m-0 w-6 relative text-inherit tracking-[-0.02em] font-semibold font-inherit inline-block min-w-[24px]">
                    
                  </h3>
                </div>
                <h3 className="m-0 relative text-inherit font-bold font-vietnam text-black text-left inline-block min-w-[89px]">
                  Notifications
                </h3>
              </div>
            </nav>
          </nav>
        </header>

        {/* notif cards */}
        <div>
          {/* today */}
          <div className="mt-2 ml-5">
            <h2 className="text-gray-500 text-xl font-bold">Today</h2>
          </div>

          {/* Unopened card */}
          <div
            className="m-5 relative rounded-lg"
            style={{ backgroundColor: "#9AD1B380" }}
          >
            <div
              className="absolute top-4 right-4 h-4 w-4 rounded-full"
              style={{ backgroundColor: "#4D946D" }}
            ></div>
            <div className="flex flex-col items-start w-full">
              <div className="relative">
                <div
                  className="ml-6 mb-5 mt-5"
                  style={{
                    position: "relative",
                    width: "250px",
                    height: "75px",
                  }}
                >
                  <p>
                    <strong>Package #ID</strong> is being delivered by John Doe
                  </p>
                  <p className="text-gray-500">
                    <span>09:00 AM -</span>
                    <span> 2 minutes ago</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="m-5 relative rounded-lg"
            style={{ backgroundColor: "#9AD1B380" }}
          >
            <div
              className="absolute top-4 right-4 h-4 w-4 rounded-full"
              style={{ backgroundColor: "#4D946D" }}
            ></div>
            <div className="flex flex-col items-start w-full">
              <div className="relative">
                <div
                  className="ml-6 mt-5"
                  style={{
                    position: "relative",
                    width: "250px",
                    height: "75px",
                  }}
                >
                  <p>
                    <strong>Package #ID</strong> has arrived
                  </p>
                  <p className="text-gray-500">
                    <span>09:00 AM -</span>
                    <span> 2 minutes ago</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Opened card */}
          <div
            className="m-5 relative rounded-lg"
            style={{ backgroundColor: "#EFEFEF" }}
          >
            <div
              className="absolute top-4 right-4 h-4 w-4 rounded-full"
              style={{ backgroundColor: "" }}
            ></div>
            <div className="flex flex-col items-start w-full">
              <div className="relative">
                <div
                  className="ml-6 mt-5"
                  style={{
                    position: "relative",
                    width: "250px",
                    height: "75px",
                  }}
                >
                  <p>
                    <strong>Package #ID</strong> has arrived
                  </p>
                  <p className="text-gray-500">
                    <span>09:00 AM -</span>
                    <span> 2 minutes ago</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="m-5 relative rounded-lg"
            style={{ backgroundColor: "#EFEFEF" }}
          >
            <div
              className="absolute top-4 right-4 h-4 w-4 rounded-full"
              style={{ backgroundColor: "" }}
            ></div>
            <div className="flex flex-col items-start w-full">
              <div className="relative">
                <div
                  className="ml-6 mt-5"
                  style={{
                    position: "relative",
                    width: "250px",
                    height: "75px",
                  }}
                >
                  <p>
                    <strong>Package #ID</strong> has arrived
                  </p>
                  <p className="text-gray-500">
                    <span>09:00 AM -</span>
                    <span> 2 minutes ago</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
