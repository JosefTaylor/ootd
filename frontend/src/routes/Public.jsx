import React from "react";
import Card from "../components/Card.jsx";
import {NavLink} from "react-router-dom";

export default function Public(props) {
  return (
    <div className="wrapper pad-1 wd-small center">
      <Card title="Welcome!">
        <NavLink to="user/home">Get Started</NavLink>
        <p>About</p>
      </Card>
    </div>
  );
}