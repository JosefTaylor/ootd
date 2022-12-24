import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import './index.css';
import Root, { loader as rootLoader } from './routes/Root.jsx'
import ErrorPage from './routes/ErrorPage.jsx';
import Graph, { loader as graphLoader } from './routes/Graph.jsx';
import Dashboard, { loader as dashboardLoader } from './routes/Dashboard.jsx';
import { updateGarmentAction, createGarmentAction } from './routes/garmentActions.jsx';
import Login from './routes/Login.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        children: [
            {
                path: "login",
                element: <Login />,
            },
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
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);