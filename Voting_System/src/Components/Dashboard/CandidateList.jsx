import React from "react";
import TableRow from "./TableRow";
import useUser from "../../Context/UserContext";
import Success from "../Dashboard/Success";

const CandidateList = ({ Candidates }) => {
  const { currentUser } = useUser();

  return (
    <div className="min-h-screen w-auto mx-8 drop-shadow-lg grow rounded-xl overflow-hidden p-8 ">
      <h1 className="text-2xl font-semibold text-center p-2 rounded-xl bg-gray-800 text-white shadow-sm mb-8 tracking-wider ">
        Vote For Your Candidate
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {currentUser.isVoted ? (
          <Success />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-slate-300 rounded-lg ">
            <caption className="p-5 text-xl font-bold text-left rtl:text-right text-gray-900 bg-white border border-b-2">
              Candidate List
            </caption>
            <thead className=" text-black bg-gray-50 text-center font-bold text-base border border-slate-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Candidate ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Party
                </th>
                <th scope="col" className="px-6 py-3">
                  Symbol
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(Candidates) ? (
                CandidateList.length > 0 ? (
                  Candidates.map((voter) => (
                    <TableRow
                      name={voter.name}
                      candidateId={voter.index}
                      city={voter.city}
                      party={voter.party}
                    />
                  ))
                ) : (
                  <tr className="">
                    <h4 className="text-center text-lg font-semibold py-4">
                      No candidates found !
                    </h4>
                  </tr>
                )
              ) : (
                typeof Candidates
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
