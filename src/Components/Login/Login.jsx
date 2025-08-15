import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">Log in to CampusConnect</div>

        <div className="login-form">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Your university email" />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />

          <div className="login-forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="login-button login-primary">Log in</button>
        </div>

        <div className="login-divider">
          <span className="login-divider-text">or</span>
        </div>

        <div className="login-social-buttons">
          <button className="login-button login-social">
            <span className="login-social-icon">✉️</span> Continue with Email
          </button>
          <button className="login-button login-social">
            <span className="login-social-icon"></span> Continue with Apple
          </button>
          <button className="login-button login-social">
            <span className="login-social-icon">G</span> Continue with Google
          </button>
          <button className="login-button login-social">
            <span className="login-social-icon">f</span> Continue with Facebook
          </button>
        </div>

        <div className="login-signup">
          <span>
            Don't have an account? <a onClick={handleSignUp}>Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
