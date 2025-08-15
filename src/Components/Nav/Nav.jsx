import React from "react";
import "./Nav.css";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#communities">Communities</a>
          <a href="">Services</a>
        </div>

        <div className="navbar-auth">
          <button className="add-event-btn">Add Event</button>
          <button onClick={handleLogin} className="auth-link">
            Log In
          </button>
          <button onClick={handleSignUp} className="auth-link">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
