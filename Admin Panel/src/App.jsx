import { useState } from "react";
import LoginSection from "./components/LoginSection";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import VoterListSection from "./components/VoterListSection";
import AddVoter from "./components/AddVoter";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <LoginSection></LoginSection>
      <VoterListSection></VoterListSection>
      <AddVoter></AddVoter>
    </>
  );
}

export default App;
