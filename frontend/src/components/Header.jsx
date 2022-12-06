import React, { Component } from "react";

export default class Header extends Component {

	profile() {
		if (this.props.userName) {
			return (
				<div className="header-end">
					{this.props.userName}
					<button onClick={this.props.onNav("logout")}>log out</button>
				</div>
			)
		} else {
			return (<div></div>)
		}
	}

	nav() {
		if (this.props.userName) {
			return (
				<div className="header-end stack">
					<button onClick={this.props.onNav("home")}>home</button>
					<button onClick={this.props.onNav("graphs")}>graphs</button>
					<button onClick={this.props.onNav("selfie")}>selfie</button>
				</div>
			)
		} else {
			return (<div></div>)
		}
	}

	render() {
		return (
			<div className="splitter header">
				{this.nav()}
				<div >
					<h1>OOTD</h1>
				</div>
				{this.profile()}
			</div>
		)
	}
}