import React, { Component } from "react";
import axios from 'axios';


function PrettyPrintGarmentWear(wear) {
    const wear_date = new Date(wear.scan_date).toDateString()
    if (wear.wearer_name === wear.owner_name) {
        return `You wore ${wear.garment_name} on ${wear_date}`;
    } else {
        return `You wore ${wear.owner_name}'s ${wear.garment_name} on ${wear_date}`;
    }
}

function GarmentWear(props) {
    const garmentWearList = props.garmentWearList
    const listItems = garmentWearList.map((garmentWear) =>
        <tr key={garmentWear.id}>
            <td>{PrettyPrintGarmentWear(garmentWear)}</td>
            <td><button 
            onClick={props.onDelete} 
            data-url={garmentWear.url}>
            Remove</button></td>
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
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event) {
        console.log("I'll delete " + event.target.dataset.url)
        axios
            .delete(event.target.dataset.url, {
                withCredentials: true, 
            })
            .then()
            .catch(err => console.log(err));
    }


    filterByDate(wears) {
        return wears.filter(wear => {
            const date = new Date(wear.scan_date).toDateString()
            const today = this.props.daySelected.toDateString()
            return date === today;
        })
    }

    render() {
        return (
            <div>
                <table>
                    <GarmentWear 
                        garmentWearList={this.filterByDate(this.props.garmentWearList)}
                        onDelete={this.handleDelete}
                        />
                </table>
            </div>
        )
    }
}

export default WornToday;