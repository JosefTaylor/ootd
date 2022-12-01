import React, { Component } from "react";
import Plot from 'react-plotly.js';
import Header from "../components/Header";

function Sidebar(props) {
    return (
        <div className="stack">
            <button onClick={props.onNav("violin")} >Violin</button>
            <button onClick={props.onNav("histogram")} >Histogram</button>
            <div className="stack data-table">
                <div>Lorem</div>
                <div>ipsum</div>
                <div>dolor</div>
                <div>sit</div>
                <div>Lorem</div>
                <div>ipsum</div>
                <div>dolor</div>
                <div>sit</div>
                <div>Lorem</div>
                <div>ipsum</div>
                <div>dolor</div>
                <div>sit</div>
                <div>Lorem</div>
                <div>ipsum</div>
                <div>dolor</div>
                <div>sit</div>
                <div>Lorem</div>
                <div>ipsum</div>
                <div>dolor</div>
                <div>sit</div>
                <div>Lorem</div>
                <div>ipsum</div>
                <div>dolor</div>
                <div>sit</div>
            </div>
        </div>
        
    )
}

function Violin(props) {
    
    const data = props.garmentList.map(garment => {

        const wears = props.wearList.filter((wear) => wear.garment_id === garment.id)

        const x = wears.map(wear => new Date(wear.scan_date))
        // x.unshift(new Date(garment.purchase_date))
        // if (garment.deaq_date) {
        //     console.log(garment.name + " deaq'd in " + garment.deaq_date)
        //     x.push(new Date(garment.deaq_date))
        // }

        return {
            x: x,
            name: garment.name,
            showlegend: false,
            type: "violin",
            points: 'all',
            line: { visible: false },
            fillcolor: garment.id,
            quartilemethod: 'linear',
            jitter: 0.5,
            pointpos: 0,
            spanmode: "hard",

        };
    })

    const layout = {
        paper_bgcolor: "rgba(0, 0, 0, 0)", //"rgb(255,255,255)",
        plot_bgcolor: "rgba(0, 0, 0, 0)",
        xaxis: {
        gridcolor: "rgb(255,255,255)",
        //range: [new Date("2019-11-01"), new Date("2022-02-01")],
        range: "auto",
        showgrid: true,
        showline: false,
        showticklabels: true,
        tickcolor: "rgb(127,127,127)",
        ticks: "outside",
        zeroline: false
        },
        yaxis: {
        gridcolor: "rgb(255,255,255)",
        showgrid: true,
        showline: false,
        showticklabels: true,
        tickcolor: "rgb(127,127,127)",
        ticks: "outside",
        zeroline: false
        }
    };

    return (
        <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{
            width: "100%", Height: "100%"
        }}
        />
    )
}

function Histogram(props) {

    const garmentList = props.garmentList.filter(garment => new Date(garment.deaq_date) >= Date() || !garment.deaq_date)

    const purchaseDateList = garmentList.map(garment => new Date(garment.purchase_date))

    const data = [{
        x: purchaseDateList,
        type: "histogram",
    }];

    const layout = {
        paper_bgcolor: "rgb(255,255,255)",
        plot_bgcolor: "rgb(229,229,229)",
        xaxis: {
        gridcolor: "rgb(255,255,255)",
        //range: [new Date("2019-11-01"), new Date("2022-02-01")],
        range: "auto",
        showgrid: true,
        showline: false,
        showticklabels: true,
        tickcolor: "rgb(127,127,127)",
        ticks: "outside",
        zeroline: false
        },
        yaxis: {
        gridcolor: "rgb(255,255,255)",
        showgrid: true,
        showline: false,
        showticklabels: true,
        tickcolor: "rgb(127,127,127)",
        ticks: "outside",
        zeroline: false
        }
    };

    return (
        <div className="graph-box">
            <Plot
            data={data}
            layout={layout}
            useResizeHandler={true}
            style={{
                width: "100%", Height: "1000px"
            }}
            />
        </div>
    )
}

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: "violin",
        };
        this.handleNav = this.handleNav.bind(this);
    }

    handleNav(newMode) {
        return (event) => {
            switch(newMode) {
            case "violin":
            case "histogram":
                this.setState({page: newMode});
                break;
            default:
                this.setState({page: "none"})
            }
        };
    }    

    render() {    
        let content = []
        switch(this.state.page) {      
          case "violin":
            content = <Violin
                garmentList={this.props.garmentList} 
                wearList={this.props.garmentWearList}
              />
            break;
          case "histogram":
            content = <Histogram
                garmentList={this.props.garmentList} 
                wearList={this.props.garmentWearList}
            />
            break;
          default:
            console.log("I couldn't find a graph called " + this.state.page)
            content = []
    
        }
        return (                
            <div className="sidebar pad-1">
                <div className="card side"><Sidebar onNav={this.handleNav} /></div>
                <div className="card content">{content}</div>
            </div>
        );
    }
}
