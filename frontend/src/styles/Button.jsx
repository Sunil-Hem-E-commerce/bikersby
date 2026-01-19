import React from "react";

export const Button = ({ children, className, onClick, style, type }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      style={style}
      className={`max-w-auto bg-[rgb(98,84,243)] text-white py-[1.4rem] px-[2.4rem] border-none uppercase text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-95 text-[1.8rem] ${className || ""}`}
    >
      {children}
    </button>
  );
};

