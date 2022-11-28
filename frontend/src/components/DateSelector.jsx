import React, { Component } from "react";



class DateSelector extends Component {

    render() {
        return (
            <div>
            <button onClick={this.props.onClick(-1)}>{"<"}</button>
            {this.props.date.toDateString()}
            <button onClick={this.props.onClick(1)}>{">"}</button>
            </div>
        );
    }
}

// class DateSelector extends Component {
    
//     render() {
//         return (
//             <input
//             type="date"
//             value={this.props.date}
//             />
//         );
//     }
// }


export default DateSelector;