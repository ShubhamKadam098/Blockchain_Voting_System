import React, { useState, useEffect } from "react";
import "../styles/voterList.css";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../config/firebase.js";

export default function VoterListSection() {
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

  useEffect(() => {
    getVoters();
  }, []);

  return (
    <section id="voterSection">
      <div className="container">
        <div className="voterHeading">
          <h3 className="voterHeading">Voter List</h3>
          <button className="btn voterAddBtn blue">
            <div className="">
              <img src="./src/assets/AddPeopleLogo.png" alt="" />{" "}
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
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <button className="btn refreshBtn orange" onClick={getVoters}>
              <img
                src="./src/assets/Refresh.png"
                alt=""
                className="refreshImg"
              />{" "}
              &nbsp;Refresh
            </button>
          </div>
          <ul className="voterList">
            {voterList != "" ? (
              voterList.map((voter) => (
                <li className="voterListItem" key={voter.AadharNumber}>
                  <h5 className="voterId">{voter.AadharNumber}</h5>
                  <h5 className="voterName">{voter.Name}</h5>
                  <div className="voterItemBtn">
                    <button className="btn voterViewBtn">
                      <img
                        src="./src/assets/ViewLogo.png"
                        className="viewLogo"
                      />
                      View
                    </button>
                    <button className="btn voterUpdateBtn">
                      <img src="./src/assets/EditLogo.png" alt="" />
                      Update
                    </button>
                    <button className="btn voterDelBtn">
                      <img src="./src/assets/DeleteLogo.png" alt="" />
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <>
                <h3 className="noVoterHeading">No Voters Found!!</h3>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
