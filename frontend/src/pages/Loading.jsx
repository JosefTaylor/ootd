import React, { Component } from "react";
import axios from 'axios';


class Loading extends Component {

	render() {
		return (
			<div className="grid pad-1">
				<div className="center card">
					Loading
				</div>
			</div>
		)
	}
}

export default Loading;