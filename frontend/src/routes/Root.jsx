import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Root() {
  return (
    <div id="app">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
