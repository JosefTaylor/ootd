import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../components/Auth.jsx";
import Card from "../components/Card.jsx";

export function Settings() {
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

export function Profile() {
  const auth = useAuth();
  const newUsername = auth.fashionista.user.username;
  const newEmail = auth.fashionista.user.email;

  return (
    <div className="wrapper pad-1 wd-small center">
      <Card className="content" title="Profile">
        <p>Username: {newUsername}</p>
        <p>e-mail address: {newEmail}</p>
      </Card>
    </div>
  );
}
