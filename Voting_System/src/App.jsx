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
  const [CanVote, setCanVote] = useState(true);

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
        canVote(); // Checking voters elegiblilty
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
      canVote(); // Check if the account is changed then the new account is eligible or not.
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
  // Getting Remaining Time from Contract
  async function fetchRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const time = await contract.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  // Fetching Candidate Information for Contract
  async function fetchCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const candidatesList = await contract.getAllVotesOfCandiates();
    const formattedCandidates = candidatesList.map((candidates, index) => {
      return {
        index: index,
        name: candidates.name,
        voteCount: candidates.voteCount.toNumber(),
      };
    });
    setCandidates(formattedCandidates);
  }

  // Validating if voter is eligible to vote
  async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const voterStatus = await contract.voters(await signer.getAddress());
    setCanVote(voterStatus);
  }

  // Handling input number change
  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  // Sending voting transaction
  async function vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Transaction
    const tx = await contract.vote(number);
    await tx.wait();
    canVote();
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
          vote={vote}
          canVote={CanVote}
        />
      ) : (
        <Login connectWallet={connectWallet} />
      )}
    </>
  );
}

export default App;
