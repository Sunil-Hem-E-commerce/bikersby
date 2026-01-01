import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signin, setSignin] = useState({
    email: "",
    password: "",
    role_id: "",
  });

  const handleChange = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mockResponse = {
      status: 200,
      data: {
        name: "Test User",
        email: signin.email,
        accessToken: "dummy-token",
        role: "user",
      },
    };

    if (mockResponse.status === 200) {
      navigate("/");
      setUser(mockResponse.data);
      localStorage.setItem("loggedInUser", JSON.stringify(mockResponse.data));
      toast.success("User Logged In sucessfully !");
    }
  };

  return (
    <Container>
      <Title>Login to Your Account</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={signin.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={signin.password}
              onChange={handleChange}
              required
            />
            <ToggleIcon
              onClick={() => setShowPassword(!showPassword)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }
              }}
              tabIndex={0}
              role="button"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </ToggleIcon>
          </PasswordWrapper>
        </FormGroup>
        <SubmitButton type="submit">Login</SubmitButton>
        <AuthHint>
          New here? <NavLink to="/signup">Create an account</NavLink>
        </AuthHint>
      </Form>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  max-width: 420px;
  margin: 4rem auto;
  padding: 2.4rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
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
  gap: 1.6rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
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

const AuthHint = styled.p`
  text-align: center;
  margin-top: 1rem;
  a {
    color: ${({ theme }) => theme.colors.helper};
  }
`;
