import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`px-6 md:px-[4.8rem] h-[8rem] md:h-[10rem] flex justify-between items-center fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled
          ? "glass bg-white/80 shadow-md h-[7rem] md:h-[8rem]"
          : "bg-[#f8fafc]"
      }`}
    >
      <NavLink to="/" className="flex items-center">
        <img
          src="/assets/healthy-leaving-nepal.png"
          alt="Healthy Living Logo"
          className={`transition-all duration-300 ${scrolled ? "h-[5rem]" : "h-[6rem] md:h-[7rem]"} hover:scale-105 drop-shadow-sm`}
        />
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
