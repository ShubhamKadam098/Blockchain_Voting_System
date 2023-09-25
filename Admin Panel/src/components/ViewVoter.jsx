import React, { useEffect, useState, useCallback } from "react";
import "../styles/popup.css";
import "../styles/viewVoter.css";
import NoImageFound from "../assets/NoImageFound.png";

const ViewVoter = () => {
  const initialVoterState = {
    name: "",
    age: 0,
    aadharNumber: "",
    pin: null,
    city: "",
    profile: NoImageFound,
  };

  const [voter, setVoter] = useState(initialVoterState);

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

  const getVoterProfile = async () => {};

  useEffect(() => {
    getVoterDetails();
  }, [getVoterDetails]);

  return (
    <div className="popup">
      <div className="popup-content">
        <section className="viewVoter">
          <button className="btn backBtn">
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
};

export default ViewVoter;
