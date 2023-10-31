import React, { useState } from "react";
import Logo from "./Logo";
import Logout from "../../assets/Logout.png";
import useAuth from "../../Context/AuthContext";

const MainPageHeader = () => {
  const [loading, setLoading] = useState(false);
  const { signout } = useAuth();

  async function handleLogout() {
    setLoading(true);
    try {
      if (confirm("Are you sure you want to log out?")) {
        await signout();
        console.log("Logged Out!");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  return (
    <div className="py-3 bg-slate-900  text-white border-b border-solid border-white">
      <div className="container flex items-center justify-between">
        <Logo></Logo>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center justify-center gap-2"
        >
          <h6 className="font-semibold text-base">Logout</h6>
          <img src={Logout} alt="" className="h-6 " />
        </button>
      </div>
    </div>
  );
};

export default MainPageHeader;
