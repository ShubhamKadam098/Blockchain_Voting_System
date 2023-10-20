import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Dashboard from "../src/components/Pages/Dashboard";
import AddVoter from "../src/components/Pages/AddVoter";
import VoterList from "./components/Pages/VoterList/VoterList";
import VoterDetails from "./components/Pages/VoterDetails";
import UpdateVoter from "./components/Pages/UpdateVoter";
import ElectionResult from "./components/Pages/ElectionResult";
import SignIn from "./components/Login/SignIn";
import Layout from "./Layout";
import Election from "./components/Pages/Election";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="voterlist" element={<VoterList />} />
          <Route path="add_voter" element={<AddVoter />} />
          <Route path="view_voter" element={<VoterDetails />} />
          <Route path="update_voter" element={<UpdateVoter />} />
          <Route path="election" element={<Election />} />
          <Route path="results" element={<ElectionResult />} />
        </Route>
        <Route path="login" element={<SignIn />}></Route>
      </>
    )
  );

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
