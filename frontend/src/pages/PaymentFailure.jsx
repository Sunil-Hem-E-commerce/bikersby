import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailure = () => {
  return (
    <section className="py-[9rem] bg-[#F6F8FA]">
      <div className="max-w-[600px] bg-white p-[4rem] rounded-[1rem] shadow-lg text-center mx-auto">
        <div className="text-[5rem] text-[#e74c3c] mb-[2rem] flex justify-center">
          <FaTimesCircle />
        </div>
        <h2 className="mb-[1rem] text-[#e74c3c] text-[3rem] font-bold">Payment Failed</h2>
        <p className="mb-[1rem] text-[1.6rem]">Your transaction was unsuccessful or cancelled.</p>
        <p className="mb-[1rem] text-[1.6rem]">Please try again or contact support if the issue persists.</p>

        <div className="mt-[3rem] flex justify-center gap-[2rem]">
          <NavLink to="/checkout">
            <Button>Try Again</Button>
          </NavLink>
          <NavLink to="/contact">
            <Button className="bg-white text-[#6254F3] border border-[#6254F3] hover:bg-[#6254F3] hover:text-white">Contact Support</Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default PaymentFailure;
