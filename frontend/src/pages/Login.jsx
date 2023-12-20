// LoginForm.jsx

import React, { useState } from "react";
import { loginUser } from "../services/login";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const LoginForm = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
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
    const response = await loginUser(signin);
    if (response.status === 200) {
      navigate("/");
      setUser(response.data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <p
        style={{
          textAlign: "center",
          paddingBottom: "4px",
          color: "blue",
          fontSize: "3rem",
        }}
      >
        Login to Your Account
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={signin.email}
            onChange={handleChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p>Password:</p>
          <input
            type="password"
            name="password"
            value={signin.password}
            onChange={handleChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
