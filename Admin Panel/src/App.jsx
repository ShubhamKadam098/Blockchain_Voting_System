import { useState } from "react";
import LoginSection from "./components/LoginSection";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import VoterListSection from "./components/VoterListSection";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <LoginSection></LoginSection>
      <VoterListSection></VoterListSection>
    </>
  );
}

export default App;
