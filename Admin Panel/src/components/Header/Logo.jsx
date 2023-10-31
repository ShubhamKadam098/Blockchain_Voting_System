import React from "react";
import LogoImg from "../../assets/Logo.jpg";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center justify-center  h-">
      <img className="h-12 rounded-full" src={LogoImg} alt="" />
      <h1 className="font-semibold text-2xl">Election 2024</h1>
    </div>
  );
};

export default Logo;
