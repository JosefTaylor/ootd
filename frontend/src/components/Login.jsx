import React, { Component } from "react";

class Login extends Component {

	render() {
		return (			
		<form method="post" action="/api-auth/login">
		<table>
		<tbody>
		<tr>
			<td>
				<label for="username" hidden>Username</label>
				<input 
					type="text" 
					id="username" 
					name="username" 
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