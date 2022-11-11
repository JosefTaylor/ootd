import React, { Component } from "react";
import FilterBar from "./FilterBar";


function WardrobeGarment(props) {
    const garments = props.garments
    const listItems = garments.map((garment) =>
        <tr key={garment.id}>
            <td>{garment.garment_name}</td>
            <td><button>wear</button></td>
            <td><button>edit</button></td>
        </tr>
        )
    return (
        <tbody>{listItems}</tbody>
    )    
}

class Wardrobe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
        };
        this.handleChange = this.handleChange.bind(this)
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

    render() {
        return (
            <div>
                <h2>Your Wardrobe</h2>
                <FilterBar 
                    value={this.state.filterText}
                    onChange={this.handleChange}
                    />
                <table>
                    <WardrobeGarment 
                        garments={this.filterBySearch(this.props.garmentList)}
                        />
                </table>
                <button>New Garment</button>
            </div>
        )
    }
}

export default Wardrobe;