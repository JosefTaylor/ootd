import React, { Component } from "react";
import {API, GetCookie} from "../axiosApi.jsx";
// import axios from "axios";
import Card from "../components/Card.jsx";

export default class PasswordChange extends Component {
	constructor(props) {
		super(props)
		this.state = {
			old_password: "",
			new_password1: "",
			new_password2: "",
			loginError: false,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			loginError: false,
		});
	}

	async handleSubmit(event) {
		event.preventDefault();
		API.post("/dj-rest-auth/password/change/",
			{
				old_password: this.state.old_password,
				new_password1: this.state.new_password1,
				new_password2: this.state.new_password2,
			})
			.then((response) => {
				this.props.onLogin();
			})
				.catch((error) => {
				throw error;
			});
	}

	render() {
		return (
			<div className="wrapper pad-1 wd-small center">
				<Card title="Change Password">
					<label htmlFor="old_password">Current Password</label>
					<input
						type="password"
						id="old_password"
						name="old_password"
						value={this.state.username}
						onChange={this.handleChange}
						placeholder="current password"
						required
					/>
					<label htmlFor="new_password1">New Password</label>
					<input
						type="password"
						id="new_password1"
						name="new_password1"
						value={this.state.username}
						onChange={this.handleChange}
						placeholder="new password"
						required
					/>
					<label htmlFor="new_password2">Confirm Password</label>
					<input
						type="password"
						id="new_password2"
						name="new_password2"
						value={this.state.username}
						onChange={this.handleChange}
						placeholder="confirm password"
						required
					/>
					<button onClick={this.handleSubmit}>
						Change Password
					</button>
					<div className='warning' hidden={!this.state.loginError}>That didn't work, please try again.</div>
				</Card >
			</div >
		)
	}
}