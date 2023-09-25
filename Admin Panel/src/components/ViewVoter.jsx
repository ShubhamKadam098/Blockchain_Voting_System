import React from "react";
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
