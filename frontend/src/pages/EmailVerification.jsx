import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";

const VerificationContainer = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2.4rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.btn};
  font-size: 3rem;
  margin-bottom: 1.6rem;
`;

const Message = styled.p`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

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
            `/api/users/verify-email?token=${token}`
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
    <VerificationContainer>
      <Title>Email Verification</Title>
      <Message>{message}</Message>
    </VerificationContainer>
  );
};

export default EmailVerification;
