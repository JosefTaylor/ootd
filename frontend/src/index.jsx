import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Graph, { loader as graphLoader } from "./routes/Graph.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import { LoginPage, LogoutPage } from "./routes/Login.jsx";
import { RequireAuth, AuthProvider } from "./components/Auth.jsx";
import PasswordChange from "./routes/PasswordChange.jsx";
import Public from "./routes/Public.jsx";
import Register from "./routes/Register.jsx";
import Wardrobe from "./routes/Wardrobe.jsx";

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
      // Index Page
      {
        path: "/",
        element: <Public />,
      },
      // Login and Auth Pages
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
        path: "password_change",
        element: (
          <RequireAuth>
            <PasswordChange />
          </RequireAuth>
        ),
      },
      // Dashboard Pages
      {
        path: "home",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "wardrobe",
        element: (
          <RequireAuth>
            <Wardrobe />
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
