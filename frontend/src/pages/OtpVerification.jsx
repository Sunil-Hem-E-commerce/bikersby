import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OtpVerification = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/users/verify-email?token=${encodeURIComponent(code)}`,
      );
      toast.success(response.data?.message || "Email verified successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Invalid or expired verification code",
      );
    }
  };

  return (
    <div className="max-w-[420px] mx-auto my-[4rem] p-[2.4rem] border border-gray-200 rounded-[12px] bg-white shadow-lg">
      <h2 className="text-center text-[#6254F3] text-[3rem] mb-[1.6rem]">
        Verify Email
      </h2>
      <p className="text-[1.6rem] mb-[2rem] text-center">
        Enter the verification code sent to your email.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-[20px]">
          <label
            htmlFor="verificationCode"
            className="text-[14px] mb-[8px] block"
          >
            Verification Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="p-[1rem] text-[1.6rem] border border-gray-200 rounded-[8px] w-full transition-all focus:outline-none focus:border-[#6254F3] focus:ring-2 focus:ring-[#6254F3]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#6254F3] text-white p-[1.2rem] text-[1.6rem] border-none rounded-[8px] cursor-pointer hover:-translate-y-[1px] hover:shadow-lg transition-all"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
