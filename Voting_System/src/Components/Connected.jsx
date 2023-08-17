import { ethers } from "ethers";
import React, { useState } from "react";
import Header from "./Header.jsx";
import AlreadyVoted from "./AlreadyVoted.jsx";

export default function Connected(props) {
  return (
    <>
      <Header accountNumber={props.accountNumber}></Header>
      <div className="container">
        <p> Remaining Time: {props.RemainingTime}</p>
        {props.canVote ? (
          <AlreadyVoted></AlreadyVoted>
        ) : (
          <>
            <h1 className="votingHeadline">Vote For Your Candidate</h1>
            <form id="votingInput" className="inputForm">
              <input
                type="number"
                id="voterIndexInput"
                placeholder="Enter the candidate index"
              />
              <button type="submit" id="voteButton" className="btn votebtn">
                Vote
              </button>
            </form>
          </>
        )}
        <div className="candidateListSection">
          <table id="candidateList" className="candidatesTable">
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
                  <td className="indexCol">{candidate.index}</td>
                  <td className="nameCol">{candidate.name}</td>
                  <td className="voteCol">{candidate.voteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
