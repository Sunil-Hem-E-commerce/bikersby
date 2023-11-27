import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Hearder = () => {
  return (
    <>
      <MainHeader>
        <NavLink to="/">
          <h2
            style={{
              color: "white",
              fontWeight: "2rem",
              backgroundColor: "purple",
              fontSize: "3rem",
              border: "2px solid black",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            BikersBy
          </h2>
        </NavLink>
        <Nav />
      </MainHeader>
    </>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export default Hearder;
