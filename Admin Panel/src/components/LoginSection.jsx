import React, { useState } from "react";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div id="mainBody">
      <div className="container">
        <div id="loginSection">
          <form id="loginForm" onSubmit={logIn}>
            <h2 id="login-title">Admin Login</h2>
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
