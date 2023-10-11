import React, { children, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Checking for current user if any
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sign Up
  async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  // Sign In
  async function signin(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  // Sign Out
  async function signout() {
    await signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
