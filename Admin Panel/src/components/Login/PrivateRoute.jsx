import { Route, Outlet, Navigate } from "react-router-dom";
import useAuth from "../../Context/AuthContext";

export default function PrivateRoute({ path, element }) {
  const { currentUser } = useAuth();

  return currentUser ? element : <Navigate to="/login" replace />;
}
