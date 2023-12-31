import { useEffect } from "react";
import MainPageHeader from "../Header/MainPageHeader";
import Footer from "../Footer/Footer";
import CandidateList from "./CandidateList";
import useUser from "../../Context/UserContext";
import VotingOver from "./VotingOver";

const Dashboard = () => {
  const {
    currentUser,
    RemainingTime,
    fetchRemainingTime,
    fetchCandidateList,
    Candidates,
    canVote,
    error,
  } = useUser();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  useEffect(() => {
    fetchRemainingTime();
    canVote();
    fetchCandidateList();
  }, []);

  useEffect(() => {
    console.log("Candidates:" + Candidates);
    console.log(Candidates);
  }, [Candidates]);

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
        <h4 className="text-right pr-4">
          Time Remaining: {formatTime(RemainingTime)}
        </h4>
      </div>
      {RemainingTime > 0 ? (
        <CandidateList Candidates={Candidates} />
      ) : (
        <VotingOver />
      )}

      <Footer />
    </>
  );
};

export default Dashboard;
