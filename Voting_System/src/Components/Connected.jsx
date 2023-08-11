import { ethers } from "ethers";
import React, { useState } from "react";

export default function Connected(props) {
  return (
    <>
      <div className="container">
        <h1>You Are Connected to Metamask</h1>
        <p>Account Number: {props.accountNumber}</p>
      </div>
    </>
  );
}
