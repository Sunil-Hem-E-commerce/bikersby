import React, { useEffect, useState } from "react";
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
      <section className="py-[9rem] bg-[#F6F8FA]">
        <div className="max-w-[600px] bg-white p-[4rem] rounded-[1rem] shadow-lg text-center mx-auto">
          <h2 className="text-[3rem] font-bold">Processing Payment...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-[9rem] bg-[#F6F8FA] print:p-0 print:bg-white">
      <div className="max-w-[600px] bg-white p-[4rem] rounded-[1rem] shadow-lg text-center mx-auto print:shadow-none print:w-full print:max-w-none print:absolute print:top-0 print:left-0">
        <div className="text-[5rem] text-[#2ecc71] mb-[2rem] flex justify-center">
          <FaCheckCircle />
        </div>
        <h2 className="mb-[1rem] text-[#2ecc71] text-[3rem] font-bold">Payment Successful!</h2>
        <p className="mb-[3rem] text-[1.8rem]">Thank you for your purchase.</p>

        <div className="mb-[3rem] text-left bg-[#f9f9f9] p-[2rem] rounded-[0.5rem]">
          <div className="flex justify-between mb-[1rem] text-[1.6rem]">
            <span>Transaction ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="flex justify-between mb-[1rem] text-[1.6rem]">
            <span>Date:</span>
            <span>{order.date}</span>
          </div>
          <div className="flex justify-between mb-[1rem] text-[1.6rem]">
            <span>Payment Method:</span>
            <span className="uppercase font-medium">{order.method}</span>
          </div>
          <div className="flex justify-between mb-[1rem] text-[1.6rem]">
            <span>Reference ID:</span>
            <span>{order.refId}</span>
          </div>
          <div className="flex justify-between mb-[1rem] text-[1.8rem] font-bold border-t border-dashed border-[#ccc] pt-[1rem] mt-[1rem]">
            <span>Total Amount:</span>
            <span><FormatPrice price={order.amount} /></span>
          </div>
        </div>

        {order.items.length > 0 && (
          <div className="text-left mb-[3rem]">
            <h3 className="text-[1.8rem] mb-[1rem] font-bold">Order Details</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-[1rem] border-b border-[#eee] text-left text-[1.4rem] font-semibold bg-[#f0f0f0]">Item</th>
                  <th className="p-[1rem] border-b border-[#eee] text-left text-[1.4rem] font-semibold bg-[#f0f0f0]">Qty</th>
                  <th className="p-[1rem] border-b border-[#eee] text-left text-[1.4rem] font-semibold bg-[#f0f0f0]">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-[1rem] border-b border-[#eee] text-left text-[1.4rem]">{item.name}</td>
                    <td className="p-[1rem] border-b border-[#eee] text-left text-[1.4rem]">{item.qty}</td>
                    <td className="p-[1rem] border-b border-[#eee] text-left text-[1.4rem]"><FormatPrice price={item.price} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center gap-[2rem] flex-wrap print:hidden">
          <Button onClick={() => window.print()}>
            <FaPrint /> Print Receipt
          </Button>
          <NavLink to="/">
            <Button className="bg-white text-[#6254F3] border border-[#6254F3] hover:bg-[#6254F3] hover:text-white">Go to Home</Button>
          </NavLink>
          <NavLink to="/transactions">
            <Button className="bg-white text-[#6254F3] border border-[#6254F3] hover:bg-[#6254F3] hover:text-white">Transaction History</Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
