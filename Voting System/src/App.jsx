import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Login from "./components/Login/Login";
import { UserProvider } from "./Context/UserContext";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/Login/PrivateRoute";
import PageNotFound from "./Components/Dummy/PageNotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
