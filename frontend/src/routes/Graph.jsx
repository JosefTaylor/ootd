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
    <Card
      className="side"
      title={
        <div className="splitter">
          <NavLink to={"violin"}>Violin</NavLink>
          <NavLink to={"histogram"}>Histogram</NavLink>
        </div>
      }
    >
      <Outlet />
    </Card>
  );
}
