import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({
  name = "Undefined",
  aadharNumber = "N/A",
  dob = "01-01-2000",
  city = "N/A",
}) => {
  // Remove Voter
  const removeVoter = async (id) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the voter?\nVoter ID: ${id}`
      )
    ) {
      console.log("Operation Cancelled");
      return;
    }

    try {
      const voterDoc = doc(db, "Voters", id);
      await deleteDoc(voterDoc);

      const profileRef = ref(storage, `Profile/${id}`);
      await deleteObject(profileRef);

      const folderPath = `VoterBiometrics/${id}`;
      const storageRef = ref(storage, folderPath);

      // Try to delete the folder, even if it doesn't exist
      await deleteObject(storageRef).catch((error) => {
        if (error.code !== "storage/object-not-found") {
          throw error;
        }
      });

      // Recursively delete all objects inside the folder
      await deleteObjectsInFolder(storageRef);

      getVoters(); // Update the list of voters after deletion
    } catch (error) {
      console.error(`Error while deleting voter details: ${error}`);
    }
  };
  return (
    <tr className="bg-white hover:bg-gray-50" key={aadharNumber}>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
      </td>

      <td className="px-6 py-4">{aadharNumber}</td>

      <td className="px-6 py-4">{city}</td>

      <td className="px-6 py-4">{dob}</td>

      <td className="px-6 py-4  flex items-center gap-4 w-min">
        <Link
          to={`/view_voter?voterID=${aadharNumber}`}
          className="font-normal text-xs align-middle self-center text-white bg-green-600 rounded-full py-2 px-4 hover:underline"
        >
          View
        </Link>
        <Link
          to={`/update_voter?voterID=${aadharNumber}`}
          className="font-normal text-xs align-middle self-center text-white bg-orange-600 rounded-full py-2 px-4 hover:underline"
        >
          Update
        </Link>
        <button
          onClick={() => {
            removeVoter(aadharNumber);
          }}
          className="font-normal text-xs align-middle self-center text-white bg-red-600 rounded-full py-2 px-4 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
