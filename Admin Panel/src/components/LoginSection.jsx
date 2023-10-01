import React, { useState } from "react";
import "../../src/styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.js";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  // Reset Login Form
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  // User Login/SignIn
  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser(user.email);
        alert(`You have logged in successfully as : ${user.email}`);
        resetForm();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <div id="mainBody">
      <div className="container">
        <div id="loginSection">
          <form id="loginForm" onSubmit={logIn}>
            <h2 id="loginTitle">Admin Login</h2>
            <div className="Input">
              <label htmlFor="email">Login ID</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="Input">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                id="passwordInput"
                name="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-validation">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
