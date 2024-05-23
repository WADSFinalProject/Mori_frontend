import React, { useState } from "react";

export const TableComponent = ({ data }) => {
  const [checkedRows, setCheckedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id]
    );
  };
  return (
    <div className="overflow-x-auto rounded-md border-2 border-solid">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="border-b-2 py-3"></th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center gap-2">Batch ID</div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center gap-2">
                Shipment ID
              </div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center gap-2">Dried Date</div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center gap-2">
                Floured Date
              </div>
            </th>
            <th className="text-base font-medium text-left border-b-2 py-3">
              <div className="flex flex-row items-center gap-2">Weight</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index === data.length - 1 ? "border-b-0" : "border-b-2"
              } ${checkedRows.includes(row.id) ? "bg-[#f8fcd4]" : ""}`}
            >
              <td
                className={`py-4 pl-5 ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                }`}
              >
                <input
                  type="checkbox"
                  className="checkbox w-5 h-5 rounded-md [--chkbg:theme(colors.stone.600)] [--chkfg:theme(colors.zinc.100)]"
                  onChange={() => handleCheckboxChange(row.id)}
                  checked={checkedRows.includes(row.id)}
                ></input>
              </td>
              <td
                className={`font-semibold text-[#a7ad6f] text-base text-left ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.batchId}
              </td>
              <td
                className={`font-semibold text-black text-base text-left ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.shipmentId}
              </td>
              <td
                className={`font-medium text-sm text-[#828282] text-left ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.driedDate}
              </td>
              <td
                className={`font-medium text-sm text-[#828282] text-left ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.flouredDate}
              </td>
              <td
                className={`font-semibold text-black text-base text-left ${
                  index === data.length - 1 ? "border-b-0" : "border-b-2"
                } py-4`}
              >
                {row.weight}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
