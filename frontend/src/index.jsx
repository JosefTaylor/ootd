import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import { Graph, loader as graphLoader } from "./routes/Graph.jsx";
import Histogram from "./components/HistogramPlot.jsx";
import Violin from "./components/ViolinPlot.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import { LoginPage, LogoutPage } from "./routes/Login.jsx";
import { RequireAuth, AuthProvider } from "./components/Auth.jsx";
import PasswordChange from "./routes/PasswordChange.jsx";
import About from "./routes/About.jsx";
import Register from "./routes/Register.jsx";
import Wardrobe from "./routes/Wardrobe.jsx";
import { Settings, Profile } from "./routes/Profile.jsx";

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
        path: "about",
        element: <About />,
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
      // Dashboard Pages
      {
        path: "",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "wardrobe/:garmentId?",
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
        children: [
          {
            path: "violin",
            element: <Violin />,
            loader: graphLoader,
          },
          {
            path: "histogram",
            element: <Histogram />,
            loader: graphLoader,
          },
        ],
      },
      {
        path: "user",
        element: (
          <RequireAuth>
            <Settings />
          </RequireAuth>
        ),
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "password_change",
            element: <PasswordChange />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
