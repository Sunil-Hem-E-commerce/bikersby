// LoginForm.js

import React, { useState } from "react";

const LoginForm = () => {
  const [sigin, setSignin] = useState({ email: "", password: "", role_id: "" });

  const handleChange = (e) => {
    setSignin({ ...sigin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            value={sigin.email}
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
            value={sigin.password}
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
