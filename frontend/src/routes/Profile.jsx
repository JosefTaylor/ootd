import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { updateUser } from "../ootdApi.jsx";
import { useAuth } from "../components/Auth.jsx";
import Card from "../components/Card.jsx";

export function Profile() {
  return (
    <div className="sidebar pad-1">
      <Card className="side">
        <div className="stack ht-full">
          <NavLink className="button" to={""}>
            Profile
          </NavLink>
          <NavLink className="button" to={"password_change/"}>
            <p>Change </p>
            <p>password</p>
          </NavLink>
        </div>
      </Card>
      <Outlet />
    </div>
  );
}

export function Fashionista() {
  const auth = useAuth();
  const [newUsername, setUsername] = React.useState(
    auth.fashionista.user.username
  );
  const [newEmail, setEmail] = React.useState(auth.fashionista.user.email);
  const [newBio, setBio] = React.useState(auth.fashionista.bio);
  const [errors, setErrors] = React.useState(null);

  async function handleSubmit() {
    const updateErrors = await updateUser(auth.fashionista, {
      username: newUsername,
      email: newEmail,
      bio: newBio,
    });
    if (updateErrors) {
      setErrors(updateErrors);
    } else {
      console.log("saved!");
    }
  }

  return (
    <div className="wrapper pad-1 wd-small center">
      <Card className="content" title="Profile">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={newUsername}
            onChange={(event) => {
              setUsername(event.target.value);
              setErrors(null);
            }}
            required
          />
        </label>
        <label>
          e-mail address:
          <input
            type="text"
            name="email"
            value={newEmail}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors(null);
            }}
            required
          />
        </label>
        <label>
          Fashion Goals:
          <textarea
            name="username"
            value={newBio}
            onChange={(event) => {
              setBio(event.target.value);
              setErrors(null);
            }}
          />
        </label>
        <button onClick={handleSubmit}>Update Profile</button>
        <div className="warning" hidden={!errors}>
          That didnt work, please try again.
        </div>
      </Card>
    </div>
  );
}
