import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { DatabaseProvider } from "./Context/DatabaseContext";
import Dashboard from "../src/components/Pages/Dashboard";
import AddVoter from "../src/components/Pages/AddVoter";
import VoterList from "./components/Pages/VoterList/VoterList";
import VoterDetails from "./components/Pages/VoterDetails";
import UpdateVoter from "./components/Pages/UpdateVoter";
import ElectionResult from "./components/Pages/ElectionResult";
import SignIn from "./components/Login/SignIn";
import Layout from "./Layout";
import Election from "./components/Pages/Election";
import PrivateRoute from "./components/Login/PrivateRoute";
import PageNotFound from "./components/Dummy/PageNotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<PrivateRoute element={<Dashboard />} />} />
          <Route
            path="voterlist"
            element={<PrivateRoute element={<VoterList />} />}
          />
          <Route
            path="add_voter"
            element={<PrivateRoute element={<AddVoter />} />}
          />
          <Route
            path="view_voter"
            element={<PrivateRoute element={<VoterDetails />} />}
          />
          <Route
            path="update_voter"
            element={<PrivateRoute element={<UpdateVoter />} />}
          />
          <Route
            path="election"
            element={<PrivateRoute element={<Election />} />}
          />
          <Route
            path="results"
            element={<PrivateRoute element={<ElectionResult />} />}
          />
        </Route>
        <Route path="login" element={<SignIn />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </>
    )
  );

  return (
    <>
      <AuthProvider>
        <DatabaseProvider>
          <RouterProvider router={router} />
        </DatabaseProvider>
      </AuthProvider>
    </>
  );
}

export default App;
