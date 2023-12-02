import React, { useState } from "react";
import { db, storage } from "../../config/firebase.js";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import NoImageFound from "../../assets/NoImageFound.png";
import { useSearchParams } from "react-router-dom";
import ImageLoading from "../Dummy/ImageLoading.jsx";

const VoterDetails = () => {
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

  const fingerprintList = [];
  const testFingerprintlist = [];
  const [search, setSearch] = useSearchParams({ voterID: "" });
  const voterID = search.get("voterID");
  const [loading, setLoading] = useState(false);

  // Fingerprint elements
  for (let index = 0; index < voterData.fingerprints.length; index++) {
    const element = voterData.fingerprints[index];
    fingerprintList.push(
      <div className="h-[100px] w-[100px] bg-slate-500 rounded-md object-cover  border border-slate-500 overflow-hidden">
        <img className="aspect-square w-full" src={element} alt="" />
      </div>
    );
  }

  // Handle Search Params
  const handleTitle = (event) => {
    setSearch({ voterID: event.target.value });
  };

  // Fetch Voter Demographic Details
  const getVoterDetails = async (voter_id) => {
    if (!voter_id) return;
    const voterRef = doc(db, "Voters", `${voter_id}`);
    try {
      const docSnap = await getDoc(voterRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setVoterData((prevState) => ({
          ...prevState,
          name: data.Name,
          aadharNumber: data.AadharNumber,
          dob: data.DOB,
          phone: data.Phone,
          email: data.Email,
          walletId: data.walletId,
          add1: data.Address1,
          add2: data.Address2,
          city: data.City,
          pin: data.Pin,
          state: data.State,
        }));
        await getVoterProfile(voter_id);
        await getVoterFingerprints(voter_id);
        console.log(voterData);
        console.log(testFingerprintlist);
      } else {
        alert("Voter Does not exist! Please Enter valid details.");
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Voter Profile Image
  const getVoterProfile = async (voter_id) => {
    try {
      const imageRef = ref(storage, `Profile/${voter_id}`);
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) {
        setVoterData((prevState) => ({ ...prevState, profile: imageURL }));
      }
    } catch (error) {
      console.error("Error fetching Profile Image from the database:", error);
      setVoterData((prevState) => ({ ...prevState, profile: NoImageFound }));
      throw error;
    }
  };

  //fetch Voter fingerprints
  async function getVoterFingerprints(voter_id) {
    const listRef = ref(storage, `VoterBiometrics/${voter_id}`);

    const res = await listAll(listRef);

    for (let item of res.items) {
      const url = await getDownloadURL(item);
      testFingerprintlist.push(url);
    }
    setVoterData((prevState) => ({
      ...prevState,
      fingerprints: testFingerprintlist,
    }));
  }

  // Search Button
  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    await getVoterDetails(voterID);
    setLoading(false);
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
          Voter Details
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
                {!voterData.profile ? (
                  <ImageLoading />
                ) : (
                  <img
                    id="voter-image"
                    src={voterData.profile}
                    alt="Profile Image"
                  />
                )}
              </div>
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
                disabled
                value={voterData.name}
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder=""
                />
              </div>
            </div>
            {/* WalletID */}
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
                disabled
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
              disabled
              className="mb-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            {/* Fingerprint */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                htmlFor="file_input"
              >
                Fingerprints
              </label>
              <div className="grid gap-4 mb-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
                {loading
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-[100px] w-[100px] bg-slate-500 rounded-md object-cover border border-slate-500 overflow-hidden"
                      >
                        <ImageLoading />{" "}
                      </div>
                    ))
                  : voterData.fingerprints.map((img, index) => (
                      <div
                        key={index}
                        className="h-[100px] w-[100px] bg-slate-500 rounded-md object-cover border border-slate-500 overflow-hidden"
                      >
                        <img
                          className="aspect-square w-full"
                          src={img}
                          alt=""
                        />
                      </div>
                    ))}
              </div>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default VoterDetails;
