import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../components/Auth.jsx";
import Card from "../components/Card.jsx";

export function Settings() {
  return (
    <Card
      title={
        <div className="splitter">
          <NavLink to={""}>Profile</NavLink>
          <NavLink to={"password_change/"}>
            <p>Change password</p>
          </NavLink>
        </div>
      }
    >
      <Outlet />
    </Card>
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
