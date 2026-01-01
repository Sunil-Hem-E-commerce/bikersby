import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailure = () => {
  return (
    <Wrapper>
      <div className="container failure-container">
        <div className="failure-icon">
          <FaTimesCircle />
        </div>
        <h2>Payment Failed</h2>
        <p>Your transaction was unsuccessful or cancelled.</p>
        <p>Please try again or contact support if the issue persists.</p>

        <div className="actions">
          <NavLink to="/checkout">
            <Button>Try Again</Button>
          </NavLink>
          <NavLink to="/contact">
            <Button className="btn-secondary">Contact Support</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .failure-container {
    max-width: 600px;
    background: #fff;
    padding: 4rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    text-align: center;
    margin: 0 auto;
  }

  .failure-icon {
    font-size: 5rem;
    color: #e74c3c;
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
    color: #e74c3c;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }

  .actions {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    gap: 2rem;

    .btn-secondary {
      background-color: #fff;
      color: ${({ theme }) => theme.colors.btn};
      border: 1px solid ${({ theme }) => theme.colors.btn};

      &:hover {
        background-color: ${({ theme }) => theme.colors.btn};
        color: #fff;
      }
    }
  }
`;

export default PaymentFailure;
