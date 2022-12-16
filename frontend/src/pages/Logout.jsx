import React, { Component } from "react";
import API from "../axiosApi.jsx";


class Logout extends Component {

	render() {
		return (
			<div className="grid pad-1">
				<div className="center card">
					{true &&
						<div>
							<h2>Logged Out!</h2>
							<p>Refresh the page to log in again.</p>
						</div>
					}
					{false &&
						<h2>Logging Out...</h2>
					}
				</div>
			</div>
		)
	}
}

export default Logout;