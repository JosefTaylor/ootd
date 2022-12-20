import React, { Component } from "react";
import { API, GetCookie } from "../axiosApi.jsx";
import Card from "../components/Card.jsx";

export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			email: "",
			password1: "",
			password2: "",
			errors: {}
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		// check if passwords are the same before posting?
		API.post("/dj-rest-auth/registration/",
			{
				username: this.state.username,
				password: this.state.password1,
				// password1: this.state.password1,
				// password2: this.state.password2,
				email: this.state.email,
			})
			.then((response) => {
				API.defaults.headers = { "X-CSRFToken": GetCookie('csrftoken') }
				API.post("/dj-rest-auth/login/",
				{
					username: this.state.username,
					password: this.state.password1,
				})
				.then((response) => {
					API.defaults.headers = { "X-CSRFToken": GetCookie('csrftoken') }
					this.props.onLogin();
				})
			})
			.catch((error) => {
				console.log(error.stack);
				this.setState({ errors: error.response.data })
			});
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
					{this.state.errors.username ? this.state.errors.username : null}
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
					{this.state.errors.email ? this.state.errors.email : null}
					<label htmlFor="password1" hidden>New Password</label>
					<input
						type="password"
						id="password1"
						name="password1"
						placeholder="password"
						value={this.state.password1}
						onChange={this.handleChange}
						minLength="8"
						required
					/>
					{this.state.errors.password ? this.state.errors.password : null}
					<label htmlFor="password2" hidden>Confirm Password</label>
					<input
						type="password"
						id="password2"
						name="password2"
						placeholder="confirm password"
						value={this.state.password2}
						onChange={this.handleChange}
						minLength="8"
						required
					/>
					{this.state.errors.password ? this.state.errors.password : null}
					<button onClick={this.handleSubmit}>
						Register
					</button>
				</Card>
			</div>
		)
	}
}