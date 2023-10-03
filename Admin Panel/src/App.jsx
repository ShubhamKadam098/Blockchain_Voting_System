import { useEffect, useState } from "react";
import { auth } from "./config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import LoginSection from "./components/LoginSection.jsx";
import MainPage from "./components/MainPage.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles/main.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedViewVoter, setSelectedViewVoter] = useState(null);
  const [selectedUpdateVoter, setSelectedUpdateVoter] = useState(null);

  // Use Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser(null);
      }
    });

    // Unsubscribe to the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {currentUser ? (
        <MainPage
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
