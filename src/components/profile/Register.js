import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/register.css";

/*
 Register component allows users to create a new account by entering their personal details.
 It validates the inputs and dispatches the user details to the Redux store if valid.
 */
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate form inputs before submission
  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password pattern: min 8 chars, 1 letter, 1 number

    // Validate email format
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Validate password format
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters long, with at least one letter and one number."
      );
      return false;
    }

    // Check for empty fields
    if (!firstName || !surname || !username) {
      setError("Please fill in all the fields.");
      return false;
    }

    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Dispatch user details to Redux store
      dispatch({
        type: "SET_USER",
        payload: { username, isAuthenticated: true },
      });

      // Optionally, save user data to local storage or backend

      // Redirect user to the login page after successful registration
      navigate("/login");
    }
  };

  return (
    <div id="register-container">
      <h2 id="register-title">Register</h2>
      {error && (
        <Alert id="alert-message" variant="danger">
          {error}
        </Alert>
      )}{" "}
      {/* Show error message if validation fails */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName" id="form-group">
          <Form.Label id="form-label">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="form-control"
          />
        </Form.Group>

        <Form.Group controlId="formSurname" id="form-group">
          <Form.Label id="form-label">Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            id="form-control"
          />
        </Form.Group>

        <Form.Group controlId="formUsername" id="form-group">
          <Form.Label id="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="form-control"
          />
        </Form.Group>

        <Form.Group controlId="formEmail" id="form-group">
          <Form.Label id="form-label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="form-control"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" id="form-group">
          <Form.Label id="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="form-control"
          />
        </Form.Group>

        <Button id="submit-btn" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
