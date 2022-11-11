import React, { Component } from "react";

function CredentialField(props) {
	return (
		<input 
		type="text"
		placeholder={props.placeholder}
		/>
		)
}

function LoginButton(props) {
	return (
		<button>{props.label}</button>
		)
}

class Login extends Component {

	render() {
		return (			
		<div>
		<div>
			<CredentialField 
			placeholder="username"/>
		</div>
		<div>
			<CredentialField 
			placeholder="password"/>
		</div>
		<div>
			<LoginButton label="sign in"/>
		</div>
		<div>
			<LoginButton label="register"/>
		</div>
		</div>
		)
	}
}

export default Login;