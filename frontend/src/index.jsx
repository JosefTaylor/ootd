import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Graph, { loader as graphLoader } from "./routes/Graph.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import {
  updateGarmentAction,
  createGarmentAction,
} from "./routes/garmentActions.jsx";
import { LoginPage, LogoutPage } from "./routes/Login.jsx";
import { PasswordChange } from "./routes/PasswordChange.jsx";
import { RequireAuth, AuthProvider } from "./components/Auth.jsx";
import Public from "./routes/Public.jsx";
import Register from "./routes/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Public />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "graphs",
        element: (
          <RequireAuth>
            <Graph />
          </RequireAuth>
        ),
        loader: graphLoader,
      },
      {
        path: "password_change",
        element: (
          <RequireAuth>
            <PasswordChange />
          </RequireAuth>
        ),
      },
      {
        path: "garments/:garmentId/update",
        action: updateGarmentAction,
      },
      {
        path: "garments/create",
        action: createGarmentAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
