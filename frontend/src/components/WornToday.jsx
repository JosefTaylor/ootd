import React, { Component } from "react";
import API from "../axiosApi";
import DateSelector from "./DateSelector";

function PrettyPrintGarmentWear(wear) {
    const wear_date = new Date(wear.scan_date).toDateString();
    if (wear.wearer_name === wear.owner_name) {
        return `You wore ${wear.garment_name} on ${wear_date}`;
    } else {
        return `You wore ${wear.owner_name}'s ${wear.garment_name} on ${wear_date}`;
    }
}

function WearLine(props) {
    return (
        <div className="splitter">
            <div>
                {PrettyPrintGarmentWear(props.wear)}
            </div>
            <div>
                <button onClick={props.onDelete(props.wear)}>
                    Remove
                </button>
            </div>
        </div>
    )
}

function WearTable(props) {
    const items = props.garmentWearList.map((wear) => (
            <div key={wear.id} className="data-item">
                <WearLine wear={wear} onDelete={props.onDelete}/>
            </div>
        ));
    return <div className="stack data-table ht-full">{items}</div>;
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
            const today = this.props.date.toDateString();
            return date === today;
        });
    }

    render() {
        return (
            <div className="stack card ht-full">
                <div>
                    <DateSelector
                        date={this.props.date}
                        onClick={this.props.onClick}
                        onChange={this.props.onChange}
                        name="Outfit on:  "
                    />
                </div>
                <WearTable
                        garmentWearList={this.filterByDate(this.props.garmentWearList)}
                        onDelete={this.handleDelete}
                    />
            </div>
        );
    }
}

export default WornToday;
