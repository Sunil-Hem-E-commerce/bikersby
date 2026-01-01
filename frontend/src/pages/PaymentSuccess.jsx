import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams, NavLink } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import { Button } from "../styles/Button";
import FormatPrice from "../Helpers/FormatPrice";
import { FaCheckCircle, FaPrint } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCartContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const oid = searchParams.get("oid");
    const amt = searchParams.get("amt");
    const refId = searchParams.get("refId");
    const method = searchParams.get("method") || "esewa"; // Default to esewa if not specified (eSewa callback might not have method param)

    const tempCart = JSON.parse(localStorage.getItem("tempCart") || "[]");

    if (oid && tempCart.length > 0) {
      const newOrder = {
        id: oid,
        date: new Date().toLocaleString(),
        amount: amt,
        method: method,
        refId: refId,
        items: tempCart,
        status: "Success",
      };

      // Save to transactions history
      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      // Check if transaction already exists (deduplication for refreshes)
      const exists = transactions.find((t) => t.id === oid);
      if (!exists) {
        transactions.unshift(newOrder);
        localStorage.setItem("transactions", JSON.stringify(transactions));
      } else {
          setOrder(exists); // If exists, show existing
          localStorage.removeItem("tempCart");
          clearCart();
          return;
      }

      setOrder(newOrder);
      
      // Clear carts
      localStorage.removeItem("tempCart");
      clearCart();
    } else if (oid) {
         // Fallback if tempCart is gone but we have OID (e.g. refresh)
         const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
         const exists = transactions.find((t) => t.id === oid);
         if (exists) {
             setOrder(exists);
         } else {
             // Just show basic info
             setOrder({
                 id: oid,
                 amount: amt,
                 refId: refId,
                 method: method,
                 items: [],
                 date: new Date().toLocaleString(),
                 status: "Success"
             });
         }
    }
  }, []);

  if (!order) {
    return (
      <Wrapper>
        <div className="container">
          <h2>Processing Payment...</h2>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container receipt-container">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h2>Payment Successful!</h2>
        <p className="thank-you">Thank you for your purchase.</p>

        <div className="receipt-details">
          <div className="row">
            <span>Transaction ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="row">
            <span>Date:</span>
            <span>{order.date}</span>
          </div>
          <div className="row">
            <span>Payment Method:</span>
            <span className="method">{order.method}</span>
          </div>
          <div className="row">
            <span>Reference ID:</span>
            <span>{order.refId}</span>
          </div>
          <div className="row total-row">
            <span>Total Amount:</span>
            <span><FormatPrice price={order.amount} /></span>
          </div>
        </div>

        {order.items.length > 0 && (
          <div className="order-items">
            <h3>Order Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td><FormatPrice price={item.price} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="actions">
          <Button onClick={() => window.print()}>
            <FaPrint /> Print Receipt
          </Button>
          <NavLink to="/">
            <Button className="btn-secondary">Go to Home</Button>
          </NavLink>
          <NavLink to="/transactions">
            <Button className="btn-secondary">Transaction History</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .receipt-container {
    max-width: 600px;
    background: #fff;
    padding: 4rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    text-align: center;
    margin: 0 auto;
  }

  .success-icon {
    font-size: 5rem;
    color: #2ecc71;
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
    color: #2ecc71;
  }

  .thank-you {
    margin-bottom: 3rem;
    font-size: 1.8rem;
  }

  .receipt-details {
    margin-bottom: 3rem;
    text-align: left;
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 0.5rem;

    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 1.6rem;

      &.total-row {
        font-weight: bold;
        border-top: 1px dashed #ccc;
        padding-top: 1rem;
        margin-top: 1rem;
        font-size: 1.8rem;
      }

      .method {
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }

  .order-items {
    text-align: left;
    margin-bottom: 3rem;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 1rem;
        border-bottom: 1px solid #eee;
        text-align: left;
        font-size: 1.4rem;
      }

      th {
        font-weight: 600;
        background: #f0f0f0;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;

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

  @media print {
    body * {
      visibility: hidden;
    }
    .receipt-container, .receipt-container * {
      visibility: visible;
    }
    .receipt-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      box-shadow: none;
    }
    .actions {
      display: none;
    }
  }
`;

export default PaymentSuccess;
