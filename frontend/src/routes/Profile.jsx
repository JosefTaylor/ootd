import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../components/Auth.jsx";
import Card from "../components/Card.jsx";

export function Settings() {
  return (
    <div className="sidebar">
      <div className="side">
        <Card>
          <NavLink className="button" to={""}>
            Profile
          </NavLink>
          <NavLink className="button" to={"password_change/"}>
            <p>Change </p>
            <p>password</p>
          </NavLink>
        </Card>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export function Profile() {
  const auth = useAuth();
  const newUsername = auth.fashionista.user.username;
  const newEmail = auth.fashionista.user.email;

  return (
    <Card title="Profile">
      <p>Username: {newUsername}</p>
      <p>e-mail address: {newEmail}</p>
    </Card>
  );
}
