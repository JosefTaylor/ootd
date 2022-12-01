import React, { Component } from "react";
import API from "../axiosApi";
import Card from "../components/Card";

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		API   //Axios to send and receive HTTP requests
			.post("/api-auth/login/", {
				next: "/",
				username: this.state.username,
				password: this.state.password,
				submit: "Log+in",
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="wrapper pad-1 wd-small center">
				<Card title="Log in">
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
					<label htmlFor="password" hidden>Password</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="password"
						value={this.state.password}
						onChange={this.handleChange}
						minLength="8"
						required
					/>
					<button onClick={this.handleSubmit}>
						Log in
					</button>
					<button onClick={this.props.onNav("register")}>
						Register
					</button>
					<a href="/api-auth/password_reset">Forgot Password?</a>
				</Card >
			</div >
		)
	}
}