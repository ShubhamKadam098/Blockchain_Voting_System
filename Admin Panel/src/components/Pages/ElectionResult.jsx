import { useEffect, useState } from "react";
import PartiesURL from "../../constants/PartiesURL";
import useContract from "../../Context/ContractContext";

const ElectionResult = () => {
  const { Candidates, fetchCandidateList, Error } = useContract();
  const [loading, setLoading] = useState(false);

  const handleReload = async () => {
    setLoading(true);
    await fetchCandidateList();
    setLoading(false);
  };

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <>
      <div className="min-h-screen w-auto m-8 border  border-black grow rounded-xl overflow-hidden p-8 ">
        <h1 className="text-2xl font-semibold text-center p-2 rounded-xl bg-slate-900 text-white shadow-lg  mb-8">
          Election Results
        </h1>

        {Error && (
          <>
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Something went wrong!</span>{" "}
                {Error}.
              </div>
            </div>
          </>
        )}
        {loading ? (
          <div
            role="status"
            className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse "
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="relative overflow-x-auto  sm:rounded-lg drop-shadow-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse drop-shadow-lg">
              <thead className="text-gray-700 text-center bg-gray-50 border text-lg border-slate-400">
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

                  <th scope="col" className="px-6 py-3 w-48">
                    Vote Count
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {Candidates.length > 0 ? (
                  <>
                    {Array.isArray(Candidates) ? (
                      Candidates.map((candidate) => (
                        <tr
                          className="bg-white border-b text-center border border-slate-400"
                          key={candidate.index}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 text-base text-gray-900 font-bold whitespace-nowrap text-left"
                          >
                            {candidate.name}
                          </th>
                          <td className="px-6 py-4 text-center">
                            {candidate.index}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-800">
                            {candidate.party}
                          </td>
                          <td className="px-6 py-4 flex items-center justify-center text-base font-semibold gap-2">
                            <img
                              className="h-8"
                              src={PartiesURL[candidate.party]}
                              alt=""
                              srcSet=""
                            />
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-800">
                            {candidate.voteCount}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center text-lg font-semibold py-4">
                        <td>
                          Sorry! Something went wrong failed to fetch candidates
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr className="text-center text-lg font-semibold py-4">
                    <td>No candidates found !</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ElectionResult;
