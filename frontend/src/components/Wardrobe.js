import React, { Component } from "react";
import axios from 'axios';

function Garment(props) {
    return (
        <tr key={props.value.id}>
            <td>{props.value.garment_name}</td>
            <td><button>edit</button></td>
            <td><button>delete</button></td>
        </tr>
    )    
}

class Wardrobe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            garmentList: []
        }
    }

    refreshList() {
        axios   //Axios to send and receive HTTP requests
        .get("http://localhost:8000/garments/") //specify a user here?
        .then(response => {this.setState({ garmentList: response.data })})
        .catch(err => console.log(err));      
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUnMount() {
    }

    renderGarment() {
        const garments = this.state.garmentList;
        return garments.map((item) => (
            <Garment 
                value={item}
                key={item.key}
            />
        )
        )
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderGarment()}                    
                </tbody>
            </table>
        )
    }
}

export default Wardrobe;