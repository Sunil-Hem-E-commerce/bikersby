// Import necessary libraries
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegistrationFormContainer = styled.div`
  max-width: 420px;
  margin: 4rem auto;
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.colors.shadow};
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

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.btn};
  font-size: 3rem;
  margin-bottom: 1.6rem;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const ToggleIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
`;

const AuthHint = styled.p`
  text-align: center;
  margin-top: 1rem;
  a {
    color: ${({ theme }) => theme.colors.helper};
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState({
    email: "",
    username: "",
    password: "",
    role_id: "",
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await addUser(register);
      // Mock registration
      const mockResponse = {
        status: 201,
        error: false,
      };

      if (mockResponse && mockResponse.status === 201 && !mockResponse.error) {
        toast.success("User Registered Successfully !");
        navigate("/login"); // Navigate to login instead of home
      } else {
        toast.error("Registration Failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <RegistrationFormContainer>
        <Title>Create an Account</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Full Name:</Label>
            <Input
              type="text"
              value={register.username}
              name="username"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={register.email}
              name="email"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                value={register.password}
                name="password"
                onChange={handleChange}
                required
              />
              <ToggleIcon
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </ToggleIcon>
            </PasswordWrapper>
          </FormGroup>
          {/* <div style={{ marginBottom: "20px" }}>
          <p>Role:</p>
          <label className={{ marginRight: " 10px" }}>
            <input
              type="radio"
              name="role_id"
              value="1"
              onChange={handleChange}
            />
            Individual
          </label>
          <label>
            <input
              type="radio"
              name="role_id"
              value="2"
              onChange={handleChange}
            />
            Showroom
          </label>
          <label>
            <input
              type="radio"
              name="role_id"
              value="3"
              onChange={handleChange}
            />
            Recondition
          </label>
        </div> */}
          <SubmitButton type="submit">Register</SubmitButton>
          <AuthHint>
            Already have an account? <NavLink to="/login">Log in</NavLink>
          </AuthHint>
        </Form>
      </RegistrationFormContainer>
    </>
  );
};

export default SignUp;
