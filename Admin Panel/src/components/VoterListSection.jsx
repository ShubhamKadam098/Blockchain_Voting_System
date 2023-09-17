import React, { useState } from "react";

export default function VoterListSection() {
  const [voterList, setVoterList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
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
            <button className="btn refreshBtn orange">
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
