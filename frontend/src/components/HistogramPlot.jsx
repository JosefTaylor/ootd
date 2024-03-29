import React, { useEffect } from "react";
import Plot from "react-plotly.js";

import { getDashboardData } from "../ootdApi.jsx";
import Card from "./Card.jsx";

export default function Histogram() {
  const [dashboardData, setDashboardData] = React.useState();

  useEffect(() => {
    async function func() {
      const newData = await getDashboardData();
      setDashboardData(newData);
    }
    func();
  }, []);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  const purchaseDateList = dashboardData?.garments.map(
    (garment) => new Date(garment.purchase_date)
  );

  const data = [
    {
      x: purchaseDateList,
      type: "histogram",
      xbins: {
        // start and end work nicely with an ISO date string "YYYY-MM-DD"
        size: "M3",
      },
    },
  ];

  const layout = {
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    colorway: ["rgb(255, 164, 164)"],
    xaxis: {
      gridcolor: "rgb(127,127,127)",
      //range: [new Date("2019-11-01"), new Date("2022-02-01")],
      range: "auto",
      showgrid: true,
      showline: false,
      showticklabels: true,
      tickcolor: "rgb(127,127,127)",
      ticks: "",
      zeroline: false,
    },
    yaxis: {
      gridcolor: "rgb(127,127,127)",
      showgrid: true,
      showline: false,
      showticklabels: true,
      tickcolor: "rgb(127,127,127)",
      ticks: "",
      zeroline: false,
    },
    margin: {
      l: 0,
      b: 20,
      t: 0,
      r: 0,
    },
    bargap: 0.05,
  };

  return (
    <Plot
      data={data}
      layout={layout}
      useResizeHandler={true}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
