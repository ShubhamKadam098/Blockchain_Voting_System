import React, { useEffect, useState } from "react";
import editBtn from "../../assets/EditBtn.svg";
import Cancel from "../../assets/Cancel.svg";
import { useSearchParams } from "react-router-dom";

const UpdateVoter = () => {
  const [voterData, setVoterData] = useState({
    name: "",
    aadharNumber: "",
    dob: "",
    phone: "",
    email: "",
    walletId: "",
    add1: "",
    add2: "",
    city: "",
    pin: 0,
    state: "Choose a state",
    profile: null,
    fingerprints: [],
    isFingerprintValid: false,
  });

  const [search, setSearch] = useSearchParams({ voterID: "" });
  const [voterNewProfile, setVoterNewProfile] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const voterID = search.get("voterID");
  const handleTitle = (event) => {
    setSearch({ voterID: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "fingerprints") {
      // Handle multiple fingerprint files
      const fingerprintFiles = Array.from(files);
      setVoterData((prevData) => ({
        ...prevData,
        fingerprints: fingerprintFiles,
        isFingerprintValid: fingerprintFiles.length === 10, // Check if exactly 10 files are selected
      }));
    } else if (name === "state") {
      setVoterData((prevData) => ({
        ...prevData,
        state: value,
      }));
    } else {
      // Handle other input changes
      setVoterData((prevData) => ({
        ...prevData,
        [name]: name === "profile" ? files[0] : value,
      }));
    }
  };

  function handleSearch(e) {
    e.preventDefault();
  }
  const reset = () => {
    setVoterData((prevState) => ({
      ...prevState,
      name: "",
      aadharNumber: "",
      dob: "",
      phone: "",
      email: "",
      walletId: "",
      add1: "",
      add2: "",
      city: "",
      pin: 0,
      state: "Choose a state",
      profile: null,
      fingerprints: [],
      isFingerprintValid: false,
    }));
  };

  return (
    <>
      <div className=" w-auto m-8 border border-black grow rounded-xl overflow-hidden p-8 ">
        <h1 className="text-2xl font-semibold text-center p-2 rounded-xl bg-slate-900 text-white shadow-lg">
          Update Voter Details
        </h1>
        {/* Id Input */}

        <form className="flex items-center my-8 mx-auto w-3/5">
          <div className="relative w-full">
            <input
              type="text"
              id="search"
              value={search.get("voterID")}
              onChange={handleTitle}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  "
              placeholder="Aadhar Number"
              required
            />
          </div>
          <button
            type="submit"
            className=" font-semibold inline-flex items-center py-2.5 px-6 ms-2 text-sm text-white bg-slate-700 rounded-lg border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleSearch}
            disabled={voterID.length == 11 ? true : false}
          >
            <svg
              className="w-4 h-4 me-2"
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
            Search
          </button>
        </form>

        {/* Voter Details */}
        {voterData.aadharNumber ? (
          <form action="#" className="my-8">
            {/* Profile */}
            <div className="mx-auto flex flex-col items-center justify-center gap-6 my-6">
              <div className="aspect-square bg-slate-300 rounded-xl h-56  border border-black shadow-lg overflow-hidden">
                {voterNewProfile ? (
                  <img
                    id="voter-image"
                    src={URL.createObjectURL(voterNewProfile)}
                    alt="Profile Image"
                  />
                ) : (
                  <img
                    id="voter-image"
                    src={voterData.profile}
                    alt="Profile Image"
                  />
                )}
              </div>
              <input
                name="newProfile"
                type="file"
                accept="image/x-png,image/jpg,image/jpeg"
                onChange={(e) => {
                  setVoterNewProfile(e.target.files[0]);
                }}
                className="border border-slate-400 rounded-lg block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 "
                required
              />
            </div>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={voterData.name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder=""
              />
            </div>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={voterData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={voterData.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="test@example.com"
                />
              </div>
              {/* Dob */}
              <div>
                <label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Date of Birth
                </label>
                <input
                  name="dob"
                  type="date"
                  value={voterData.dob}
                  onChange={handleInputChange}
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  placeholder="Select date"
                />
              </div>
              {/* .Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Gender
                </label>
                <select
                  id="gemder"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                >
                  <option selected="">Select the Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
              </div>
              {/* .Address 1 */}
              <div>
                <label
                  htmlFor="add1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Address 1
                </label>
                <input
                  type="text"
                  name="add1"
                  id="add1"
                  value={voterData.add1}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder=""
                />
              </div>
              {/* Address 2 */}
              <div>
                <label
                  htmlFor="add2"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Address 2
                </label>
                <input
                  type="text"
                  name="add2"
                  id="add2"
                  value={voterData.add2}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="(Optional)"
                />
              </div>
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={voterData.city}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder=""
                />
              </div>
              {/* Pin */}
              <div>
                <label
                  htmlFor="pin"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Pin
                </label>
                <input
                  type="number"
                  name="pin"
                  id="pin"
                  value={voterData.pin}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder=""
                />
              </div>
            </div>
            {/* Wallet ID */}
            <div>
              <label
                htmlFor="walletId"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Wallet ID
              </label>
              <input
                type="text"
                name="walletId"
                id="walletId"
                value={voterData.walletId}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="test@example.com"
              />
            </div>
            {/* State */}
            <label
              htmlFor="states"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select the State
            </label>
            <select
              name="state"
              id="state"
              value={voterData.state}
              onChange={handleInputChange}
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="AndhraPradesh">Andhra Pradesh</option>
              <option value="ArunachalPradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="HimachalPradesh">Himachal Pradesh</option>
              <option value="JammuKashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="MadhyaPradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="TamilNadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="UttarPradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="WestBengal">West Bengal</option>
            </select>

            {/* Fingerprint */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                htmlFor="file_input"
              >
                Select Fingerprints
              </label>
              <input
                id="fingerprints"
                type="file"
                name="fingerprints"
                onChange={handleInputChange}
                accept="image/x-png,image/jpg,image/jpeg"
                placeholder=""
                multiple
                required
                className="block border mb-8 border-slate-300 rounded-lg w-full text-sm text-gray-500 file:mr-4  file:py-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:px-8 "
              />
            </div>

            <div className="flex  items-center space-x-4 mx-auto w-1/2">
              <button
                type="button"
                className="flex-grow gap-1 items-center justify-center text-white inline-flex hover:text-white border border-red-600 bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={reset}
              >
                <img className="h-[15px]" src={Cancel} alt="" />
                Cancel
              </button>
              {loadingState ? (
                <button
                  disabled
                  type="button"
                  className="flex-grow items-center justify-center text-white inline-flex hover:text-white border border-green-600 bg-green-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              ) : (
                <button
                  type="button"
                  className="flex-grow gap-[5px] items-center justify-center text-white inline-flex hover:text-white border border-green-600 bg-green-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                  disabled={loadingState}
                >
                  <img className="h-[20px]" src={editBtn} alt="" />
                  Update
                </button>
              )}
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UpdateVoter;
