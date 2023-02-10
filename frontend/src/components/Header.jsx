import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth.jsx";

export default function Header() {
  const { fashionista } = useAuth();

  return (
    <div id="header">
      {fashionista ? (
        <div className="left splitter">
          <Link to={"/"}>🪞</Link>
          <Link to={"wardrobe/"}>👗</Link>
          <Link to={"graphs/"}>📈</Link>
          <Link to={"about/"}>🙋</Link>
        </div>
      ) : (
        <div className="left"></div>
      )}
      <div>
        <h1>OOTD</h1>
      </div>
      {fashionista ? (
        <div className="right splitter">
          <Link to={"user/"}>👤{fashionista.user.username}</Link>
          <Link to={"logout/"}>🚪</Link>
        </div>
      ) : (
        <div className="right">
          <Link to={"login"}>🔑</Link>
        </div>
      )}
    </div>
  );
}
