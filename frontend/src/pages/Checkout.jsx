import React, { useState } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
import KhaltiCheckout from "khalti-checkout-web";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, total_price, shipping_fee } = useCartContext();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  const totalAmount = total_price + shipping_fee;
  // eSewa requires unique Product ID.
  const pid = `HL-${Date.now()}`;
  const successUrl = `${window.location.origin}/payment-success?q=su&oid=${pid}&amt=${totalAmount}&refId=test_ref`;
  const failureUrl = `${window.location.origin}/payment-failure`;

  // Khalti Config
  let config = {
    // "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    productIdentity: pid,
    productName: "Healthy Living Products",
    productUrl: "http://localhost:5173",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for verification
        console.log(payload);
        navigate(
          `/payment-success?q=su&oid=${pid}&amt=${totalAmount}&refId=${payload.idx}&method=khalti`
        );
      },
      // onError handler is optional
      onError(error) {
        console.log(error);
        navigate("/payment-failure");
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const checkout = new KhaltiCheckout(config);

  const saveTempCart = () => {
    localStorage.setItem("tempCart", JSON.stringify(cart));
  };

  const handleKhaltiPayment = () => {
    saveTempCart();
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    // However, for testing we can use the total amount.
    // Khalti takes amount in paisa (Rs * 100)
    checkout.show({ amount: totalAmount * 100 });
  };

  const handleConnectIPS = () => {
    saveTempCart();
    // Simulate ConnectIPS
    // In real scenario, this would post to ConnectIPS gateway
    setTimeout(() => {
      navigate(
        `/payment-success?q=su&oid=${pid}&amt=${totalAmount}&refId=CIPS-${Date.now()}&method=connectips`
      );
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <Wrapper>
        <div className="container">
          <h3>Your cart is empty. Cannot proceed to checkout.</h3>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="name">{item.name}</p>
                    <p>
                      {item.qty} x <FormatPrice price={item.price} />
                    </p>
                  </div>
                </div>
              ))}
              <hr />
              <div className="totals">
                <p>
                  Subtotal: <FormatPrice price={total_price} />
                </p>
                <p>
                  Shipping: <FormatPrice price={shipping_fee} />
                </p>
                <p className="total-amount">
                  Total: <FormatPrice price={totalAmount} />
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-section">
            <h3>Select Payment Method</h3>
            <div className="payment-options">
              <div
                className={`payment-option ${
                  paymentMethod === "esewa" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("esewa")}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setPaymentMethod("esewa");
                  }
                }}
              >
                <img
                  src="https://esewa.com.np/common/images/esewa_logo.png"
                  alt="eSewa"
                />
                <span>eSewa Mobile Wallet</span>
              </div>
              <div
                className={`payment-option ${
                  paymentMethod === "khalti" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("khalti")}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setPaymentMethod("khalti");
                  }
                }}
              >
                <img
                  src="https://khalti.com.np/common/images/khalti_logo.png"
                  alt="Khalti"
                />
                <span>Khalti Digital Wallet</span>
              </div>
              <div
                className={`payment-option ${
                  paymentMethod === "connectips" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("connectips")}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setPaymentMethod("connectips");
                  }
                }}
              >
                <img
                  src="https://www.connectips.com/images/connectips_logo.png"
                  alt="ConnectIPS"
                />
                <span>ConnectIPS</span>
              </div>
            </div>

            <div className="payment-action">
              {paymentMethod === "esewa" && (
                <form
                  action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                  method="POST"
                >
                  <input
                    type="hidden"
                    id="amount"
                    name="amount"
                    value={totalAmount}
                    required
                  />
                  <input
                    type="hidden"
                    id="tax_amount"
                    name="tax_amount"
                    value="0"
                    required
                  />
                  <input
                    type="hidden"
                    id="total_amount"
                    name="total_amount"
                    value={totalAmount}
                    required
                  />
                  <input
                    type="hidden"
                    id="transaction_uuid"
                    name="transaction_uuid"
                    value={pid}
                    required
                  />
                  <input
                    type="hidden"
                    id="product_code"
                    name="product_code"
                    value="EPAYTEST"
                    required
                  />
                  <input
                    type="hidden"
                    id="product_service_charge"
                    name="product_service_charge"
                    value="0"
                    required
                  />
                  <input
                    type="hidden"
                    id="product_delivery_charge"
                    name="product_delivery_charge"
                    value="0"
                    required
                  />
                  <input
                    type="hidden"
                    id="success_url"
                    name="success_url"
                    value={successUrl}
                    required
                  />
                  <input
                    type="hidden"
                    id="failure_url"
                    name="failure_url"
                    value={failureUrl}
                    required
                  />
                  <input
                    type="hidden"
                    id="signed_field_names"
                    name="signed_field_names"
                    value="total_amount,transaction_uuid,product_code"
                    required
                  />
                  <input
                    type="hidden"
                    id="signature"
                    name="signature"
                    value=""
                    required
                  />{" "}
                  {/* In real V2, signature is required. For test, sometimes ignored or need generic generation. */}
                  {/* Note: eSewa V2 requires signature. For simplicity in this demo without backend signing, 
                      we might fallback to V1 Legacy if V2 blocks us, or mock the success flow if V2 is strict about signature.
                      The legacy URL is https://uat.esewa.com.np/epay/main
                   */}
                  {/* Trying Legacy Form for easier integration without backend signature generation if V2 fails */}
                </form>
              )}

              {/* Re-implementing eSewa Legacy Form for Simplicity/Demo as V2 needs HmacSHA256 signature */}
              {paymentMethod === "esewa" && (
                <form action="https://uat.esewa.com.np/epay/main" method="POST">
                  <input value={totalAmount} name="tAmt" type="hidden" />
                  <input value={totalAmount} name="amt" type="hidden" />
                  <input value="0" name="txAmt" type="hidden" />
                  <input value="0" name="psc" type="hidden" />
                  <input value="0" name="pdc" type="hidden" />
                  <input value="EPAYTEST" name="scd" type="hidden" />
                  <input value={pid} name="pid" type="hidden" />
                  <input value={successUrl} type="hidden" name="su" />
                  <input value={failureUrl} type="hidden" name="fu" />
                  <Button type="submit" onClick={saveTempCart}>
                    Pay with eSewa
                  </Button>
                </form>
              )}

              {paymentMethod === "khalti" && (
                <Button onClick={handleKhaltiPayment}>Pay with Khalti</Button>
              )}

              {paymentMethod === "connectips" && (
                <Button onClick={handleConnectIPS}>Pay with ConnectIPS</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-two-column {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }

  .order-summary {
    background: #fff;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};

    h3 {
      margin-bottom: 2rem;
    }

    .summary-item {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      align-items: center;

      img {
        width: 6rem;
        height: 6rem;
        object-fit: cover;
        border-radius: 50%;
      }

      .name {
        font-weight: bold;
        text-transform: capitalize;
      }
    }

    .totals {
      margin-top: 2rem;
      text-align: right;

      p {
        margin-bottom: 0.5rem;
      }

      .total-amount {
        font-size: 2.4rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .payment-section {
    background: #fff;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};

    h3 {
      margin-bottom: 2rem;
    }

    .payment-options {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .payment-option {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        border-color: ${({ theme }) => theme.colors.btn};
        background-color: #f0f4f8;
      }

      img {
        height: 4rem;
        object-fit: contain;
      }

      span {
        font-size: 1.8rem;
        font-weight: 500;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-two-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Checkout;
