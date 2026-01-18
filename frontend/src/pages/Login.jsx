import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/login";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import axios from "axios";

const LoginForm = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signin, setSignin] = useState({
    email: "",
    password: "",
    role_id: "",
  });
  const [uiMsg, setUiMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.defer = true;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });

  const handleGoogleSignIn = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        toast.error("Google Client ID not configured");
        return;
      }
      await loadScript("https://accounts.google.com/gsi/client");
      // Use Google Identity Services to get ID Token
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          const idToken = response.credential;
          if (!idToken) {
            toast.error("Google sign-in failed");
            return;
          }
          try {
            const res = await axios.post("/api/login/google", { idToken });
            const payload = {
              email: res.data.email,
              accessToken: res.data.accessToken,
              id: res.data.user?.id,
            };
            setUser(payload);
            localStorage.setItem("loggedInUser", JSON.stringify(payload));
            toast.success("Logged in with Google!");
            navigate("/");
          } catch (err) {
            const msg =
              err?.response?.data?.error ||
              err?.response?.data?.message ||
              "Google login failed.";
            toast.error(msg);
          }
        },
      });
      window.google.accounts.id.prompt();
    } catch (e) {
      toast.error("Unable to load Google SDK");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
      if (!appId) {
        toast.error("Facebook App ID not configured");
        return;
      }
      await loadScript("https://connect.facebook.net/en_US/sdk.js");
      window.fbAsyncInit = function () {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: false,
          version: "v16.0",
        });
        window.FB.login(
          async (response) => {
            if (response.authResponse) {
              try {
                const accessToken = response.authResponse.accessToken;
                const res = await axios.post("/api/login/facebook", {
                  accessToken,
                });
                const payload = {
                  email: res.data.email,
                  accessToken: res.data.accessToken,
                  id: res.data.user?.id,
                };
                setUser(payload);
                localStorage.setItem("loggedInUser", JSON.stringify(payload));
                toast.success("Logged in with Facebook!");
                navigate("/");
              } catch (err) {
                const msg =
                  err?.response?.data?.error ||
                  err?.response?.data?.message ||
                  "Facebook login failed.";
                toast.error(msg);
              }
            } else {
              toast.error("Facebook login cancelled");
            }
          },
          { scope: "email" }
        );
      };
    } catch (e) {
      toast.error("Unable to load Facebook SDK");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email: signin.email,
        password: signin.password,
      });
      if (response.status === 200) {
        const payload = {
          email: response.data.email,
          accessToken: response.data.accessToken,
          id: response.data.user?.id,
        };
        setUser(payload);
        localStorage.setItem("loggedInUser", JSON.stringify(payload));
        toast.success("User Logged In successfully!");
        setUiMsg({ type: "success", text: "Welcome back! You're logged in." });
        navigate("/");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Login failed. Please check your email and password.";
      toast.error(msg);
      setUiMsg({ type: "error", text: msg });
    }
  };

  return (
    <Container>
      <Title>Login to Your Account</Title>
      {uiMsg.text ? (
        <AlertBox data-type={uiMsg.type}>{uiMsg.text}</AlertBox>
      ) : null}
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
      <SocialContainer>
        <OrDivider>
          <span>OR</span>
        </OrDivider>
        <ButtonRow>
          <SocialButton className="google" onClick={handleGoogleSignIn}>
            <FaGoogle /> Sign in with Google
          </SocialButton>
          <SocialButton className="facebook" onClick={handleFacebookSignIn}>
            <FaFacebook /> Sign in with Facebook
          </SocialButton>
        </ButtonRow>
      </SocialContainer>
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

const AlertBox = styled.div`
  margin: 0 0 1.2rem 0;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  font-size: 1.4rem;
  background: ${(p) => (p["data-type"] === "success" ? "#e8f8f2" : "#fdecea")};
  color: ${(p) => (p["data-type"] === "success" ? "#0f5132" : "#842029")};
  border: 1px solid
    ${(p) => (p["data-type"] === "success" ? "#b7e4d7" : "#f5c2c7")};
`;

const SocialContainer = styled.div`
  margin-top: 2rem;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  span {
    padding: 0 0.8rem;
  }
  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;

const SocialButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  color: #fff;
  &.google {
    background: #db4437;
  }
  &.facebook {
    background: #1877f2;
  }
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    filter: brightness(1.05);
  }
`;
