import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getDashboardData } from "../axiosApi.jsx";
import Violin from "../components/ViolinPlot.jsx";
import Histogram from "../components/HistogramPlot.jsx";
import Card from "../components/Card.jsx";

export async function loader() {
  console.log("in Graph Loader, trying to get some data");
  const dashboardData = await getDashboardData();
  return { dashboardData };
}

export default function Graph() {
  const { dashboardData } = useLoaderData();
  const [page, setPage] = useState("violin");

  let content = [];
  switch (page) {
    case "violin":
      content = (
        <Violin
          garmentList={dashboardData.garments ?? []}
          wearList={dashboardData.garment_wears ?? []}
        />
      );
      break;
    case "histogram":
      content = (
        <Histogram
          garmentList={dashboardData.garments ?? []}
          wearList={dashboardData.garment_wears ?? []}
        />
      );
      break;
    default:
      console.log("I couldn't find a graph called " + page);
      content = [];
  }
  return (
    <div className="sidebar pad-1">
      <Card className="side">
        <div className="stack ht-full">
          <button
            onClick={() => {
              setPage("violin");
            }}
          >
            Violin
          </button>
          <button
            onClick={() => {
              setPage("histogram");
            }}
          >
            Histogram
          </button>
        </div>
      </Card>
      <Card className="content">{content}</Card>
    </div>
  );
}
