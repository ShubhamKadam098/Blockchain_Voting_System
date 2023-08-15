import React, { useState } from "react";
import loading from "../Assets/loading.svg";

export default function Loading() {
  return (
    <div class="loadingOverlay">
      <div class="loadingSection">
        <div class="loader">
          <img src={loading} alt="" />
        </div>
        <p class="loadingText">Authenticating the details</p>
      </div>
    </div>
  );
}
