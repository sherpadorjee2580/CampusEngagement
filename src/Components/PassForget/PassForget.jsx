import React from "react";
import "./PassForget.css";

const Forward = () => {
  return (
    <div className="forward">
      <div className="forward-container">
        <div className="forward-logo">
          <div className="logo-placeholder">★ logo</div>
        </div>
        <div className="forward-title">Forgot Password?</div>
        <div className="forward-description">
          Enter your university email address to receive a password reset link.
        </div>
        <div className="forward-form">
          <input type="email" placeholder="Your university email address" />
          <button className="forward-button">Send Reset Link</button>
        </div>
      </div>
    </div>
  );
};

export default Forward;
