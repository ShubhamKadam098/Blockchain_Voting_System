import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="font-semibold text-sm text-white px-2 ">
      <ul className="flex flex-col cursor-pointer">
        <li className="border-b border-slate-500  transition ease-in-out duration-150">
          <NavLink
            to="/"
            className={({ isActive }) => {
              const commonClasses =
                "py-4 pl-4 inline-block w-full hover:bg-slate-300 hover:text-black";
              return isActive
                ? ` bg-slate-300 text-black ${commonClasses}`
                : ` ${commonClasses}`;
            }}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="border-b border-slate-500 hover:bg-slate-300 hover:text-black transition ease-in-out duration-150">
          <NavLink
            to="/voterlist"
            className={({ isActive }) => {
              const commonClasses =
                "py-4 pl-4 inline-block w-full hover:bg-slate-300 hover:text-black";
              return isActive
                ? ` bg-slate-300 text-black ${commonClasses}`
                : ` ${commonClasses}`;
            }}
          >
            Voter List
          </NavLink>
        </li>
        <li className="border-b border-slate-500 hover:bg-slate-300 hover:text-black transition ease-in-out duration-150">
          <NavLink
            to="/add_voter"
            className={({ isActive }) => {
              const commonClasses =
                "py-4 pl-4 inline-block w-full hover:bg-slate-300 hover:text-black";
              return isActive
                ? ` bg-slate-300 text-black ${commonClasses}`
                : ` ${commonClasses}`;
            }}
          >
            Add New Voter
          </NavLink>
        </li>
        <li className="border-b border-slate-500 hover:bg-slate-300 hover:text-black transition ease-out duration-150">
          <NavLink
            to="/update_voter"
            className={({ isActive }) => {
              const commonClasses =
                "py-4 pl-4 inline-block w-full hover:bg-slate-300 hover:text-black";
              return isActive
                ? ` bg-slate-300 text-black ${commonClasses}`
                : ` ${commonClasses}`;
            }}
          >
            Update Voter Details
          </NavLink>
        </li>
        <li className="border-b border-slate-500 hover:bg-slate-300 hover:text-black transition ease-in-out duration-150">
          <NavLink
            to="/view_voter"
            className={({ isActive }) => {
              const commonClasses =
                "py-4 pl-4 inline-block w-full hover:bg-slate-300 hover:text-black";
              return isActive
                ? ` bg-slate-300 text-black ${commonClasses}`
                : ` ${commonClasses}`;
            }}
          >
            View Voter Details
          </NavLink>
        </li>
        <li className="border-b border-slate-500 hover:bg-slate-300 hover:text-black transition ease-in-out duration-150">
          <NavLink
            to="/election"
            className={({ isActive }) => {
              const commonClasses =
                "py-4 pl-4 inline-block w-full hover:bg-slate-300 hover:text-black";
              return isActive
                ? ` bg-slate-300 text-black ${commonClasses}`
                : ` ${commonClasses}`;
            }}
          >
            Election
          </NavLink>
        </li>
        <li className="border-b border-slate-500 hover:bg-slate-300 hover:text-black transition ease-in-out duration-150">
          <NavLink
            to="/results"
            className={({ isActive }) => {
              const commonClasses =
                "py-4 pl-4 inline-block w-full hover:bg-slate-300 hover:text-black";
              return isActive
                ? ` bg-slate-300 text-black ${commonClasses}`
                : ` ${commonClasses}`;
            }}
          >
            Election Results
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
