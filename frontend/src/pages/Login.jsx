// LoginForm.js

import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
