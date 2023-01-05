import React from "react";
import Plot from "react-plotly.js";

export default function Violin(props) {
  let garmentList = [...props.garmentList];

  garmentList.sort((a, b) => {
    return new Date(b.purchase_date) - new Date(a.purchase_date);
  });

  const data = garmentList.map((garment, index) => {
    const wears = props.wearList.filter((wear) => {
      return wear.garment_id === garment.id;
    });

    const x = wears.map((wear) => new Date(wear.scan_date));

    return {
      type: "violin",
      x: x,
      points: "all",
      name: garment.name,
      showlegend: true,
      line: { width: 0.1 },
      quartilemethod: "linear",
      jitter: 0.5,
      pointpos: 0,
      spanmode: "manual",
      span: [
        new Date(garment.purchase_date),
        new Date(garment.deaq_date ?? Date()),
      ],
      hoverinfo: "name",
    };
  });

  const layout = {
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    colorway: ["red", "orange", "gold", "green", "blue", "indigo", "violet"],
    xaxis: {
      gridcolor: "rgb(127,127,127)",
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
      showgrid: false,
      showline: false,
      showticklabels: false,
      ticks: "",
    },
    margin: {
      l: 40,
      b: 20,
      t: 0,
      r: 0,
    },
    violingap: 0,
    legend: {
      traceorder: "reversed",
    },
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
