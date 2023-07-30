// const errorSection = document.querySelector("#errorSection");
// const loadingOverlay = document.querySelector(".loadingOverlay");
const preImg = document.querySelector("#preImg");
const imgInp = document.querySelector("#myFile");
const form = document.querySelector("#loginForm");
const numericInput = document.querySelector("#aadharNumber");

// Fingerprint Image Preview
imgInp.onchange = () => {
  const [file] = imgInp.files;
  if (file) {
    preImg.src = URL.createObjectURL(file);
  }
};

// Utility Funtions

// function activateError() {
//   errorSection.classList.add("active");
// }
// function deactivateError() {
//   errorSection.classList.remove("active");
// }
// function addLoadingOverlay() {
//   loadingOverlay.classList.add("add");
// }
// function removeLoadingOverlay() {
//   loadingOverlay.classList.remove("add");
// }

// form

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const fileInput = document.getElementsByName("fingerInput")[0].files[0];
//   const aadharNumber = numericInput.value;
//   console.log(aadharNumber);

//   const formData = new FormData();
//   formData.append("aadharNumber", aadharNumber);
//   formData.append("FPrintImg", fileInput);

//   try {
//     const response = await fetch("http://127.0.0.1:5000/verify", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Request failed with status ", response.status);
//     }
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// });

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const fileInput = document.getElementsByName("fingerInput")[0].files[0];
//   const aadharNumber = numericInput.value;
//   console.log(aadharNumber);

//   const formData = new FormData();
//   formData.append("aadharNumber", aadharNumber);
//   formData.append("FPrintImg", fileInput);

//   fetch("http://localhost:5000/verify")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// });

// async function sendPostRequest() {
//   const url = "http://localhost:5000/verify";

//   const fileInput = document.getElementsByName("fingerInput")[0].files[0];
//   const aadharNumber = numericInput.value;
//   console.log(aadharNumber);

//   const formData = new FormData();
//   formData.append("aadharNumber", aadharNumber);
//   formData.append("FPrintImg", fileInput);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok.");
//     }

//     const jsonResponse = await response.json();
//     console.log(jsonResponse);
//   } catch (error) {
//     console.error("Error while sending the request:", error);
//   }
// }

// form.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the default form submission behavior

//   // Create a FormData object to send the form data
//   var formData = new FormData(this);

//   // Make a POST request to the API endpoint
//   fetch(this.action, {
//     method: this.method,
//     body: formData,
//   })
//     .then(function (response) {
//       return response.json(); // Parse the response as JSON
//     })
//     .then(function (json) {
//       // Access and use the JSON data as needed
//       console.log(json);
//       // Perform any further processing or display of the JSON data
//     })
//     .catch(function (error) {
//       console.error("Error:", error);
//     });
// });

// form.addEventListener("submit", function (e) {
//   e.preventDefault(); // Prevent the form from submitting normally

//   const fileInput = document.getElementsByName("fingerInput")[0].files[0];
//   const aadharNumber = numericInput.value;
//   console.log(aadharNumber);

//   const formData = new FormData();
//   formData.append("aadharNumber", aadharNumber);
//   formData.append("FPrintImg", fileInput);

//   fetch("http://127.0.0.1:5000/verify", {
//     method: "POST",
//     body: formData,
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data); // The JSON response from the API
//       // Do whatever you want with the JSON data here
//     })
//     .catch(function (error) {
//       console.error("Error:", error);
//     });
// });

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting normally

  const fileInput = document.getElementsByName("fingerInput")[0].files[0];
  const aadharNumber = numericInput.value;
  console.log(aadharNumber);

  const formData = new FormData();
  formData.append("aadharNumber", aadharNumber);
  formData.append("FPrintImg", fileInput);

  var requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:5000/verify", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return false;
});
