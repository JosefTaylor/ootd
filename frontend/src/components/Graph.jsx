import React, { Component } from "react";
import Plot from 'react-plotly.js';
import API from "../axiosApi";

export default class Graph extends Component {

    render() {
        return (
        <Plot
            data={[{
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            }]}
            layout={{
                autosize: true, 
                title: 'Am I not a very fine plot?'
            }}
            useResizeHandler={true}
            style={{
                width: "100%", Height: "100%"
            }}
        />
        );
  }
}