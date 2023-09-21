import React from "react";
import { useState, useRef } from "react";
import { db, storage } from "../config/firebase.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const AddVoter = () => {
  const [voterName, setVoterName] = useState("");
  const [voterAge, setVoterAge] = useState(null);
  const [voterAadharNumber, setVoterAadharNumber] = useState(null);
  const [voterPin, setVoterPin] = useState(null);
  const [voterProfile, setVoterProfile] = useState(null);
  const [voterFingerprint, setVoterFingerprint] = useState(null);
  const addVoterForm = useRef(null);

  return (
    <section id="addVoterSection">
      <div className="container">
        <button className=" btn backBtn">
          <img src="./src/assets/back.png" /> Back
        </button>
        <form id="addVoterForm" ref={addVoterForm}>
          <h3 className="addVoterHeading">Add User</h3>
          <div className="formInput">
            <label htmlFor="name">Name</label>
            <input
              id="nameInput"
              type="text"
              name="name"
              placeholder="&nbsp;Voter's Name"
              onChange={(e) => setVoterName(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="AadharNumber">Aadhar Number</label>
            <input
              id="aadharInput"
              type="text"
              name="AadharNumber"
              placeholder="&nbsp;Voter's Aadhar Number"
              onChange={(e) => setVoterAadharNumber(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="Age">Age:</label>
            <input
              id="ageInput"
              type="number"
              name="Age"
              placeholder="&nbsp;Voter's Age"
              onChange={(e) => setVoterAge(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="Pin">Pin</label>
            <input
              id="pinInput"
              type="number"
              name="Pin"
              placeholder="&nbsp;Voter's Area Pin Code"
              onChange={(e) => setVoterPin(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="Photo">Photo</label>
            <input
              id="profileInput"
              type="file"
              name="Photo"
              onChange={(e) => {
                setVoterProfile(e.target.files[0]);
              }}
            />
          </div>
          <div className="formInput">
            <label htmlFor="Fingerprint">Add Fingerprint</label>
            <input
              id="fingerprintInput"
              type="file"
              name="Fingerprint"
              onChange={(e) => {
                setVoterFingerprint(e.target.files);
              }}
            />
          </div>
          <div id="btnSection">
            <button className="btn loginBtn" type="submit">
              Add Voter
            </button>
            <button className="btn loginBtn" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddVoter;
