import React from "react";
import logo from "../images/logo-white.svg";

export default function Header() {
  return (
    <header className="header">
      <a href="#">
        <img
          className="logo"
          src={logo}
          alt="Место"
        />
      </a>
    </header>
  );
}
