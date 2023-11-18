import React, { useContext, useState } from "react";
import { ethers } from "ethers";

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

  const value = {
    currentUser,
    connectMetamask,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
