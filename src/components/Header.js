import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/header.css";

/*
  Header component displays the navigation bar with links to the store, cart, 
  and user authentication options (login, register, logout).
 */
const Header = () => {
  const { user, cart } = useSelector((state) => state); // Get user and cart from Redux store
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" }); // Dispatch logout action
  };

  return (
    <Navbar id="header-container" bg="dark" variant="dark">
      <Navbar.Brand id="header-logo" as={Link} to="/">
        Web Store
      </Navbar.Brand>
      <Nav id="header-nav" className="mr-auto">
        <Nav.Link id="header-nav-link" as={Link} to="/store">
          Store
        </Nav.Link>
        <Nav.Link id="header-nav-link" as={Link} to="/cart">
          Cart ({cart.items.length})
        </Nav.Link>
      </Nav>
      <Nav>
        {user.isAuthenticated ? (
          <>
            <Nav.Link id="header-user-welcome" disabled>
              Welcome, {user.username}
            </Nav.Link>
            <Nav.Link id="header-logout" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link id="header-login-register" as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link id="header-login-register" as={Link} to="/register">
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
