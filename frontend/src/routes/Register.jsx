import React, { Component } from "react";
import { API, GetCookie, register } from "../axiosApi.jsx";
import Card from "../components/Card.jsx";
import { useAuth } from "../components/Auth.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [errors, setErrors] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // check if passwords are the same before posting?
    if (password1 != password2) {
      setErrors({ password2: "The passwords do not match" });
    } else {
      const registerErrors = await register(username, password1, email);
      if (registerErrors) {
        setErrors(registerErrors);
      } else {
        const loginErrors = await auth.signin(username, password1);
        if (!loginErrors) {
          navigate("/home", { replace: true, state: { loggedIn: true } });
        }
        console.log(loginErrors);
      }
    }
  };

  return (
    <div className="wrapper pad-1 wd-small">
      <Card title="Register">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setErrors(null);
            }}
            required
          />
        </label>
        {errors?.username ? errors.username : null}
        <label>
          Email
          <input
            type="text"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors(null);
            }}
            required
          />
        </label>
        {errors?.email ? errors.email : null}
        <label>
          New Password
          <input
            type="password"
            name="password1"
            value={password1}
            onChange={(event) => {
              setPassword1(event.target.value);
              setErrors(null);
            }}
            minLength="8"
            required
          />
        </label>
        {errors?.password ? errors.password : null}
        <label>
          Confirm Password
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(event) => {
              setPassword2(event.target.value);
              setErrors(null);
            }}
            minLength="8"
            required
          />
        </label>
        {errors?.password2 ? errors.password2 : null}
        <button onClick={handleSubmit}>Register</button>
      </Card>
    </div>
  );
}
