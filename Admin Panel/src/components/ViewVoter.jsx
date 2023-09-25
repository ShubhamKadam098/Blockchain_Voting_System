import React, { useEffect, useState, useCallback } from "react";
import "../styles/popup.css";
import "../styles/viewVoter.css";
import NoImageFound from "../assets/NoImageFound.png";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase.js";

function ViewVoterPopup({ selectedViewVoter, setSelectedViewVoter }) {
  const initialVoterState = {
    name: "",
    age: 0,
    aadharNumber: "",
    pin: null,
    city: "",
    profile: NoImageFound,
  };

  const [voter, setVoter] = useState(initialVoterState);

  const reset = () => {
    setVoter(initialVoterState);
    setSelectedViewVoter(null);
  };

  const getVoterDetails = useCallback(async () => {
    if (!selectedViewVoter) return;
    const voterRef = doc(db, "Voters", `${selectedViewVoter}`);

    try {
      const docSnap = await getDoc(voterRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setVoter((prevVoter) => ({
          ...prevVoter,
          name: data.Name,
          age: data.Age,
          aadharNumber: selectedViewVoter,
          city: data.City,
          pin: data.Pin,
        }));

        getVoterProfile();
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedViewVoter]);

  const getVoterProfile = async () => {
    try {
      const imageRef = ref(storage, `Profile/${selectedViewVoter}`);
      const imageURL = await getDownloadURL(imageRef);
      setVoter((prevVoter) => ({ ...prevVoter, profile: imageURL }));
    } catch (error) {
      console.error("Error fetching Profile Image from database:", error);
      setVoter((prevVoter) => ({ ...prevVoter, profile: NoImageFound }));
    }
  };

  useEffect(() => {
    getVoterDetails();
  }, [getVoterDetails]);

  return (
    <div className="popup">
      <div className="popup-content">
        <section className="viewVoter">
          <button className="btn backBtn" onClick={reset}>
            <img src="./src/assets/back.png" alt="Back" /> Back
          </button>
          <h3 className="viewVoterHeading">Voter Details</h3>
          <div className="cardWrapper">
            <div className="profileContainer">
              <img id="voterImg" src={voter.profile} alt="Profile Image" />
            </div>
            <div className="voterDetails">
              <h5 id="voterName">Name: {voter.name}</h5>
              <h5 id="voterAadharNumber">
                Aadhar Number: {voter.aadharNumber}
              </h5>
              <h5 id="voterAge">Age: {voter.age}</h5>
              <h5 id="voterCity">City: {voter.city}</h5>
              <h5 id="voterPin">Pin: {voter.pin}</h5>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewVoterPopup;
