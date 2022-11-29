import React, { Component } from "react";



class DateSelector extends Component {

    render() {
        return (
            <div className="splitter-container">
                <div className="item">
                    <button onClick={this.props.onClick(-1)}>{"<"}</button>
                </div>
                <div className="item">
                    {this.props.date.toDateString()}
                </div>
                <div className="item">
                    <button onClick={this.props.onClick(1)}>{">"}</button>
                </div>
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