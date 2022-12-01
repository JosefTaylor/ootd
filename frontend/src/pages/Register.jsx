import React, { Component } from "react";
import API from "../axiosApi";
import Card from "../components/Card";

export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			email: "",
			password1: "",
			password2: "",
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleChange(event) {
		console.log("name: " + event.target.name + " value: " + event.target.value)
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		//event.preventDefault();
		API   //Axios to send and receive HTTP requests
			.post("/api-auth/register/", {
				next: "/",
				username: this.state.username,
				email: this.state.email,
				password1: this.state.password1,
				password2: this.state.password2,
				submit: "register",
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="wrapper pad-1 wd-small">
				<Card title="Register">
					<label htmlFor="username" hidden>Username</label>
					<input
						type="text"
						id="username"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
						placeholder="username"
						required
					/>
					<label htmlFor="email" hidden>Email</label>
					<input
						type="text"
						id="email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						placeholder="email"
						required
					/>
					<label htmlFor="password1" hidden>Password</label>
					<input
						type="password1"
						id="password1"
						name="password1"
						placeholder="password"
						value={this.state.password1}
						onChange={this.handleChange}
						minLength="8"
						required
					/>
					<label htmlFor="password2" hidden>Confirm Password</label>
					<input
						type="password2"
						id="password2"
						name="password2"
						placeholder="confirm password"
						value={this.state.password2}
						onChange={this.handleChange}
						minLength="8"
						required
					/>
					<button onClick={this.handleSubmit}>
						Register
					</button>
				</Card>
			</div>
		)
	}
}