import React from "react";
import Checked from "../../assets/Checked.svg";

const VotingOver = () => {
  return (
    <div className="container h-[70vh] flex items-center justify-center">
      <div
        className="flex my-4 text-sm text-green-800 rounded-lg bg-green-200 drop-shadow-lg border-green-600 border py-14 px-10"
        role="alert"
      >
        <div className="flex flex-col gap-6 px-20">
          <span className="flex font-bold w-max text-2xl capitalize mx-auto gap-3 ">
            <img src={Checked} alt="" srcSet="" />
            Election Process is completed !
          </span>
          <ul className="mt-8 list-disc list-inside font-semibold flex flex-col gap-4 ">
            <li className="mb-1">
              Thank you for participating in Elections! we truly appreciate your
              contribution.
            </li>
            <li className="mb-1">
              The Election Commission of India (ECI) will announce the election
              results.
            </li>
            <li>
              Should you have any questions or need further information, feel
              free to reach out to booth maintainer for assistance.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VotingOver;
