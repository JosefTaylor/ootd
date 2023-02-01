/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { API as OOTD } from "../ootdApi.jsx";
// import axios from "axios";
import Card from "../components/Card.jsx";

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loginError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      loginError: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    OOTD.post("/dj-rest-auth/reset/", {
      email: this.state.email,
    })
      .then(() => {
        this.props.onLogin();
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <div className="wrapper pad-1 wd-small center">
        <Card title="Reset my password">
          <label htmlFor="email" hidden>
            Username
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="email"
            required
          />
          <button onClick={this.handleSubmit}>Submit</button>
          <div className="warning" hidden={!this.state.loginError}>
            That didnt work, please try again.
          </div>
        </Card>
      </div>
    );
  }
}
