import React from "react";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo left">
            <img src="./src/assets/Logo.png" alt="" className="logoImg" />
            <h3 className="logoHeading">Voting 2024</h3>
          </div>
          <div className="right adminDetails">
            <h6 className="adminName">Username</h6>
            <img
              src="./src/assets/accountLogo.svg"
              alt=""
              className="adminImg"
            />
            <button className="btn logoutBtn">
              <img
                src="./src/assets/Logout.png"
                alt="Logout"
                className="logoutImg"
                title="Logout"
              />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
