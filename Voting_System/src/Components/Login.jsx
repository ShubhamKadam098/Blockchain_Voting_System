import { ethers } from "ethers";
import React, { useState } from "react";

export default function Login(props) {
  return (
    <>
      <h1>Welcome to Election 2024</h1>
      <button
        id="connectWalletBtn"
        className="btn connectbtn"
        onClick={props.connectWallet}
      >
        Login
      </button>
    </>
  );
}