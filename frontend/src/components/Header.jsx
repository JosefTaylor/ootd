import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth.jsx";

export default function Header() {
  const { fashionista } = useAuth();

  const profile = (fashionista) => {
    if (fashionista) {
      return (
        <div className="header-end stack">
          <Link className="button" to={"user/"}>
            {fashionista.user.username}
          </Link>
          <Link className="button" to={"logout/"}>
            log out
          </Link>
        </div>
      );
    } else {
      return (
        <div className="header-end stack">
          <Link className="button" to={"login"}>
            log in
          </Link>
        </div>
      );
    }
  };

  const nav = (fashionista) => {
    if (fashionista) {
      return (
        <div className="header-end stack">
          <Link className="button" to={"/"}>
            home
          </Link>
          <Link className="button" to={"wardrobe/"}>
            wardrobe
          </Link>
          <Link className="button" to={"graphs/"}>
            graphs
          </Link>
          <Link className="button" to={"about/"}>
            about
          </Link>
        </div>
      );
    } else {
      return <div className="header-end stack"></div>;
    }
  };

  return (
    <div className="splitter header">
      {nav(fashionista)}
      <div>
        <h1>OOTD</h1>
      </div>
      {profile(fashionista)}
    </div>
  );
}
