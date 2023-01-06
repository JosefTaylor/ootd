import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Root() {
  return (
    <div className="global-stack">
      <Header />
      <main className="field">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
