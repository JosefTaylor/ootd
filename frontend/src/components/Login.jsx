import React, { Component } from "react";

function CredentialField(props) {
	return (
		<input 
		type="text"
		placeholder={this.props.placeholder}
		/>
		)
}

function LoginButton(props) {
	return (
		<button>{this.props.label}</button>
		)
}

class Login extends Component {

	render() {
		return (
		<div>
			<CredentialField placeholder="username"/>
			<CredentialField placeholder="password"/>
			<LoginButton label="sign in"/>
			<LoginButton label="register"/>
		</div>
		)
	}
}

export default Login;