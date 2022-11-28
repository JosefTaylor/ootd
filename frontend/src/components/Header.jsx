import React, { Component } from "react";
import { Splitter, SplitterItem } from "./layouts/Splitter";

export default class UserHeader extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="splitter-container header">
				<div className="header-end">{this.props.userName}</div>
				<div><h1>OOTD</h1><p>Track your outfits every day</p></div>
				<div className="header-end"><button>menu</button></div>
			</div>
			)
	}
}