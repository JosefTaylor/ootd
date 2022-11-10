import React, { Component } from "react";
import FilterBar from "./FilterBar";

// function FilterBar(props) {
//     return (
//         <input
//             value={props.value}
//             onChange={props.onChange}
//             />
//         )
// }


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

    filterBySearch(garment) {
        const name = garment.garment_name.toLowerCase();
        return (name.includes(this.state.filterText.toLowerCase()))
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
                        garments={this.props.garmentList.filter(garment => this.filterBySearch(garment))}
                        />
                </table>
                <button>New Garment</button>
            </div>
        )
    }
}

export default Wardrobe;