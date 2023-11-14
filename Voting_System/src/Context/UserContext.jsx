import React, { useContext, useState } from "react";

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

  const value = {
    currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
