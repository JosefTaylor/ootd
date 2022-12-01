import React, { Component } from "react";

export default class DateSelector extends Component {
    
    render() {
        return (
            <div className="splitter">
                <div>
                    <button onClick={this.props.onClick(-7)}>{"<<"}</button>
                    <button onClick={this.props.onClick(-1)}>{"<"}</button>
                </div>
                <div className="splitter">
                    <label htmlFor="date"><h2>{this.props.name}</h2></label>
                    <input 
                        type="date" 
                        value={this.props.date.toISOString().split('T')[0]}
                        onChange={this.props.onChange}
                    />
                </div>
                <div>
                    <button onClick={this.props.onClick(1)}>{">"}</button>
                    <button onClick={this.props.onClick(7)}>{">>"}</button>
                </div>
            </div>
        );
    }
}