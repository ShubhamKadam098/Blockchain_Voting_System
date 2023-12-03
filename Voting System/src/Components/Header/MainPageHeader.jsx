import React, { useState } from "react";
import Logo from "./Logo";
import AccountImg from "../../assets/AccountImg.png";
import Logout from "../../assets/Logout.png";
import useUser from "../../Context/UserContext";

const MainPageHeader = () => {
  const { currentUser, logout } = useUser();
  return (
    <div className="py-3 bg-slate-900  text-white border-b border-solid border-white">
      <div className="container flex items-center justify-between">
        <Logo></Logo>
        <div className=" flex items-center justify-center gap-3 h-16">
          {/* Details */}
          <div className="flex flex-col items-end justify-center ">
            <h3 className="text-right font-semibold">{currentUser.name}</h3>
            <h6 className="text-sm text-right font-semibold">
              {currentUser.aadharNumber}
            </h6>
            <h6 className="text-[11px] text-right">{currentUser.walletId}</h6>
          </div>
          {/* Profiles */}
          <div className="h-min flex flex-col items-center justify-center">
            <img src={AccountImg} className="rounded-full grow" alt="" />
            <button
              className="text-xs h-min flex flex-row items-center justify-center"
              onClick={() => {
                logout();
              }}
            >
              Logout
              <img src={Logout} className="h-[20px]" alt="" srcSet="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageHeader;
