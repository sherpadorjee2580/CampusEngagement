import React from "react";
import "./Nav.css";
import { IoMdSearch } from "react-icons/io";

const Navbar = () => {
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
          <a href="#login" className="auth-link">
            Log In
          </a>
          <a href="#signup" className="auth-link">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
