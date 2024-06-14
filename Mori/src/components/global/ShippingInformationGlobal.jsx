import React from "react";

const ShippingInformationGlobal = () => {
  return (
    <div className="max-w-[640px] mx-auto h-screen flex flex-col items-start justify-start">
      <header className="w-full flex flex-row items-center justify-center gap-12 h-full self-start">
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

        <div className="flex flex-row font-vietnam gap-2">
          <svg
            width="7"
            height="18"
            viewBox="0 0 7 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.0625 3.64844C0.0625 1.875 1.49219 0.429688 3.27344 0.429688C5.05469 0.429688 6.47656 1.875 6.47656 3.64844C6.47656 5.10938 5.49219 6.35156 4.14844 6.73438V14.1484C4.14844 16.1484 3.60156 17.4922 3.27344 17.4922C2.9375 17.4922 2.38281 16.1406 2.38281 14.1484V6.73438C1.03906 6.34375 0.0625 5.10938 0.0625 3.64844ZM2.35938 3.82812C2.96094 3.82812 3.45312 3.32031 3.45312 2.72656C3.45312 2.13281 2.96094 1.63281 2.35938 1.63281C1.78125 1.63281 1.26562 2.13281 1.26562 2.72656C1.26562 3.32031 1.78125 3.82812 2.35938 3.82812Z"
              fill="#828282"
            />
          </svg>

          <div className="text-[#828282] font-semibold text-base">
            Shipping Information
          </div>
        </div>

        <div className="w-7 h-7 text-transparent select-none">t</div>
      </header>

      <main className="flex flex-col gap-3">
        <div className="p-5 w-full h-full "></div>
        <div className="p-5 w-full h-full "></div>
      </main>
    </div>
  );
};

export default ShippingInformationGlobal;
