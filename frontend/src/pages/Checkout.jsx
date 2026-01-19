import React, { useState } from "react";
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
          `/payment-success?q=su&oid=${pid}&amt=${totalAmount}&refId=${payload.idx}&method=khalti`,
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
        `/payment-success?q=su&oid=${pid}&amt=${totalAmount}&refId=CIPS-${Date.now()}&method=connectips`,
      );
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <section className="py-[9rem]">
        <div className="max-w-[120rem] mx-auto px-[3.2rem]">
          <h3 className="text-[2.4rem] font-bold">
            Your cart is empty. Cannot proceed to checkout.
          </h3>
        </div>
      </section>
    );
  }

  return (
    <section className="py-[9rem] bg-[#F6F8FA]">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5rem]">
          {/* Order Summary */}
          <div className="bg-white p-[3rem] rounded-[1rem] shadow-lg">
            <h3 className="text-[2rem] font-bold mb-[2rem]">Order Summary</h3>
            <div className="flex flex-col">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-[2rem] mb-[2rem] items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[6rem] h-[6rem] object-cover rounded-full"
                  />
                  <div>
                    <p className="font-bold capitalize text-[1.6rem]">
                      {item.name}
                    </p>
                    <p className="text-[1.4rem]">
                      {item.qty} x <FormatPrice price={item.price} />
                    </p>
                  </div>
                </div>
              ))}
              <hr className="my-[2rem] border-gray-200" />
              <div className="text-right mt-[2rem]">
                <p className="mb-[0.5rem] text-[1.6rem]">
                  Subtotal: <FormatPrice price={total_price} />
                </p>
                <p className="mb-[0.5rem] text-[1.6rem]">
                  Shipping: <FormatPrice price={shipping_fee} />
                </p>
                <p className="text-[2.4rem] font-bold text-[#6254F3]">
                  Total: <FormatPrice price={totalAmount} />
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-[3rem] rounded-[1rem] shadow-lg">
            <h3 className="text-[2rem] font-bold mb-[2rem]">
              Select Payment Method
            </h3>
            <div className="flex flex-col gap-[2rem] mb-[3rem]">
              <div
                className={`flex items-center gap-[2rem] p-[1.5rem] border border-[#ddd] rounded-[1rem] cursor-pointer transition-all duration-300 ${
                  paymentMethod === "esewa"
                    ? "border-[#6254F3] bg-[#f0f4f8]"
                    : ""
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
                  className="h-[4rem] object-contain"
                />
                <span className="text-[1.8rem] font-medium">
                  eSewa Mobile Wallet
                </span>
              </div>
              <div
                className={`flex items-center gap-[2rem] p-[1.5rem] border border-[#ddd] rounded-[1rem] cursor-pointer transition-all duration-300 ${
                  paymentMethod === "khalti"
                    ? "border-[#6254F3] bg-[#f0f4f8]"
                    : ""
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
                  className="h-[4rem] object-contain"
                />
                <span className="text-[1.8rem] font-medium">
                  Khalti Digital Wallet
                </span>
              </div>
              <div
                className={`flex items-center gap-[2rem] p-[1.5rem] border border-[#ddd] rounded-[1rem] cursor-pointer transition-all duration-300 ${
                  paymentMethod === "connectips"
                    ? "border-[#6254F3] bg-[#f0f4f8]"
                    : ""
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
                  className="h-[4rem] object-contain"
                />
                <span className="text-[1.8rem] font-medium">ConnectIPS</span>
              </div>
            </div>

            <div className="mt-[2rem]">
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
                  <Button
                    type="submit"
                    onClick={saveTempCart}
                    className="w-full"
                  >
                    Pay with eSewa
                  </Button>
                </form>
              )}

              {paymentMethod === "khalti" && (
                <Button onClick={handleKhaltiPayment} className="w-full">
                  Pay with Khalti
                </Button>
              )}

              {paymentMethod === "connectips" && (
                <Button onClick={handleConnectIPS} className="w-full">
                  Pay with ConnectIPS
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
