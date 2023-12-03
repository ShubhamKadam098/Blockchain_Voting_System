import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../../Context/UserContext";

export default function PrivateRoute({ path, element }) {
  const { currentUser } = useUser();

  return currentUser.isValid ||
    currentUser.walletId != "N/A" ||
    currentUser.aadharNumber != "N/A" ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
}
