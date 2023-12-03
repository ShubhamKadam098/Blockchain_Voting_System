import { useState } from "react";
import { partiesURL } from "../../constants/PartiesURL.js";

const Election = () => {
  const [NewCandidate, setNewCandidate] = useState({
    name: "",
    party: "N/A",
    city: "",
  });
  const [Candidates, setCandidates] = useState([]);

  const [Script, setScript] = useState("");

  const resetInput = () => {
    setNewCandidate({
      name: "",
      party: "N/A",
      city: "",
    });
  };

  const addCandidate = () => {
    if (
      NewCandidate.name == "" ||
      NewCandidate.city == "" ||
      NewCandidate.party == "N/A"
    )
      return;

    setCandidates([...Candidates, NewCandidate]);
    resetInput();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(Script);
  };

  const handleSubmit = () => {
    const cities = [];
    const names = [];
    const parties = [];
    for (let i = 0; i < Candidates.length; i++) {
      cities.push(Candidates[i].city);
      names.push(Candidates[i].name);
      parties.push(Candidates[i].party);
    }

    const output = `async function main() {
        const Voting = await ethers.getContractFactory("Voting");
      
        const candidateNames = ${JSON.stringify(names)};
      
        const partyNames = ${JSON.stringify(parties)};
      
        const cities = ${JSON.stringify(cities)};
      
        const Voting_ = await Voting.deploy(candidateNames, partyNames, cities, 120);
        console.log("Contract address:", Voting_.address);
      }
      
      main()
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
      `;
    setScript(output);
  };
  return (
    <>
      <div className="min-h-screen w-auto m-8 border  border-black grow rounded-xl overflow-hidden p-8 ">
        <h1 className="text-2xl font-semibold text-center p-2 rounded-xl bg-slate-900 text-white shadow-lg  mb-8">
          Add Candidates
        </h1>

        <form className=" grid grid-flow-col gap-4 items-center ">
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              id="default-input"
              value={NewCandidate.name}
              onChange={(e) => {
                setNewCandidate((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }));
              }}
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full grow p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select an Party
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              value={NewCandidate.party}
              defaultValue={"N/A"}
              onChange={(e) => {
                setNewCandidate((prevData) => ({
                  ...prevData,
                  party: e.target.value,
                }));
              }}
            >
              <option selected disabled value={"N/A"}>
                Choose a Party Name
              </option>
              <option value="BJP">BJP</option>
              <option value="INC">INC</option>
              <option value="MNS">MNS</option>
              <option value="ShivSena">ShivSena</option>
              <option value="AAP">AAP</option>
              <option value="NCP">NCP</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              City
            </label>
            <input
              type="text"
              id="default-input"
              value={NewCandidate.city}
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => {
                setNewCandidate((prevData) => ({
                  ...prevData,
                  city: e.target.value,
                }));
              }}
              required
            />
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            onClick={addCandidate}
          >
            Add Candidate
          </button>
        </form>
        <div className="relative overflow-x-auto  sm:rounded-lg drop-shadow-lg mb-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse drop-shadow-lg mb-6">
            <thead className="text-gray-700 text-center bg-gray-50 border text-base border-slate-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Party
                </th>
                <th scope="col" className="px-6 py-3">
                  Symbol
                </th>
              </tr>
            </thead>

            <tbody className="">
              {Candidates.length > 0 ? (
                <>
                  {Array.isArray(Candidates) ? (
                    Candidates.map((candidate) => (
                      <tr
                        className="bg-white border-b text-center border border-slate-400 "
                        key={candidate.name}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 text-[px] text-gray-900 font-bold whitespace-nowrap text-left"
                        >
                          {candidate.name}
                        </th>

                        <td className="px-6 py-4 font-semibold text-slate-800">
                          {candidate.party}
                        </td>
                        <td className="px-6 py-4 flex items-center justify-center text-base font-semibold gap-2">
                          <img
                            className="h-8"
                            src={partiesURL[candidate.party]}
                            alt=""
                            srcSet=""
                          />
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
                  <td>Please Add Candidates !</td>
                </tr>
              )}
            </tbody>
          </table>
          {Candidates.length > 0 ? (
            <div className="flex justify-center">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5  "
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {Script ? (
          <div className="">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Deployment Script
            </label>
            <textarea
              id="message"
              rows="4"
              value={Script}
              onChange={(e) => {
                setScript(e.target.value);
              }}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-6"
              placeholder="Write your thoughts here..."
            ></textarea>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  rounded-lg font-semibold text-sm px-3 py-3 min-w-[90px] "
                onClick={() => {
                  setScript("");
                }}
              >
                Clear
              </button>
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-lg font-semibold text-sm px-3 py-3  min-w-[90px]"
                onClick={() => {
                  handleCopy();
                }}
              >
                Copy Script
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Election;
