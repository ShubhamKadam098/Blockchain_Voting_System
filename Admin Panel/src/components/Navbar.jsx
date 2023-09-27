import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import PropTypes from "prop-types";
import "../styles/navbar.css";

const Navbar = ({ currentUser, setCurrentUser }) => {
  function logOut() {
    signOut(auth)
      .then(() => {
        alert("You Have Signed Out!");
        setCurrentUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo left">
            <img src="./src/assets/Logo.png" alt="" className="logoImg" />
            <h3 className="logoHeading">Voting 2024</h3>
          </div>
          <div className="right adminDetails">
            <h6 className="adminName">{currentUser}</h6>
            <img
              src="./src/assets/accountLogo.svg"
              alt=""
              className="adminImg"
            />
            {currentUser !== null ? (
              <button className="btn logoutBtn" onClick={logOut}>
                <img
                  src="./src/assets/Logout.png"
                  alt="Logout"
                  className="logoutImg"
                  title="Logout"
                />
              </button> // Render Users component when currentUser is not null
            ) : (
              <></> // Render a loading message while currentUser is being fetched
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
