import React, { useState, useEffect } from "react";
import "../styles/voterList.css";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import ViewLogo from "../assets/ViewLogo.png";
import EditLogo from "../assets/EditLogo.png";
import DeleteLogo from "../assets/DeleteLogo.png";
import { db } from "../config/firebase.js";
const IMAGE_PATH_PREFIX = "./src/assets/";

export default function VoterListSection({
  setSelectedViewVoter,
  setSelectedUpdateVoter,
}) {
  const [voterList, setVoterList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Database collection Reference
  const voterCollectionRef = collection(db, "Voters");

  // Fetch Voters List
  const getVoters = async () => {
    try {
      const data = await getDocs(voterCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setVoterList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered voter list based on searchInput
  const filteredVoterList = voterList.filter((voter) =>
    String(voter.AadharNumber).includes(searchInput)
  );

  // Remove Voter
  const removeVoter = async (id) => {
    if (!window.confirm("Are you sure you want to delete the voter?")) {
      console.log("Operation Cancelled");
      return;
    }
    try {
      const voterDoc = doc(db, "Voters", id);
      await deleteDoc(voterDoc);
      // After deletion, update the list of voters
      getVoters();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVoters();
  }, []);

  return (
    <div id="voterSection">
      <div className="container">
        <div className="voterHeading">
          <h3 className="voterHeading">Voter List</h3>
          <button className="btn voterAddBtn blue">
            <div className="">
              <img src={`${IMAGE_PATH_PREFIX}AddPeopleLogo.png`} alt="" />{" "}
              <p>Add Voter</p>
            </div>
          </button>
        </div>

        <div className="voterTable">
          <div className="voterNav">
            <input
              type="text"
              className="searchInput"
              placeholder="Search the Voter"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn refreshBtn orange" onClick={getVoters}>
              <img
                src={`${IMAGE_PATH_PREFIX}Refresh.png`}
                alt=""
                className="refreshImg"
              />{" "}
              &nbsp;Refresh
            </button>
          </div>
          <ul className="voterList">
            {voterList.map((voter) => (
              <li className="voterListItem" key={voter.AadharNumber}>
                <h5 className="voterId">{voter.AadharNumber}</h5>
                <h5 className="voterName">{voter.Name}</h5>
                <div className="voterItemBtn">
                  <button
                    className="btn voterViewBtn"
                    onClick={() => setSelectedViewVoter(voter.AadharNumber)}
                  >
                    <img src={ViewLogo} alt="" className="viewLogo" />
                    View
                  </button>
                  <button
                    className="btn voterUpdateBtn"
                    onClick={() => setSelectedUpdateVoter(voter.AadharNumber)}
                  >
                    <img src={EditLogo} alt="" />
                    Update
                  </button>
                  <button
                    className="btn voterDelBtn"
                    onClick={() => removeVoter(voter.id)}
                  >
                    <img src={DeleteLogo} alt="" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
