import React, { Component } from "react";
import {API, GetCookie} from "../axiosApi.jsx";
// import axios from "axios";
import Card from "../components/Card.jsx";

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
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
		API.post("/dj-rest-auth/login/",
			{
				username: this.state.username,
				password: this.state.password,
			})
			.then((response) => {
				API.defaults.headers = {"X-CSRFToken": GetCookie('csrftoken')}
				this.props.onLogin();
			})
				.catch((error) => {
				throw error;
			});
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
					<div className='warning' hidden={!this.state.loginError}>That didn't work, please try again.</div>
					<button onClick={this.props.onNav("register")}>
						Register
					</button>
					<a href="/api-auth/password_reset">Forgot Password?</a>
				</Card >
			</div >
		)
	}
}