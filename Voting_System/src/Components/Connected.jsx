import { ethers } from "ethers";
import React, { useState } from "react";

export default function Connected(props) {
  return (
    <>
      <div className="container">
        <h1>You Are Connected to Metamask</h1>
        <p>Account Number: {props.accountNumber}</p>
        <p> Remaining Time: {props.RemainingTime}</p>
        {canVote ? (
          <p>You have Already Voted</p>
        ) : (
          <div className="">
            <input
              type="number"
              placeholder="Entern Candidate Index"
              value={props.number}
              onChange={props.handleNumberChange}
            ></input>
            <button className="login-button" onChange={props.vote}>
              Vote
            </button>
          </div>
        )}
        <table id="myTable" className="candidates-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Candidate name</th>
              <th>Candidate votes</th>
            </tr>
          </thead>
          <tbody>
            {props.candidates.map((candidate, index) => (
              <tr key={index}>
                <td>{candidate.index}</td>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
