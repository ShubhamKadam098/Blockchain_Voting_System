import React from "react";
import { useState, useRef } from "react";
import { db, storage } from "../config/firebase.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import "../styles/addVoter.css";

const AddVoter = () => {
  const [voterName, setVoterName] = useState("");
  const [voterAge, setVoterAge] = useState(null);
  const [voterAadharNumber, setVoterAadharNumber] = useState(null);
  const [voterPin, setVoterPin] = useState(null);
  const [voterProfile, setVoterProfile] = useState(null);
  const [voterFingerprint, setVoterFingerprint] = useState(null);
  const addVoterForm = useRef(null);

  const resetForm = () => {
    addVoterForm.current.reset(); // Use the reset method on the form reference
  };

  const addVoter = async (e) => {
    e.preventDefault();
    if (
      voterName == null ||
      voterAge == null ||
      voterAadharNumber == null ||
      voterPin == null ||
      voterProfile == null
    ) {
      alert("All fields are required!");
      return;
    }

    // Database References
    const voterRef = doc(db, "Voters", voterAadharNumber);
    const voterProfileRef = ref(storage, `Profile/${voterAadharNumber}`);
    const docSnapshot = await getDoc(voterRef);

    if (docSnapshot.exists()) {
      // Voter already exists
      alert("Voter already exists, cannot add a duplicate voter.");
      console.log("Document already exists, cannot add a duplicate.");
    } else {
      // Voter doesn't exist. Uploading data to database
      try {
        await setDoc(voterRef, {
          AadharNumber: voterAadharNumber,
          Age: voterAge,
          Name: voterName,
          Pin: voterPin,
        });
      } catch (error) {
        console.error(`Error while add data in database: ${error}`);
        return;
      }
      // Uploading profile image to storage
      try {
        await uploadBytes(voterProfileRef, voterProfile);
      } catch (error) {
        console.log(
          `Error while uploading profile image to database: ${error}`
        );
        return;
      }
      alert("Congratulation! Voter has been added successfully.");
      resetForm();
    }
  };

  return (
    <section id="addVoterSection">
      <div className="container">
        <button className=" btn backBtn">
          <img src="./src/assets/back.png" /> Back
        </button>
        <form id="addVoterForm" ref={addVoterForm} onSubmit={addVoter}>
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
