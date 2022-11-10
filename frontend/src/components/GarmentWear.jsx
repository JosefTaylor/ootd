import React, { Component } from "react";
import DateSelector from "./DateSelector";


function PrettyPrintGarmentWear(wear) {
    if (wear.wearer_name === wear.owner_name) {
        return `You wore ${wear.garment_name} on ${wear.scan_date}.`;
    } else {
        return `You wore ${wear.owner_name}'s ${wear.garment_name} on ${wear.scan_date}`;
    }
}

function GarmentWear(props) {
    const garmentWearList = props.garmentWearList
    const listItems = garmentWearList.map((garmentWear) =>
        <tr key={garmentWear.id}>
            <td>
            <input 
                name='addToOutfit' 
                type="checkbox"
                />
            </td>
            <td>{PrettyPrintGarmentWear(garmentWear)}</td>
            <td><button>Don't wear</button></td>
        </tr>
        )
    return (
        <tbody>{listItems}</tbody>
    )    
}

class WornToday extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            daySelected: new Date()
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(n) {
        return (event) => {
            let newDay = new Date(this.state.daySelected)
            newDay.setDate(this.state.daySelected.getDate() + n)
            this.setState({daySelected: newDay})
        }
    }

    render() {
        return (
            <div>
                <h2>
                    <DateSelector 
                        date={this.state.daySelected.toDateString()} 
                        onClick={this.handleClick}
                        />  
                </h2>
                <table>
                    <GarmentWear 
                        garmentWearList={this.props.garmentWearList.filter(wear => new Date(wear.scan_date).toDateString() === this.state.daySelected.toDateString())}
                        />
                </table>
                <button>Add To Outfit</button>
            </div>
        )
    }
}

export default WornToday;