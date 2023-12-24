import useUser from "../../Context/UserContext";
import { partiesURL } from "../../Constant/partyUrl.js";
const TableRow = ({
  name = "N/A",
  candidateId = "N/A",
  party = "N/A",
  city = "N/A",
}) => {
  const { vote } = useUser();

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
        <button
          className="text-base  text-white bg-blue-600 rounded-full py-2 px-8 hover:bg-blue-800 font-semibold mx-auto"
          onClick={() => {
            vote(candidateId);
          }}
        >
          Vote
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
