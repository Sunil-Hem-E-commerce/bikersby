import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OtpVerificationContainer = styled.div`
  max-width: 420px;
  margin: 4rem auto;
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.btn};
  font-size: 3rem;
  margin-bottom: 1.6rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.btn};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.border};
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.btn};
  color: #fff;
  padding: 1.2rem;
  font-size: 1.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  }
`;

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/verify-otp", { phone, otp });
      toast.success("OTP Verified Successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <OtpVerificationContainer>
      <Title>Verify Phone Number</Title>
      <p>An OTP has been sent to {phone}</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Enter OTP:</Label>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Verify OTP</SubmitButton>
      </Form>
    </OtpVerificationContainer>
  );
};

export default OtpVerification;
