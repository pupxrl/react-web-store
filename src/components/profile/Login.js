import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";

/*
 Login component allows users to log in using their username and password.
 It validates the credentials and redirects the user upon successful login.
 */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registeredUsername = useSelector((state) => state.user.username); // Get registered username from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate login credentials
  const validateLogin = () => {
    if (username !== registeredUsername) {
      setError("Invalid username or password.");
      return false;
    }
    if (!password) {
      setError("Please enter a password.");
      return false;
    }
    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateLogin()) {
      // Dispatch action to set user authentication status in Redux
      dispatch({
        type: "SET_USER",
        payload: { username, isAuthenticated: true },
      });
      navigate("/"); // Redirect to home page upon successful login
    }
  };

  return (
    <div id="login-container">
      <h2 id="login-title">Login</h2>
      {error && (
        <Alert id="alert-message" variant="danger">
          {error}
        </Alert>
      )}{" "}
      {/* Show error message if any */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" id="form-group">
          <Form.Label id="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
