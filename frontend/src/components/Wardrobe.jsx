import React, { Component } from "react";
import FilterBar from "./FilterBar.jsx";
import API from "../axiosApi.jsx";

class WardrobeGarment extends Component {
    constructor(props) {
        super(props);
        const mode = props.mode ?? "display";
        const garment = props.garment ?? {};
        this.state = {
            mode: mode,
            garment_name: garment.name ?? "",
            purchase_date: garment.purchase_date ?? new Date(),
            purchase_price: garment.purchase_price ?? 0,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.refreshState = this.refreshState.bind(this);
    }

    handleEdit(event) {
        this.setState({ mode: "edit" });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        if (this.props.garment?.url) {
            API.patch(this.props.garment.url, {
                //Axios to send and receive HTTP requests
                name: this.state.garment_name,
                purchase_date: this.state.purchase_date,
                purchase_price: this.state.purchase_price,
            })
                .then((response) => {
                    this.props.onChange();
                    this.refreshState();
                })
                .catch((err) => console.log(err));
        } else {
            API.post("/garments/", {
                //Axios to send and receive HTTP requests
                name: this.state.garment_name,
                purchase_date: this.state.purchase_date,
                purchase_price: this.state.purchase_price,
            })
                .then((response) => {
                    this.props.onChange();
                    this.refreshState();
                })
                .catch((err) => console.log(err));
        }
        this.refreshState();
    }

    handleCancel(event) {
        this.refreshState();
    }

    handleDelete(event) {
        API.patch(this.props.garment.url, {
            deaq_date: new Date().toISOString().split("T")[0],
        })
            .then((response) => {
                this.props.onChange();
            })
            .catch((err) => console.log(err));
        this.refreshState();
    }

    handleNew(event) {
        this.setState({
            mode: "edit",
            garment_name: this.props.newName,
            purchase_date: "",
            purchase_price: "",
        });
    }

    refreshState() {
        this.setState({ mode: this.props.mode ?? "display" });
    }

    displayRow() {
        return (
            <div className="splitter">
                <div className="garment-name">
                {this.props.garment.name}
                </div>
                <div className="cost-per-wear">
                {new Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                }).format(this.props.garment.cost_per_wear)}
                /wear
                </div>
                <div>
                <button
                    onClick={this.props.onWear}
                    value={this.props.garment.url}
                >
                    wear
                </button>
                <button
                    onClick={this.handleEdit}
                    data-url={this.props.garment.url}
                >
                    edit
                </button>
                </div>
            </div>
        );
    }

    editRow() {
        return (
            <div className="flow">
                <div>
                    <label htmlFor="garment_name" >
                        garment name: 
                    </label>
                    <input
                        type="text"
                        id="garment_name"
                        name="garment_name"
                        value={this.state.garment_name}
                        onChange={this.handleChange}
                        placeholder="name"
                    />
                </div>
                <div>
                    <label htmlFor="purchase_date" >
                        purchase date: 
                    </label>
                    <input
                        type="date"
                        id="purchase_date"
                        name="purchase_date"
                        placeholder="purchase_date"
                        value={this.state.purchase_date}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="purchase_price" >
                        purchase price: 
                    </label>
                    <input
                        type="number"
                        id="purchase_price"
                        name="purchase_price"
                        placeholder="purchase_price"
                        value={this.state.purchase_price}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input
                        type="button"
                        value="Save"
                        onClick={this.handleSubmit}
                    />
                    <input
                        type="button"
                        value="Cancel"
                        onClick={this.handleCancel}
                    />
                    <input
                        type="button"
                        value="Delete"
                        onClick={this.handleDelete}
                    />
                </div>
            </div>
        );
    }

    render() {
        switch (this.state.mode) {
            case "edit":
                return this.editRow();
            case "new":
                return <button onClick={this.handleNew}>New Garment</button>;
            default:
                return this.displayRow();
        }
    }
}

function WardrobeTable(props) {
    const listItems = props.garments.map((garment) => (
        <div key={garment.id} className="data-item">
            <WardrobeGarment
                garment={garment}
                onWear={props.onWear}
                onChange={props.onChange}
            />
        </div>
    ));

    return <div className="stack data-table ht-full">{listItems}</div>;
}

class Wardrobe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    filterGarments(garments) {
        const filterGarments = garments.filter((garment) => {
            const name = garment.name.toLowerCase();
            const filterText = this.state.filterText.toLowerCase();
            return name.includes(filterText);
        });
        return filterGarments;
    }

    handleChange(event) {
        this.setState({ filterText: event.target.value });
    }

    render() {
        return (
            <div className="stack card ht-full">
                <div>
                    <h2>Your Wardrobe</h2>
                </div>
                <FilterBar
                    value={this.state.filterText}
                    onChange={this.handleChange}
                />
                <WardrobeTable
                    garments={this.filterGarments(this.props.garmentList)}
                    onWear={this.props.onWear}
                    onChange={this.props.onChange}
                />
                <WardrobeGarment
                    mode={"new"}
                    newName={this.state.filterText}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default Wardrobe;
