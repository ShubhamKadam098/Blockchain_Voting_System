import React from "react";

const TableRow = ({
  name = "N/A",
  candidateId = "N/A",
  party = "N/A",
  city = "N/A",
}) => {
  const partiesURL = {
    BJP: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/180px-Bharatiya_Janata_Party_logo.svg.png",
    INC: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/150px-Indian_National_Congress_hand_logo.svg.png",
    MNS: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Mns-symbol-railway-engine.png/150px-Mns-symbol-railway-engine.png",
    ShivSena:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo_of_Shiv_Sena.svg/88px-Logo_of_Shiv_Sena.svg.png",
    AAP: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Aam_Aadmi_Party_logo_%28English%29.svg/180px-Aam_Aadmi_Party_logo_%28English%29.svg.png",
    NCP: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_Nationalist_Congress_Party.svg/180px-Flag_of_Nationalist_Congress_Party.svg.png",
  };

  return (
    <tr
      className="bg-white border-b text-center border border-slate-400"
      key={candidateId}
    >
      <th
        scope="row"
        className="px-6 py-4 font-semibold text-black whitespace-nowrap text-left text-[0.95rem]"
      >
        {name}
      </th>
      <td className="px-6 py-4">{candidateId}</td>
      <td className="px-6 py-4 text-slate-900 font-semibold">{party}</td>
      <td className="px-6 py-4 flex text-base font-semibold gap-2">
        <img className="h-6 mx-auto" src={partiesURL[party]} alt="" srcSet="" />
      </td>
      <td className="px-6 py-4">
        <button className="text-base  text-white bg-blue-600 rounded-full py-2 px-8 hover:bg-blue-800 font-semibold mx-auto">
          Vote
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
