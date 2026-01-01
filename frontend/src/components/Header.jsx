import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = ({ themeMode, toggleTheme }) => {
  return (
    <>
      <MainHeader>
        <NavLink to="/">
          <img
            src="/assets/healthy-leaving-nepal.png"
            alt="Healthy Living Logo"
          />
        </NavLink>
        <Nav themeMode={themeMode} toggleTheme={toggleTheme} />
      </MainHeader>
    </>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;

  img {
    height: 7rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default Header;
