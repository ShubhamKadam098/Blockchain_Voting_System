import { useState } from "react";
import ErrorSection from "./ErrorSection";

export default function LoginSection() {
  const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const validateInput = (event) => {
    // Regular expression to match only numeric values
    const numericRegex = /^[0-9]*$/;
    const value = event.target.value;

    // If the input matches the numeric pattern or is an empty string, update the state
    if (numericRegex.test(value) || value === "") {
      setInputValue(value);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  function getError(err) {
    setInterval(() => {
      console.log(err);
    }, 10000);
  }

  const fetchData = (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    // addLoadingOverlay();
    const fileInput = document.getElementsByName("fingerInput")[0].files[0];
    const aadharNumber = document.getElementById("aadharNumber").value;

    if (fileInput == null || aadharNumber == null) {
      ErrorSection("All the inputs are required");
      //   removeLoadingOverlay();
      return;
    }

    // Adding Form Data
    const formData = new FormData();
    formData.append("aadharNumber", aadharNumber);
    formData.append("FPrintImg", fileInput);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/verify", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.Error) {
          ErrorSection(result.Error);
          console.log(result.Error);
        }
        if (result.Score >= 100) console.log("Success");
        alert("Biometric Authentication Done Successfully");
        console.log("Score" + result.Score);
      })
      .catch((error) => {
        ErrorSection(error);
        console.log(error);
      });

    // removeLoadingOverlay();
    return false;
  };
  return (
    <>
      <div id="mainBody">
        <div className="container">
          <div id="loginSection">
            <form id="loginForm" onSubmit={fetchData}>
              <h2 id="login-title">Biometric Verification</h2>
              <div className="Input">
                <label htmlFor="aadharNumber">Aadhar Number</label>
                <input
                  placeholder=" _ _ _ _ _ _ _ _ _ _ _"
                  type="text"
                  inputMode="numeric"
                  name="aadharNumber"
                  id="aadharNumber"
                  className="numericInput"
                  pattern="[0-9]*"
                  maxLength={12}
                  value={inputValue}
                  onChange={validateInput}
                />
              </div>
              <div className="Input">
                <label htmlFor="myFile">Biometrics</label>
                {imagePreview && <img src={imagePreview} id="preImg" alt="" />}
                <input
                  accept="image/bmp, image/BMP"
                  type="file"
                  id="myFile"
                  name="fingerInput"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="btn btn-validation">
                Validate
              </button>
            </form>
            {getError("test")}
          </div>
        </div>
      </div>
    </>
  );
}
