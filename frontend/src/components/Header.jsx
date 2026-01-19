import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="px-[4.8rem] h-[10rem] bg-[#F6F8FA] flex justify-between items-center relative shadow-md z-[999]">
      <NavLink to="/">
        <img
          src="/assets/healthy-leaving-nepal.png"
          alt="Healthy Living Logo"
          className="h-[7rem] transition-transform duration-300 hover:scale-105"
        />
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
