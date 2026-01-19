import React from "react";
import { NavLink } from "react-router-dom";

const PageNavigation = ({ title }) => {
  return (
    <section className="h-[10rem] bg-[#F6F8FA] flex justify-start items-center text-[3.2rem] pl-[1.2rem]">
      <NavLink to="/products" className="text-[#6254F3]">Products</NavLink>/{title}
    </section>
  );
};

export default PageNavigation;
