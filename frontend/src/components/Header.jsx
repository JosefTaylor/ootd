import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../routes/Login.jsx";

export default function Header(props) {
  const { user } = useAuth();

  const profile = (user) => {
    if (user) {
      return (
        <div className="header-end stack">
          {user.username}
          <Link className="button" to={"user/logout/"}>
            log out
          </Link>
          <Link className="button" to={"password_change/"}>
            change password
          </Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const nav = (user) => {
    if (user) {
      return (
        <div className="header-end stack">
          <Link className="button" to={"home/"}>
            home
          </Link>
          <Link className="button" to={"graphs/"}>
            graphs
          </Link>
          <Link className="button" to={"selfie/"}>
            selfie
          </Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="splitter header">
      {nav(user)}
      <div>
        <h1>OOTD</h1>
      </div>
      {profile(user)}
    </div>
  );
}
