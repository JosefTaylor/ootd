import React, { Component } from "react";
import API from "../axiosApi.jsx";
import Card from "../components/Card.jsx";

export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			email: "",
			password: "",
			errors: {}
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await API.post("/user/create/", {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			});
			return response
		} catch (error) {
			console.log(error.stack);
			this.setState({
				errors: error.response.data
			})
		}
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
					<label htmlFor="password" hidden>Password</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="password"
						value={this.state.password1}
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