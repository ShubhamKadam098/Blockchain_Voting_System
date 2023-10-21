import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import AddVoter from "../../../assets/AddVoter.png";

const VoterList = () => {
  const [voterList, setVoterList] = useState([]);

  return (
    <div className="min-h-screen w-auto m-8 border  border-black grow rounded-xl overflow-hidden p-8 ">
      <h1 className="text-2xl font-semibold text-center p-2 rounded-xl bg-slate-900 text-white shadow-lg">
        Voters List
      </h1>

      <form className="flex my-8 items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative grow">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
            placeholder="Search branch name..."
            required
          />
        </div>
        <button className="flex w-max items-center gap-3 p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
          <img src={AddVoter} className="h-5" alt="" srcSet="" />
          <h6>Add Voter</h6>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700  bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Aadhar Number
              </th>

              <th scope="col" className="px-6 py-3">
                City
              </th>

              <th scope="col" className="px-6 py-3">
                DOB
              </th>

              <th scope="col" className="px-6 py-3 w-48">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <TableRow
              name={voterList.Name}
              aadharNumber={voterList.AadharNumber}
              city={voterList.City}
              dob={voterList.DOB}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoterList;
