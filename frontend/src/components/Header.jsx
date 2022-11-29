import React, { Component } from "react";

export default class UserHeader extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="splitter-container header">
				<div className="item header-end">{this.props.userName}</div>
				<div className="item">
					<h1>OOTD</h1>
					<p>Track your outfits every day</p>
				</div>
				<div className="item header-end stack">
					<button onClick={this.props.onNav("home")}>home</button>
					<button onClick={this.props.onNav("graphs")}>graphs</button>
				</div>
			</div>
			)
	}
}