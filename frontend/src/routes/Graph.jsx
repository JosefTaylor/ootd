import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { getDashboardData } from "../ootdApi.jsx";
import Card from "../components/Card.jsx";

export async function loader() {
  const dashboardData = await getDashboardData();
  return { dashboardData };
}

export function Graph() {
  return (
    <div id="graph-route" className="sidebar">
      <Card className="side">
        <NavLink className="button" to={"violin"}>
          Violin
        </NavLink>
        <NavLink className="button" to={"histogram"}>
          Histogram
        </NavLink>
      </Card>
      <Outlet />
    </div>
  );
}
