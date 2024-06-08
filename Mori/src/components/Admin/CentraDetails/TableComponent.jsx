// TableComponent.jsx
import React from "react";

export const TableComponent = ({ data, onEditClick }) => {
  return (
    <div className="overflow-auto rounded-md border-2 border-solid max-h-80">
      <table className="w-full border-separate border-spacing-0">
        <thead className="sticky bg-white top-0">
          <tr>
            <th className="text-base font-medium text-center border-b-2 py-3">
              Location
            </th>
            <th className="text-base font-medium text-center border-b-2 py-3">
              PIC Name
            </th>
            <th className="text-base font-medium text-center border-b-2 py-3">
              Email
            </th>
            <th className="text-base font-medium text-center border-b-2 py-3">
              Phone
            </th>
            <th className="text-base font-medium text-center border-b-2 py-3">
              Drying Machines
            </th>
            <th className="text-base font-medium text-center border-b-2 py-3">
              Flouring Machines
            </th>
            <th className="text-base font-medium text-center border-b-2 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((row, index) => (
            <tr
              key={index}
              className={` ${
                index === data.length - 1 ? "border-b-0" : "border-b-2"
              }`}
            >
              <td
                className={`font-semibold text-black text-base text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.location}
              </td>
              <td
                className={`font-normal text-black text-base text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.picName}
              </td>
              <td
                className={`font-normal text-base text-black text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.email}
              </td>
              <td
                className={`font-normal text-base text-black text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.phone}
              </td>
              <td
                className={`font-semibold text-black text-sm text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                <div className="bg-[#9AD1B3] py-2 rounded-md inline-block px-4">
                  {row.dryingMachines} Machines
                </div>
              </td>
              <td
                className={`font-semibold text-black text-sm text-center ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                <div className="bg-[#E0EA74] py-2 rounded-md inline-block px-4">
                  {row.flouringMachines} Machines
                </div>
              </td>
              <td
                className={`py-4 ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="flex items-center justify-center hover:border-gray-200 hover:transition-colors hover:duration-300 transition-colors duration-300 border-2 rounded-full border-transparent w-8 h-8"
                    onClick={() => onEditClick(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 27 27"
                      fill="none"
                    >
                      <path
                        d="M4.5647 16.1158C4.0847 16.1158 3.65101 16.0021 3.26365 15.7747C2.87628 15.5389 2.56891 15.2274 2.34154 14.84C2.11417 14.4526 2.00049 14.0274 2.00049 13.5642C2.00049 13.0926 2.11417 12.6632 2.34154 12.2758C2.56891 11.8884 2.87628 11.5811 3.26365 11.3537C3.65101 11.1179 4.0847 11 4.5647 11C5.02786 11 5.45312 11.1179 5.84049 11.3537C6.22786 11.5811 6.53523 11.8884 6.76259 12.2758C6.98996 12.6632 7.10365 13.0926 7.10365 13.5642C7.10365 14.0274 6.98996 14.4526 6.76259 14.84C6.53523 15.2274 6.22786 15.5389 5.84049 15.7747C5.45312 16.0021 5.02786 16.1158 4.5647 16.1158ZM14.0005 16.1158C13.5289 16.1158 13.0994 16.0021 12.7121 15.7747C12.3247 15.5389 12.0131 15.2274 11.7773 14.84C11.55 14.4526 11.4363 14.0274 11.4363 13.5642C11.4363 13.0926 11.55 12.6632 11.7773 12.2758C12.0131 11.8884 12.3247 11.5811 12.7121 11.3537C13.0994 11.1179 13.5289 11 14.0005 11C14.4721 11 14.8973 11.1179 15.2763 11.3537C15.6636 11.5811 15.971 11.8884 16.1984 12.2758C16.4342 12.6632 16.5521 13.0926 16.5521 13.5642C16.5521 14.0274 16.4342 14.4526 16.1984 14.84C15.971 15.2274 15.6636 15.5389 15.2763 15.7747C14.8973 16.0021 14.4721 16.1158 14.0005 16.1158ZM23.4363 16.1158C22.9647 16.1158 22.5352 16.0021 22.1479 15.7747C21.7605 15.5389 21.4531 15.2274 21.2258 14.84C20.9984 14.4526 20.8847 14.0274 20.8847 13.5642C20.8847 13.0926 20.9984 12.6632 21.2258 12.2758C21.4531 11.8884 21.7605 11.5811 22.1479 11.3537C22.5352 11.1179 22.9647 11 23.4363 11C23.9079 11 24.3373 11.1179 24.7247 11.3537C25.1121 11.5811 25.4194 11.8884 25.6468 12.2758C25.8826 12.6632 26.0005 13.0926 26.0005 13.5642C26.0005 14.0274 25.8826 14.4526 25.6468 14.84C25.4194 15.2274 25.1121 15.5389 24.7247 15.7747C24.3373 16.0021 23.9079 16.1158 23.4363 16.1158Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
