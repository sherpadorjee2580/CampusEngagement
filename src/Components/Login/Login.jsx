import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; // Import Firebase Auth functions
import { auth } from "../../firebase"; // Import the auth instance from your firebase.js

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(null); // State for error messages
  const [resetEmailSent, setResetEmailSent] = useState(false); // State for password reset success

  const handleSignUp = () => {
    navigate("/signup"); // Navigate to your dedicated signup route
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, navigate to the dashboard or home page
      navigate("/");
    } catch (err) {
      // Handle Firebase authentication errors
      let errorMessage = "An unknown error occurred.";
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/invalid-credential": // For general login failures in v9+
          errorMessage = "Invalid login credentials.";
          break;
        default:
          errorMessage = err.message; // Use the raw Firebase message for others
      }
      setError(errorMessage);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    setError(null);
    setResetEmailSent(false);

    if (!email) {
      setError("Please enter your email address to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      alert("Password reset email sent! Check your inbox.");
    } catch (err) {
      let errorMessage = "Failed to send password reset email.";
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        default:
          errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };


  // Placeholder for social logins - these require separate implementation
  const handleSocialLogin = (providerName) => {
    alert(`Continue with ${providerName} is not yet implemented.`);
    // You would integrate signInWithPopup or signInWithRedirect here
    // For Google: import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider).then(...).catch(...);
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">Log in to CampusConnect</div>

        {/* Use a form to handle submission for email/password */}
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Your university email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-forgot-password">
            <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
          </div>

          <button type="submit" className="login-button login-primary">Log in</button>
          {error && <p className="login-error-message">{error}</p>}
          {resetEmailSent && <p className="login-success-message">Password reset email sent. Check your inbox.</p>}
        </form>

        <div className="login-divider">
          <span className="login-divider-text">or</span>
        </div>

        <div className="login-social-buttons">
          {/* These buttons will need their own click handlers and Firebase methods */}
          <button className="login-button login-social" onClick={() => handleSocialLogin("Email")}>
            <span className="login-social-icon">✉️</span> Continue with Email
          </button>
          <button className="login-button login-social" onClick={() => handleSocialLogin("Apple")}>
            <span className="login-social-icon"></span> Continue with Apple
          </button>
          <button className="login-button login-social" onClick={() => handleSocialLogin("Google")}>
            <span className="login-social-icon">G</span> Continue with Google
          </button>
          <button className="login-button login-social" onClick={() => handleSocialLogin("Facebook")}>
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