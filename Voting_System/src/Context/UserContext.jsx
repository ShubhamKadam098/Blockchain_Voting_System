import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config/Firebase.js";
const UserContext = React.createContext();

export default function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: "N/A",
    aadharNumber: "N/A",
    city: "N/A",
    walletId: "N/A",
    profile: "N/A",
    isVoted: false,
    isValid: false,
  });
  const [error, setError] = useState("");
  const [provider, setProvider] = useState(null);

  // Deleting error after delay
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 8000);
  }, [error]);

  // Connect to metamask wallet
  async function connectMetamask() {
    if (!window.ethereum) {
      setError("Metamask not detected");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setCurrentUser((prev) => {
          return { ...prev, walletId: address };
        });
      } catch (err) {
        setError(err.message);
      }
    }
  }

  // Firebase Operation

  // Get Voter Details
  async function fetchVoterDetails() {
    if (!currentUser.walletId) return;
    console.log("Fetching Voter Details for: " + currentUser.walletId);
    try {
      const votersRef = collection(db, "Voters");
      const q = query(votersRef, where("walletId", "==", currentUser.walletId));
      const querySnapshot = await getDocs(q);
      let documentFound = false;

      querySnapshot.forEach((doc) => {
        documentFound = true;

        const data = doc.data();
        console.log(data);
        setCurrentUser((prev) => {
          return {
            ...prev,
            aadharNumber: data.AadharNumber,
            name: data.Name,
            city: data.City,
          };
        });
      });

      if (documentFound == false) {
        setError("Aadhar details were not found for this wallet!");
        setCurrentUser((prev) => {
          return {
            ...prev,
            walletId: "N/A",
          };
        });
        return;
      }
    } catch (error) {
      setError(error.message);
    }
  }

  // Fingerprint Authentication
  async function authFingerprint(Fingerprint) {
    return new Promise((resolve, reject) => {
      if (
        Fingerprint == null ||
        currentUser.aadharNumber == null ||
        currentUser.walletId == null
      ) {
        setError("All fields are required");
        reject("Required fields are missing");
      } else {
        console.log("Authenticating Fingerprint");

        // Adding Form Data
        const formData = new FormData();
        formData.append("aadharNumber", currentUser.aadharNumber);
        formData.append("FPrintImg", Fingerprint);

        const requestOptions = {
          method: "POST",
          body: formData,
          redirect: "follow",
        };

        fetch("http://127.0.0.1:5000/verify", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.Error) {
              console.log(result.Error);
            }
            console.log(result.isValid);
            setCurrentUser((prev) => {
              return { ...prev, isValid: result.isValid };
            });
            console.log("Score: " + result.Score);
            console.log(currentUser);
            !result.isValid ? setError("Authentication Failed!") : "";
            resolve();
          })
          .catch((error) => {
            setError(error.message);
            reject(error);
          });
      }
    });
  }

  const value = {
    currentUser,
    error,
    connectMetamask,
    fetchVoterDetails,
    authFingerprint,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}