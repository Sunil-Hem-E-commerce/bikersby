import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import FormatPrice from "../Helpers/FormatPrice";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]",
    );
    setTransactions(storedTransactions);
  }, []);

  if (transactions.length === 0) {
    return (
      <Wrapper>
        <div className="container">
          <h3>No transaction history found.</h3>
          <NavLink to="/products">
            <Button>Start Shopping</Button>
          </NavLink>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        <h3>Transaction History</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Method</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.id}</td>
                  <td style={{ textTransform: "uppercase" }}>{t.method}</td>
                  <td>{t.items.length} Items</td>
                  <td>
                    <FormatPrice price={t.amount} />
                  </td>
                  <td>
                    <span className="status-success">{t.status}</span>
                  </td>
                  <td>
                    <NavLink
                      to={`/payment-success?oid=${t.id}&amt=${t.amount}&refId=${t.refId}&method=${t.method}`}
                    >
                      <Button className="btn-small">View Receipt</Button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

  h3 {
    margin-bottom: 2rem;
  }

  .table-responsive {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    border-radius: 1rem;
    overflow: hidden;

    th,
    td {
      padding: 1.5rem;
      text-align: left;
      font-size: 1.6rem;
      border-bottom: 1px solid #eee;
    }

    th {
      background-color: ${({ theme }) => theme.colors.footer_bg};
      color: #fff;
      font-weight: 500;
    }
    htmlFor="password" tr:hover {
      background-color: #f9f9f9;
    }

    .status-success {
      color: #2ecc71;
      font-weight: bold;
    }

    .btn-small {
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
    }
  }
`;

export default Transactions;
