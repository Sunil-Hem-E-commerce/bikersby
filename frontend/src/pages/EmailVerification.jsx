import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        try {
          const response = await axios.get(
            `/api/users/verify-email?token=${token}`,
          );
          setMessage(response.data.message);
          toast.success(response.data.message);
        } catch (error) {
          const errorMessage =
            error.response?.data?.error || "Email verification failed.";
          setMessage(errorMessage);
          toast.error(errorMessage);
        }
      } else {
        setMessage("Invalid verification link.");
        toast.error("Invalid verification link.");
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div className="max-w-[600px] mx-auto my-[4rem] p-[2.4rem] text-center border border-gray-200 rounded-[12px] bg-white shadow-lg">
      <h2 className="text-[#6254F3] text-[3rem] mb-[1.6rem]">
        Email Verification
      </h2>
      <p className="text-[1.8rem] text-gray-700">{message}</p>
    </div>
  );
};

export default EmailVerification;
