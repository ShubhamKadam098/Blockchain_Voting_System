import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "./Constant/constants.js";
import Login from "./Components/login.jsx";
import Connected from "./Components/Connected.jsx";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Connect to metamask wallet
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        cconsole.log("Metamask Is connected to :  " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask Is Not Detected");
    }
  }

  // Defining actions after account is changed
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountChanged", handleAccountChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountChanged", handleAccountChanged);
      }
    };
  });

  // Handling Account Changes
  function handleAccountChanged(accounts) {
    if (accounts.length > 0 && account != accounts[0]) {
      setAccount[accounts[0]];
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  return (
    <>
      <h1>Hello World !</h1>
      {isConnected ? (
        <Connected accountNumber={account} />
      ) : (
        <Login connectWallet={connectWallet} />
      )}
    </>
  );
}

export default App;
