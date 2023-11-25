import React, { useEffect } from "react";
import MainPageHeader from "../Header/MainPageHeader";
import Footer from "../Footer/Footer";
import useUser from "../../context/UserContext";
import CandidateList from "./CandidateList";

const Dashboard = () => {
  const { currentUser, Candidates, error, setError, fetchCandidateList } =
    useUser();

  useEffect(() => {
    fetchCandidateList();
  }, []);

  return (
    <>
      <MainPageHeader />
      {error && (
        <>
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300 "
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Something went wrong!</span> {error}
              .
            </div>
          </div>
        </>
      )}
      <div className="flex items-center justify-between container  text-black font-semibold mt-12">
        <h2 className="text-base">
          City: <span className="">{currentUser.city}</span>
        </h2>
        <h4 className="text-right pr-4">Time Remaining: {RemainingTime}</h4>
      </div>
      <CandidateList Candidates={Candidates} />
      <Footer />
    </>
  );
};

export default Dashboard;
