import React, { Component } from "react";
import API from "../axiosApi";

import Header from "../components/Header";

class Login extends Component {
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
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		// alert('A username and password was submitted: '
		// 	+ this.state.username
		// 	+ " "
		// 	+ this.state.password)
		API   //Axios to send and receive HTTP requests
            .post("/api-auth/login/", {
				headers: {
					username: this.state.username,
					password: this.state.password,
				}
            })
            .catch(err => console.log(err));
	}

	render() {
		return (
			<div className="wrapper pad-1 wd-small">
				<div className="center card">
					<form onSubmit={this.handleSubmit}>
						<div className="stack">
							<label htmlFor="username" hidden>Username</label>
							<input 
								type="text" 
								id="username" 
								name="username" 
								value={this.state.username}
								onChange={this.handleChange}
								placeholder="username"
								required />
							<label htmlFor="password" hidden>Password</label>
							<input 
								type="password" 
								id="password" 
								name="password" 
								placeholder="password" 
								value={this.state.password}
								onChange={this.handleChange}
								minLength="8" 
								required />
							<input
								type="submit"
								value="Log in"/>
							<input
								type="submit"
								formAction="/api-auth/register"
								value="Register"/>
							<a href="/api-auth/password_reset">Forgot Password?</a>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Login;