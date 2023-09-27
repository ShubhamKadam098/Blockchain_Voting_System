import { useEffect, useState } from "react";
import LoginSection from "./components/LoginSection.jsx";
import Main from "./components/MainPage.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles/main.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedViewVoter, setSelectedViewVoter] = useState(null);
  const [selectedUpdateVoter, setSelectedUpdateVoter] = useState(null);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {currentUser ? (
        <Main
          selectedViewVoter={selectedViewVoter}
          setSelectedViewVoter={setSelectedViewVoter}
          selectedUpdateVoter={selectedUpdateVoter}
          setSelectedUpdateVoter={setSelectedUpdateVoter}
        />
      ) : (
        <LoginSection
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </>
  );
}

export default App;
