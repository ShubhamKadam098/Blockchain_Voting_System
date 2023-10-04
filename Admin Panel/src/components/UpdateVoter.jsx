import React from "react";

const UpdateVoter = ({ selectedUpdateVoter, setSelectedUpdateVoter }) => {
  const initialVoterState = {
    name: "",
    age: "",
    aadharNumber: "",
    pin: "",
    city: "",
    profile: NoImageFound,
    confirm: false,
  };

  const [voter, setVoter] = useState(initialVoterState);

  const handleYesClick = () => {
    setVoter((prevState) => ({ ...prevState, confirm: true }));
  };

  const handleNoClick = () => {
    setVoter((prevState) => ({ ...prevState, confirm: false }));
  };

  const getVoterProfile = async (voterID) => {
    try {
      const imageRef = ref(storage, `Profile/${voterID}`);
      const imageURL = await getDownloadURL(imageRef);
      setVoter((prevState) => ({ ...prevState, profile: imageURL }));
    } catch (error) {
      console.error("Error fetching Profile Image from the database:", error);
      setVoter((prevState) => ({ ...prevState, profile: NoImageFound }));
      throw error;
    }
  };

  const getVoterDetails = async (voterID) => {
    if (!voterID) return;
    const voterRef = doc(db, "Voters", `${voterID}`);
    try {
      const docSnap = await getDoc(voterRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVoter((prevState) => ({
          ...prevState,
          name: data.Name,
          age: data.Age,
          aadharNumber: selectedUpdateVoter, // Changed from selectedViewVoter
          city: data.City,
          pin: data.Pin,
        }));
        await getVoterProfile(voterID);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateVoterDetails = async () => {
    // Implement the logic to update voter details here
  };

  useEffect(() => {
    getVoterDetails(selectedUpdateVoter);
    setVoter((prevState) => ({ ...prevState, confirm: false }));
  }, [selectedUpdateVoter]);
  return (
    <div className="popup">
      <div className="popup-content">
        <section className="voter-update-section">
          <div className="voter-update-container">
            <button className="back-button btn backBtn" onClick={reset}>
              <img src="./src/assets/back.png" alt="Back" />
              <h5>Back</h5>
            </button>
            <h3 className="update-heading">Update Voter Details</h3>
            <div className="details-wrapper">
              <div className="profile-image">
                <div className="image-container">
                  <img
                    id="voter-image"
                    src={voter.profile}
                    alt="Profile Image"
                  />
                </div>
              </div>
              <div className="voter-details">
                <table className="details-table">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>
                        <input
                          type="text"
                          value={voter.name}
                          onChange={(e) =>
                            setVoter({ ...voter, name: e.target.value })
                          }
                          disabled={!voter.confirm}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Aadhar Number:</td>
                      <td>
                        <input
                          type="text"
                          value={voter.aadharNumber}
                          onChange={(e) =>
                            setVoter({ ...voter, aadharNumber: e.target.value })
                          }
                          disabled={!voter.confirm}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Age:</td>
                      <td>
                        <input
                          type="number"
                          value={voter.age}
                          onChange={(e) =>
                            setVoter({ ...voter, age: e.target.value })
                          }
                          disabled={!voter.confirm}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>City:</td>
                      <td>
                        <input
                          type="text"
                          value={voter.city}
                          onChange={(e) =>
                            setVoter({ ...voter, city: e.target.value })
                          }
                          disabled={!voter.confirm}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Pin:</td>
                      <td>
                        <input
                          type="number"
                          value={voter.pin}
                          onChange={(e) =>
                            setVoter({ ...voter, pin: e.target.value })
                          }
                          disabled={!voter.confirm}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="center-container">
              <div className="confirmation-section">
                {voter.confirm ? (
                  <label className="confirmation-label">
                    Confirm to update the voter details
                  </label>
                ) : (
                  <label className="confirmation-label">
                    Do you want to edit the voter?
                  </label>
                )}
                <div className="confirmation-buttons">
                  {voter.confirm ? (
                    <button
                      className="confirmation-button confirm-button"
                      onClick={updateVoterDetails}
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      className="confirmation-button yes-button"
                      onClick={handleYesClick}
                    >
                      Proceed
                    </button>
                  )}
                  <button
                    className="confirmation-button no-button"
                    onClick={handleNoClick}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateVoter;
