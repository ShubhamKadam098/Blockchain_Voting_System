import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../Constant/constants.js";
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
  const [Candidates, setCandidates] = useState([]);
  const [RemainingTime, setRemainingTime] = useState("");

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

  // Account Changed
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        console.log("Accounts changed:", accounts);
        if (accounts.length > 0 && accounts[0] !== currentUser.walletId) {
          console.log("Account is Changed");
          setCurrentUser((prev) => ({ ...prev, walletId: accounts[0] }));
          setCurrentUser({
            name: "N/A",
            aadharNumber: "N/A",
            city: "N/A",
            walletId: "N/A",
            profile: "N/A",
            isVoted: false,
            isValid: false,
          });
        } else {
          console.log("No Account is found");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, [currentUser.walletId]);

  // Fetching Candidate Information for Contract
  async function fetchCandidateList() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const candidatesList = await contract.getAllVotesOfCandidates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          city: candidate.city,
          party: candidate.partyName,
          voteCount: candidate.voteCount.toNumber(),
        };
      });
      setCandidates(formattedCandidates);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  async function fetchRemainingTime() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const time = await contract.getRemainingTime();
      setRemainingTime(parseInt(time, 16));
    } catch (error) {
      setError(error.message);
    }
  }

  // Validating if voter is eligible to vote
  async function canVote() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const voterStatus = await contract.voters(await signer.getAddress());
      console.log("Voting status: " + voterStatus);
      setCurrentUser((prev) => {
        return {
          ...prev,
          isVoted: voterStatus,
        };
      });
    } catch (error) {
      setError(error.message);
    }
  }

  // Sending voting transaction
  async function vote(candidateId) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Transaction
      const tx = await contract.vote(candidateId);
      await tx.wait();
    } catch (error) {
      setError(error.message);
    } finally {
      canVote();
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

  async function logout() {
    try {
      if (confirm("Are you sure you want to log out?")) {
        setCurrentUser({
          name: "N/A",
          aadharNumber: "N/A",
          city: "N/A",
          walletId: "N/A",
          profile: "N/A",
          isVoted: false,
          isValid: false,
        });
        console.log("Logged Out!");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const value = {
    currentUser,
    Candidates,
    error,
    connectMetamask,
    fetchVoterDetails,
    authFingerprint,
    fetchCandidateList,
    RemainingTime,
    fetchRemainingTime,
    canVote,
    vote,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
