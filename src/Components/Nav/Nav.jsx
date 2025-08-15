import React, { useState } from "react";
import "./Nav.css";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // State to hold the search input value
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  // Function to handle the search submission
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here you would typically navigate to a search results page
    // or filter a list of items based on the searchQuery.
    // For example: navigate(`/search?query=${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="logo.png" alt="Logo" />
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
