import React from "react";
import logo from "./images/logo.png";

export default function Header() {
  return (
    <nav>
      <div className="container-md">
        <a className="navbar-brand fs-2" href="/">
          <img
            src={logo}
            style={{ width: 110, height: 110, margin:20}}
            alt="Logo"
          />
        </a>
      </div>
    </nav>
  );
}