import React, { useRef, useState } from "react";

const AddVoter = () => {
  const [loading, setLoading] = useState(false);
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
  const addVoterForm = useRef(null);

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
      console.log("New state:" + value);
      console.log("New state2:" + voterData.state);
    } else {
      // Handle other input changes
      setVoterData((prevData) => ({
        ...prevData,
        [name]: name === "profile" ? files[0] : value,
      }));
    }
  };

  return (
    <>
      <div className="min-h-screen w-auto m-8 border border-black grow rounded-xl overflow-hidden p-8 ">
        <h1 className="text-2xl font-semibold text-center p-2 rounded-xl bg-slate-900 text-white shadow-lg">
          Register New Voter
        </h1>
        <form
          ref={addVoterForm}
          className="flex flex-wrap gap-4 text-black item-center font-Mukta my-6 "
        >
          {/* Left */}
          <div className="w-2/5  flex flex-col items-center justify-between gap-6 py-4 mx-auto ">
            {/* Profile Image */}
            <div className="aspect-square bg-slate-300 rounded-xl h-56  border border-black shadow-lg overflow-hidden">
              {voterData.profile ? (
                <img
                  src={URL.createObjectURL(voterData.profile)}
                  alt="Profile Preview"
                />
              ) : (
                ""
              )}
            </div>
            {/* Profile Upload */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                htmlFor="file_input"
              >
                Choose profile photo
              </label>
              <input
                id="profileInput"
                type="file"
                name="profile"
                accept="image/x-png,image/jpg,image/jpeg"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 "
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Fingerprint Upload */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                htmlFor="file_input"
              >
                Select Fingerprints
              </label>
              <input
                id="fingerprintInput"
                type="file"
                name="fingerprints"
                accept="image/BMP,image/bmp"
                onChange={handleInputChange}
                multiple
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 "
              />
            </div>
          </div>
          {/* Right */}
          <form className="text-black grow">
            {/* Name */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="name"
                id="name"
                value={voterData.name}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>
            {/* Contact Number */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="phone"
                id="phone"
                value={voterData.phone}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
            {/* email */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={voterData.email}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
            </div>
            {/* Wallet */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="walletId"
                id="walletId"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={voterData.walletId}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="walletId"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Wallet ID
              </label>
            </div>
            {/* /Date */}
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="file_input"
            >
              Choose Data of Birth
            </label>

            <input
              name="dob"
              type="date"
              value={voterData.dob}
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  "
              placeholder="Select date"
              onChange={handleInputChange}
            />

            {/* Address */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="add1"
                  id="add1"
                  value={voterData.add1}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="add1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address Lane 1
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="add2"
                  id="add2"
                  value={voterData.add2}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="add2"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address Lane 2
                </label>
              </div>
            </div>
            {/* City */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={voterData.city}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="city"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  City
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="pin"
                  id="pin"
                  value={voterData.pin}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="pin"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Pin Code
                </label>
              </div>
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
              id="states"
              value={voterData.state}
              onChange={handleInputChange}
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled>
                Choose a state
              </option>
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
          </form>
        </form>
        {/* buttons */}
        {/* Reset */}
        <div className="w-2/3 mx-auto gap-6 flex items-center justify-center">
          <button
            type="submit"
            className="w-1/2 mx-auto shadow-xl text-white text-lg bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-5 py-2.5"
          >
            <p className="h-6 my-auto flex items-center justify-center">
              Reset
            </p>
          </button>
          {/* Register */}
          {!loading ? (
            <button
              type="submit"
              className="w-1/2 mx-auto shadow-xl text-white text-lg bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-5 py-2.5"
            >
              <p className="h-6 my-auto flex items-center justify-center">
                Register
              </p>
            </button>
          ) : (
            <button
              type="button"
              className="w-1/2 mx-auto shadow-xl cursor-not-allowed text-white text-lg bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-5 py-2.5"
              disabled
            >
              <img
                className="mx-auto h-6"
                width="40"
                height="40"
                src={Loader}
                alt="Loading...."
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddVoter;
