import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");

  const saveUserProfileToFirestore = async (user) => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          displayName: user.displayName || "",
          createdAt: new Date(),
          bio: "",
          university: "",
        },
        { merge: true }
      );
      console.log("User profile saved/updated in Firestore for UID:", user.uid);
    } catch (firestoreError) {
      console.error("Error saving user profile to Firestore:", firestoreError);
      setError("Failed to save profile data.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await saveUserProfileToFirestore(auth.currentUser);
      navigate("/");
    } catch (err) {
      let errorMessage = "An unknown error occurred.";
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        default:
          errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setResetEmailSent(false);

    if (!email) {
      setError("Please enter your email address to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
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

  const handleSocialLogin = async (provider) => {
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserProfileToFirestore(user);

      navigate("/");
    } catch (err) {
      let errorMessage = "Social login failed. Please try again.";
      switch (err.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Login cancelled: Popup closed.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "Login cancelled. Please try again.";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage =
            "An account with this email already exists. Try logging in with your original method.";
          break;
        case "auth/auth-domain-config-required":
          errorMessage =
            "Authentication domain configuration required. Please check Firebase settings.";
          break;
        default:
          errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">Log in to CampusConnect</div>

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Your university email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <div className="login-forgot-password">
            <a href="#" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="login-button login-primary"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log in"}
          </button>
          {error && <p className="login-error-message">{error}</p>}
          {resetEmailSent && (
            <p className="login-success-message">
              Password reset email sent. Check your inbox.
            </p>
          )}
        </form>

        <div className="login-divider">
          <span className="login-divider-text">or</span>
        </div>

        <div className="login-social-buttons">
          <button
            className="login-button login-social"
            onClick={() =>
              alert(
                "Please use the email/password form above to continue with email."
              )
            }
            disabled={loading}
          >
            <span className="login-social-icon">✉️</span> Continue with Email
          </button>
          <button
            className="login-button login-social"
            onClick={() => handleSocialLogin(appleProvider)}
            disabled={loading}
          >
            <span className="login-social-icon"></span> Continue with Apple
          </button>
          <button
            className="login-button login-social"
            onClick={() => handleSocialLogin(googleProvider)}
            disabled={loading}
          >
            <span className="login-social-icon">G</span> Continue with Google
          </button>
          <button
            className="login-button login-social"
            onClick={() => handleSocialLogin(facebookProvider)}
            disabled={loading}
          >
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
