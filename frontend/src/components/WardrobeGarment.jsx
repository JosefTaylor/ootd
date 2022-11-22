import React, { Component } from "react";
import axios from 'axios';

export default class WardrobeGarment extends Component {
    constructor(props) {
        super(props)
        const mode = props.mode ?? "display"
        const garment = props.garment ?? {}
        this.state = {
            mode: mode,
            garment: garment,
            garment_name: "",
            purchase_date: new Date(),
            purchase_price: 0,
        }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleNew = this.handleNew.bind(this)
    }

    displayRow() {
        return (
            <div>
                {this.state.garment.garment_name}
                <button 
                onClick={this.props.onWear} 
                value={this.state.garment.url}>
                wear</button>
                <button 
                onClick={this.handleEdit} 
                data-url={this.state.garment.url}>
                edit</button>
            </div>
        )
    }

    editRow() {
        return (
            <form 
            onSubmit={this.handleSubmit} 
            value={this.state.garment.url}
            action="submit">
            <div>
                <div>
                    <label for="garment_name" hidden>garment name</label>
                    <input 
                        type="text" 
                        id="garment_name" 
                        name="garment_name" 
                        value={this.state.garment_name}
                        onChange={this.handleChange}
                        placeholder="name"
                         />
                </div>
            </div>
            <div>
                <div>
                    <label for="purchase_date" hidden>purchase date</label>
                    <input 
                        type="date" 
                        id="purchase_date" 
                        name="purchase_date" 
                        placeholder="purchase_date" 
                        value={this.state.purchase_date}
                        onChange={this.handleChange}
                         />
                </div>
            </div>
            <div>
                <div>
                    <label for="purchase_price" hidden>purchase price</label>
                    <input 
                        type="number" 
                        id="purchase_price" 
                        name="purchase_price" 
                        placeholder="purchase_price" 
                        value={this.state.purchase_price}
                        onChange={this.handleChange}
                         />
                </div>
            </div>
            <div>
                <div><input
                        type="submit"
                        value="Save"/>
                        <input
                        type="button"
                        value="Cancel"
                        onClick={this.handleCancel}/>
                        <input
                        type="button"
                        value="Delete"
                        onClick={this.handleDelete}/>
                </div>
            </div>
            </form>
        )
    }

    handleEdit(event) {
        console.log("attempting to edit garment: " + event.target.dataset.url)
        axios   //Axios to send and receive HTTP requests
            .get(event.target.dataset.url, {
                withCredentials: true, 
            })
            .then(response => {
                this.setState({
                mode: "edit",
                garment_name: response.data.garment_name,
                purchase_date: response.data.purchase_date,
                purchase_price: response.data.purchase_price,})}
            )
            .catch(err => console.log(err));
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.garment?.url) {
            axios   //Axios to send and receive HTTP requests
                .patch(this.state.garment.url, {
                withCredentials: true, 
                garment_name: this.state.garment_name,
                purchase_date: this.state.purchase_date,
                purchase_price: this.state.purchase_price,
                })
                .then(this.props.onChange())
                .catch(err => console.log(err));
        } else {
            axios   //Axios to send and receive HTTP requests
                .post("http://localhost:8000/garments/", {
                withCredentials: true, 
                garment_name: this.state.garment_name,
                purchase_date: this.state.purchase_date,
                purchase_price: this.state.purchase_price,
                })
            .then(this.props.onChange())
            .catch(err => console.log(err));
        }
        this.refreshState()
    }

    handleCancel(event) {
        console.log("canceling the edit")
        this.refreshState()
    }

    handleDelete(event) {
        console.log("I would delete the item")
        this.refreshState()
    }

    handleNew(event) {
        this.setState({
            mode: "edit",
            garment_name: this.props.newName,
            purchase_date: "",
            purchase_price: "",})
    }

    refreshState() {
        this.setState({mode: this.props.mode ?? "display"}) 
    }

    render() {
        switch (this.state.mode) {
            case "edit":
                return this.editRow()
            case "new":
                return <button onClick={this.handleNew}>New Garment</button>
            default:
                return this.displayRow()
        }
    }
}