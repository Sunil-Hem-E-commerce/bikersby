// LoginForm.js

import React, { useState } from "react";
import { postUser } from "../services/login";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setUpdate }) => {
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
    const response = await postUser(signin);
    if (response.status === 200) {
      // localStorage.setItem("token", response.data.token);
      navigate("/");
      setUpdate(response.data.token);
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
        <div style={{ marginBottom: "20px" }}>
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
