import React, { useState, useEffect, createElement } from "react";
import "./styles/style.css";
import Navbar from "./Navbar.jsx";
import LoginSection from "./LoginSection";
import Overlay from "./Overlay";
import ErrorSection from "./ErrorSection";

function App() {
  let errors = [];

  const [isActive, setIsActive] = useState("");
  const [overlay, setOverlay] = useState("");

  // Validate the input to allow only numbers

  function addLoadingOverlay() {
    setOverlay("add");
  }
  function removeLoadingOverlay() {
    setOverlay("");
  }

  function activateError(error) {
    const errorList = document.querySelectorAll("#errorList");
    const li = document.createElement("li");
    li.innerText = error;
    setIsActive("active");
    errorList.addChild(li);
    setTimeout(deactivateError(), 3000);
  }
  function deactivateError() {
    setIsActive("");
  }

  return (
    <>
      <Navbar></Navbar>
      <LoginSection></LoginSection>
      {/* <Overlay></Overlay> */}
      {/* <ErrorSection /> */}
    </>
  );
}

export default App;
