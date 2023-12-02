// Import necessary libraries
import React, { useState } from "react";
import styled from "styled-components";
import { postUser } from "../services/user";

const RegistrationFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;

const SignUp = () => {
  const [register, setRegister] = useState({
    user_email: "",
    user_name: "",
    password: "",
    role_id: "",
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postUser(register);
    console.log(response);
    // if (response) {

    // }
  };

  return (
    <RegistrationFormContainer>
      <p
        style={{
          textAlign: "center",
          paddingBottom: "4px",
          color: "blue",
          fontSize: "3rem",
        }}
      >
        Create an Account
      </p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name:</Label>
          <Input
            type="text"
            value={register.user_name}
            name="user_name"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={register.user_email}
            name="user_email"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            value={register.password}
            name="password"
            onChange={handleChange}
            required
          />
        </FormGroup>
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
        <SubmitButton type="submit">Register</SubmitButton>
      </Form>
    </RegistrationFormContainer>
  );
};

export default SignUp;
