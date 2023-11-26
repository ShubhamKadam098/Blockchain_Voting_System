import React from "react";
import vote from "../../assets/vote.png";

const Success = () => {
  return (
    <div
      className="flex  mb-4 text-sm text-green-800 rounded-lg bg-green-200 drop-shadow-lg border-green-600 border py-14 px-10"
      role="alert"
    >
      <img
        src={vote}
        className="flex-shrink-0 inline  h-8 me-3 mt-[2px]"
        alt=""
        srcSet=""
      />

      <span className="sr-only">Info</span>
      <div>
        <span className="font-bold text-2xl capitalize">
          Congratulations! Your vote has been successfully recorded.
        </span>
        <ul className="mt-8 list-disc list-inside font-semibold ">
          <li className="mb-1">
            Thank you for participating in Elections! Your vote is a crucial
            part of our democratic process, and we truly appreciate your
            contribution.
          </li>
          <li className="mb-1">
            The Election Commission of India (ECI) will announce the election
            results after the completion of the voting process and the
            subsequent counting of votes.
          </li>
          <li>
            Should you have any questions or need further information, feel free
            to reach out to booth maintainer for assistance.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Success;
