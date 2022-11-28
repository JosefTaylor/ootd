import React, { Component } from "react";
import { Splitter, SplitterItem } from "./layouts/Splitter";



class DateSelector extends Component {

    render() {
        return (
            <Splitter>
                <SplitterItem>
                    <button onClick={this.props.onClick(-1)}>{"<"}</button>
                </SplitterItem>
                <SplitterItem>
                    {this.props.date.toDateString()}
                </SplitterItem>
                <SplitterItem>
                    <button onClick={this.props.onClick(1)}>{">"}</button>
                </SplitterItem>
            </Splitter>
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