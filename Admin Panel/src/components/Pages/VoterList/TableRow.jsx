import React from "react";

const TableRow = ({
  name = "Undefined",
  aadharNumber = "N/A",
  dob = "01-01-2000",
  city = "N/A",
}) => {
  return (
    <tr className="bg-white hover:bg-gray-50" key={aadharNumber}>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
      </td>

      <td className="px-6 py-4">{aadharNumber}</td>

      <td className="px-6 py-4">{city}</td>

      <td className="px-6 py-4">{dob}</td>

      <td className="px-6 py-4  flex items-center gap-4 w-min">
        <button className="font-normal text-xs align-middle self-center text-white bg-green-600 rounded-full py-2 px-4 hover:underline">
          View
        </button>
        <button className="font-normal text-xs align-middle self-center text-white bg-orange-600 rounded-full py-2 px-4 hover:underline">
          Update
        </button>
        <button className="font-normal text-xs align-middle self-center text-white bg-red-600 rounded-full py-2 px-4 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
