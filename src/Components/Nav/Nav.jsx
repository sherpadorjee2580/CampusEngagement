import React, { useState } from "react";
import "./Nav.css";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    
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

        {/* Search bar section */}
        <form onSubmit={handleSearch} className="navbar-search">
          <div className="search-box">
            <IoMdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="navbar-auth">
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
