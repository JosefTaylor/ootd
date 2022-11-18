import React, { Component } from "react";
import axios from 'axios';

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
		axios   //Axios to send and receive HTTP requests
            .post("http://localhost:8000/api-auth/login/", {
                withCredentials: true, 
                username: this.state.username,
                password: this.state.password,
            })
            .catch(err => console.log(err));
	}

	render() {
		return (			
		<form onSubmit={this.handleSubmit}>
		<table>
		<tbody>
		<tr>
			<td>
				<label for="username" hidden>Username</label>
				<input 
					type="text" 
					id="username" 
					name="username" 
					value={this.state.username}
					onChange={this.handleChange}
					placeholder="username"
					required />
			</td>
		</tr>
		<tr>
			<td>
				<label for="password" hidden>Password</label>
				<input 
					type="password" 
					id="password" 
					name="password" 
					placeholder="password" 
					value={this.state.password}
					onChange={this.handleChange}
					minlength="8" 
					required />
			</td>
		</tr>
		<tr>
			<td><input
					type="submit"
					value="Log in"/>
			</td>
		</tr>
		<tr>
			<td><input
					type="submit"
					formAction="/api-auth/register"
					value="Register"/>
			</td>
		</tr>
		<tr>
			<td><a href="/api-auth/password_reset">Forgot Password?</a></td>
		</tr>
		</tbody>
		</table>
		</form>
		)
	}
}

export default Login;