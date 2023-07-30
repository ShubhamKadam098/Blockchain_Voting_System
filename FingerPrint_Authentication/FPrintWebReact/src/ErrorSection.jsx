// import props, { useState } from "react";

export default function ErrorSection(errorMessage) {
  // const [error, setError] = useState();
  return (
    <>
      <div
        id="errorSection"
        // className={isActive}
      >
        <ul id="errorList"></ul>
        console.log({errorMessage ? { errorMessage } : null})
      </div>
    </>
  );
}
