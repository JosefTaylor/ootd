import React, { Component } from "react";
import API from "../axiosApi";

function PrettyPrintGarmentWear(wear) {
    const wear_date = new Date(wear.scan_date).toDateString();
    console.log("pretty printing "+ wear.garment_name)
    if (wear.wearer_name === wear.owner_name) {
        console.log("pretty printing "+ wear.garment_name)
        return `You wore ${wear.garment_name} on ${wear_date}`;
    } else {
        return `You wore ${wear.owner_name}'s ${wear.garment_name} on ${wear_date}`;
    }
}

function GarmentWear(props) {
    const garmentWearList = props.garmentWearList;
    const items = garmentWearList.map((wear) => (
            <div className="item splitter-container" key={wear.id}>
                <div className="item">
                    {PrettyPrintGarmentWear(wear)}
                </div>
                <div className="item">
                    <button onClick={props.onDelete(wear)}>
                        Remove
                    </button>
                </div>
            </div>
        ));
    return <div className="stack-container">{items}</div>;
}

class WornToday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(wear) {
        return (event) => {
            API.delete(wear.url)
            .then((response) => {
                this.props.onChange();
            })
            .catch((err) => console.log(err));
        }
    }

    filterByDate(wears) {
        return wears.filter((wear) => {
            const date = new Date(wear.scan_date).toDateString();
            const today = this.props.daySelected.toDateString();
            return date === today;
        });
    }

    render() {
        return (
            <GarmentWear
                garmentWearList={this.filterByDate(this.props.garmentWearList)}
                onDelete={this.handleDelete}
            />
        );
    }
}

export default WornToday;
