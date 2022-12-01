import React, { Component } from "react";
import API from "../axiosApi";


class Logout extends Component {

	logout() {
		API.get("/api-auth/logout/")
			.catch((error) => {
				console.log(error)
			})
	}

	render() {
		this.logout();
		return (
			<div className="grid pad-1">
				<div className="center card">
					<h2>Logged Out!</h2>
					<p>Refresh the page to log in again.</p>
				</div>
			</div>
		)
	}
}

export default Logout;