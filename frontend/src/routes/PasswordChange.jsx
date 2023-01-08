import React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../axiosApi.jsx";
import Card from "../components/Card.jsx";

export default function PasswordChange() {
  const navigate = useNavigate();
  const [old_password, setOld_password] = React.useState("");
  const [new_password1, setNew_password1] = React.useState("");
  const [new_password2, setNew_password2] = React.useState("");
  const [loginError, setLoginError] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await API.post("/dj-rest-auth/password/change/", {
        old_password: old_password,
        new_password1: new_password1,
        new_password2: new_password2,
      });

      navigate("/home", { replace: true });
    } catch (error) {
      setLoginError(error.response.data);
    }
  }

  return (
    <div className="wrapper pad-1 wd-small center">
      <Card title="Change Password">
        <label>
          Current Password
          <input
            type="password"
            name="old_password"
            value={old_password}
            onChange={(event) => {
              setOld_password(event.target.value);
              setLoginError(null);
            }}
            required
          />
        </label>
        <div className="warning" hidden={!loginError?.old_password}>
          {loginError?.old_password}
        </div>
        <label>
          New Password
          <input
            type="password"
            name="new_password1"
            value={new_password1}
            onChange={(event) => {
              setNew_password1(event.target.value);
              setLoginError(null);
            }}
            required
          />
        </label>
        <div className="warning" hidden={!loginError?.new_password1}>
          {loginError?.new_password1}
        </div>
        <label>
          Confirm Password
          <input
            type="password"
            name="new_password2"
            value={new_password2}
            onChange={(event) => {
              setNew_password2(event.target.value);
              setLoginError(null);
            }}
            required
          />
        </label>
        <div className="warning" hidden={!loginError?.new_password2}>
          {loginError?.new_password2}
        </div>
        <button onClick={handleSubmit}>Change Password</button>
        <div className="warning" hidden={!loginError}>
          That didnt work, please try again.
        </div>
      </Card>
    </div>
  );
}
