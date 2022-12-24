import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";

export default class Header extends Component {

	profile() {
		if (this.props.user) {
			return (
				<div className="header-end stack">
					{this.props.user.username}
					<Link className='button' to={'logout/'}>log out</Link>
					<Link className='button' to={'password_change/'}>change password</Link>	
				</div>
			)
		} else {
			return (<div></div>)
		}
	}

	nav() {
		if (this.props.user) {
			return (
				<div className="header-end stack">
					<Link className='button' to={'home/'}>home</Link>
					<Link className='button' to={'graphs/'}>graphs</Link>
					<Link className='button' to={'selfie/'}>selfie</Link>
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