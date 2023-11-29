import React from "react";
import { Outlet } from "react-router-dom";
import MainPageHeader from "./components/Header/MainHeader";
import Footer from "./components/Footer/Footer";
import UserID from "./components/Sidebar/UseID";
import Navbar from "./components/Sidebar/Navbar";

const Layout = () => {
  return (
    <>
      <MainPageHeader />
      <div className="flex ">
        <div className="min-h-screen w-1/4 bg-slate-900">
          <div className="flex flex-col gap-6  ">
            <UserID />
            <Navbar />
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
