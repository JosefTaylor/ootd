import React, { Component } from "react";
import FilterBar from "./FilterBar";
import axios from 'axios';
import WardrobeGarment from "./WardrobeGarment";


// function WardrobeGarment(props) {
//     const garments = props.garments
//     const listItems = garments.map((garment) =>
//         <tr key={garment.id}>
//             <td>{garment.garment_name}</td>
//             <td><button onClick={props.onClick} value={garment.url}>wear</button></td>
//             <td><button>edit</button></td>
//         </tr>
//         )

function WardrobeTable(props) {
    const listItems = props.garments.map((garment) =>
        <div key={garment.id}>
            <WardrobeGarment 
                garment={garment} 
                onWear={props.onWear}
                onChange={props.onChange}
                />
        </div>
        )

    return (
        <ul>{listItems}</ul>
    )    
}

class Wardrobe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleWear = this.handleWear.bind(this)
    }

    filterBySearch(garments) {
        return garments.filter(garment => {
        const name = garment.garment_name.toLowerCase();
        const filterText =  this.state.filterText.toLowerCase();
        return name.includes(filterText);
        })
    }

    handleChange(event) {
        this.setState({filterText: event.target.value})
    }

    handleWear(event) {
        axios   //Axios to send and receive HTTP requests
            .post("http://localhost:8000/garmentwears/", {
                withCredentials: true, 
                garment: event.target.attributes.value.value,
                wearer: "http://localhost:8000/users/1/",
                scan_date: this.props.daySelected,
            })
            .then(this.props.onChange())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h2>Your Wardrobe</h2>
                <FilterBar 
                    value={this.state.filterText}
                    onChange={this.handleChange}/>
                <div>
                    <WardrobeTable 
                        garments={this.filterBySearch(this.props.garmentList)}
                        onWear={this.handleWear}
                        onChange={this.props.onChange}
                    />
                    <WardrobeGarment 
                        mode={"new"} 
                        newName={this.state.filterText}
                        onChange={this.props.onChange}
                    />
                </div>
            </div>
        )
    }
}

export default Wardrobe;