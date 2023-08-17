import React, { useState } from "react";
import Done from "../Assets/Done.png";

export default function AlreadyVoted() {
  return (
    <div id="alreadyVoted">
      <img id="doneImg" src={Done} alt="Done" />
      <h4 id="doneTitle">You have already Voted.</h4>
    </div>
  );
}
