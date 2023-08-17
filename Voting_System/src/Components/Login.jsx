import React from "react";

export default function Login(props) {
  return (
    <div className="loginWrapper">
      <div className="loginSection">
        <h1>Welcome to Election 2024</h1>
        <button
          id="connectWalletBtn"
          className="btn connectbtn"
          onClick={props.connectWallet}
        >
          Login
        </button>
      </div>
    </div>
  );
}
