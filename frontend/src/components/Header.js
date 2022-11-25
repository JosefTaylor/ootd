import React, { Component } from "react";

export default class UserHeader extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
			<h1>
			OOTD
			</h1>
			<p>Track your outfits every day, {this.props.userName}</p>
			</div>
			)
	}
}