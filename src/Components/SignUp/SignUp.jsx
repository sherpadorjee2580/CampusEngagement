import React from 'react';
import './SignUp.css';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-logo">
          <img src={"logo2.png"} alt="Logo" />
        </div>
        <h2 className="signup-main-title">Account Information</h2>
        <p className="signup-subtitle">Let's get you signed up to connect with your community.</p>
        <div className="signup-steps">
          <button className="step-active">Account Information</button>
          <button className="step-inactive">Personal Details</button>
          <button className="step-inactive">University Affiliation</button>
        </div>

        <h3 className="signup-welcome">Welcome to CampusConnect!</h3>
        <p className="signup-choose">Choose how you'd like to sign up:</p>

        <div className="signup-social-buttons">
          <button className="social-button google">
            <FaGoogle className="social-icon" /> Sign up with Google
          </button>
          <button className="social-button facebook">
            <FaFacebook className="social-icon" /> Sign up with Facebook
          </button>
        </div>

        <div className="signup-apple-button-container">
          <button className="social-button apple">
            <FaApple className="social-icon" /> Sign up with Apple
          </button>
        </div>

        <div className="signup-or">or</div>

        <div className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="your.email@example.edu" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a strong password" />
          </div>
          <button className="signup-next-button">Next</button>
        </div>

        <p className="signup-login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
