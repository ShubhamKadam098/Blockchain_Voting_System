import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "./Constant/constants.js";
import Login from "./Components/login.jsx";
import Connected from "./Components/Connected.jsx";
import { parseTransaction } from "ethers/lib/utils.js";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(false);
  const [RemainingTime, setRemainingTime] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState("");

  // Connect to metamask wallet
  async function connectWallet() {
    if (!window.ethereum) {
      console.error("Metamask Is Not Detected");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Defining actions after account is changed
  useEffect(() => {
    fetchCandidates();
    fetchCurrentStatus();
    fetchRemainingTime();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  });

  // Handling Account Changes
  function handleAccountsChanged(accounts) {
    console.log("Account is changed");
    if (accounts.length > 0 && account != accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  // Fetching Current Status of the Contract
  async function fetchCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const status = await contract.getVotingStatus();
    setVotingStatus(status);
  }
  // Getting Remaining Time
  async function fetchRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const time = await contract.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  // Fetching Candidate Information
  async function fetchCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const candidatesList = contract.getAllVotesOfCandiates();
    const formatedList = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber(),
      };
    });
    setCandidates(formatedList);
  }

  // Handle input number change
  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <>
      {isConnected ? (
        <Connected
          accountNumber={account}
          candidates={candidates}
          RemainingTime={RemainingTime}
          number={number}
          handleNumberChange={handleNumberChange}
        />
      ) : (
        <Login connectWallet={connectWallet} />
      )}
    </>
  );
}

export default App;
