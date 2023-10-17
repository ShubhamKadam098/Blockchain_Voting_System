import React from "react";
import AccountImg from "../../assets/AccountImg.png";
import useAuth from "../../Context/AuthContext";

const UserID = () => {
  const { currentUser } = useAuth();
  return (
    <div className="text-white flex flex-wrap w-full p-4 gap-3">
      <div className="">
        <img src={AccountImg} alt="" className="h-24" />
      </div>
      <div className="font-semibold flex flex-col justify-evenly">
        <h4 className="text-lg">Shubham Tanaji Kadam</h4>
        <h6 className="text-sm">Admin</h6>
        <h6 className=" text-sm">
          User ID: {currentUser ? currentUser.email : "No user"}
        </h6>
      </div>
    </div>
  );
};

export default UserID;
