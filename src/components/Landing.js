import React from "react";
import "./styles/landing.css";

/*
 Landing component displays the welcome message and description for the web store.
 */
const Landing = () => {
  return (
    <div id="landing-container">
      <h1 id="landing-title">Welcome to the Web Store!</h1>
      <p id="landing-description">
        Browse through our amazing products and make your purchases.
      </p>
    </div>
  );
};

export default Landing;
