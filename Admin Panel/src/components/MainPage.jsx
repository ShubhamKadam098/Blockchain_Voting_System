import VoterListSection from "./VoterListSection.jsx";
import AddVoter from "./AddVoter.jsx";
import ViewVoter from "./ViewVoter.jsx";

const MainPage = ({
  selectedViewVoter,
  setSelectedViewVoter,
  selectedUpdateVoter,
  setSelectedUpdateVoter,
}) => {
  return (
    <>
      <VoterListSection
        setSelectedViewVoter={setSelectedViewVoter}
        setSelectedUpdateVoter={setSelectedUpdateVoter}
      ></VoterListSection>
      <AddVoter></AddVoter>
      {selectedViewVoter !== null && (
        <ViewVoter
          selectedViewVoter={selectedViewVoter}
          setSelectedViewVoter={setSelectedViewVoter}
        ></ViewVoter>
      )}
      {selectedUpdateVoter !== null && (
        <UpdateVoter
          selectedUpdateVoter={selectedUpdateVoter}
          setSelectedUpdateVoter={setSelectedUpdateVoter}
        ></UpdateVoter>
      )}
    </>
  );
};

export default MainPage;
