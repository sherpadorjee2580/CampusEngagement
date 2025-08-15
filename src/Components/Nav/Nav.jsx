import React, { useState } from "react";
import "./Nav.css";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import auth for signOut
import { signOut } from "firebase/auth"; // Import signOut function

// Receive isAuthenticated as a prop
const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      // Optionally show a user-friendly error message
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // You could navigate to an events page with the search query, e.g.:
    // navigate(`/explore-events?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="logo.png" alt="CampusConnect Logo" />
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
          {isAuthenticated ? (
            // If authenticated, show Log Out button
            <button onClick={handleLogout} className="auth-link">
              Log Out
            </button>
          ) : (
            // If NOT authenticated, show Log In and Sign Up buttons
            <>
              <button onClick={handleLogin} className="auth-link">
                Log In
              </button>
              <button onClick={handleSignUp} className="auth-link">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
