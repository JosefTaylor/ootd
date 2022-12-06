import React, { Component } from "react";
import API from "../axiosApi";


class Logout extends Component {

	logout() {
		API.post("/dj-rest-auth/logout/")
			.then(response => {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				// axiosInstance.defaults.headers['Authorization'] = null;
			})
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