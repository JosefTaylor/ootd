import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./index.css";
import Root, { loader as rootLoader } from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Graph, { loader as graphLoader } from "./routes/Graph.jsx";
import Dashboard, { loader as dashboardLoader } from "./routes/Dashboard.jsx";
import {
  updateGarmentAction,
  createGarmentAction,
} from "./routes/garmentActions.jsx";
import { LoginPage, RequireAuth, LogoutPage } from "./routes/Login.jsx";
import Public from "./routes/Public.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
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
        path: "user",
        element: <RequireAuth><Outlet/></RequireAuth>,
        children: [
            {
              path: "home",
              element: <Dashboard />,
              loader: dashboardLoader,
            },
            {
              path: "graphs",
              element: <Graph />,
              loader: graphLoader,
            },
            {
              path: "selfie",
            },
            {
              path: "garments/:garmentId/update",
              action: updateGarmentAction,
            },
            {
              path: "garments/create",
              action: createGarmentAction,
            },
            {
                path: "logout",
                element: <LogoutPage />,
            }
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
