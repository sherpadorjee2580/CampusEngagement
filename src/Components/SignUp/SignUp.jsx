import React, { useState } from "react";
import "./SignUp.css";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider, // For Apple
} from "firebase/auth";
import { auth, db } from "../../firebase"; // Import auth and db
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for displaying errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Providers for social logins
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const appleProvider = new OAuthProvider("apple.com"); // For Apple Sign-in

  // Function to save user data to Firestore
  const saveUserProfileToFirestore = async (user) => {
    try {
      // Use the user's UID as the document ID for their profile
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          displayName: user.displayName || "", // Use display name if available from social login
          createdAt: new Date(),
          // Add other default profile fields here
          bio: "",
          university: "",
          // You'll expand this as you implement "Personal Details" and "University Affiliation"
        },
        { merge: true }
      ); // Use merge: true to avoid overwriting existing fields if they sign up via different methods
      console.log("User profile saved to Firestore for UID:", user.uid);
    } catch (firestoreError) {
      console.error("Error saving user profile to Firestore:", firestoreError);
      setError("Failed to save profile data."); // Don't block sign-up, but notify
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Save user profile to Firestore
      await saveUserProfileToFirestore(user);

      console.log("Email signup successful:", user);
      // Navigate to the next step or dashboard
      navigate("/dashboard"); // Or '/signup/personal-details' if multi-step form
    } catch (err) {
      // Handle Firebase authentication errors for email/password
      let errorMessage = "An unknown error occurred.";
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use. Try logging in.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password is too weak. It must be at least 6 characters.";
          break;
        default:
          errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSocialSignUp = async (provider) => {
    setError(null);
    setLoading(true);

    try {
      // 1. Sign in with popup for social providers
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Save user profile to Firestore
      await saveUserProfileToFirestore(user);

      console.log("Social signup successful:", user);
      navigate("/dashboard"); // Navigate to dashboard after successful social login
    } catch (err) {
      // Handle social login errors
      let errorMessage = "Social sign-up failed. Please try again.";
      switch (err.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Popup closed before completing sign-up.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "Operation cancelled. Please try again.";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage =
            "An account with this email already exists. Try logging in with a different method.";
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
    <div className="signup">
      <div className="signup-container">
        <div className="signup-logo">
          <img src={"logo2.png"} alt="CampusConnect Logo" />
        </div>
        <h2 className="signup-main-title">Account Information</h2>
        <p className="signup-subtitle">
          Let's get you signed up to connect with your community.
        </p>
        <div className="signup-steps">
          <button className="step-active">Account Information</button>
          <button className="step-inactive">Personal Details</button>
          <button className="step-inactive">University Affiliation</button>
        </div>

        <h3 className="signup-welcome">Welcome to CampusConnect!</h3>
        <p className="signup-choose">Choose how you'd like to sign up:</p>

        <div className="signup-social-buttons">
          <button
            className="social-button google"
            onClick={() => handleSocialSignUp(googleProvider)}
            disabled={loading}
          >
            <FaGoogle className="social-icon" /> Sign up with Google
          </button>
          <button
            className="social-button facebook"
            onClick={() => handleSocialSignUp(facebookProvider)}
            disabled={loading}
          >
            <FaFacebook className="social-icon" /> Sign up with Facebook
          </button>
        </div>

        <div className="signup-apple-button-container">
          <button
            className="social-button apple"
            onClick={() => handleSocialSignUp(appleProvider)}
            disabled={loading}
          >
            <FaApple className="social-icon" /> Sign up with Apple
          </button>
        </div>

        <div className="signup-or">or</div>

        <form className="signup-form" onSubmit={handleEmailSignUp}>
          {" "}
          {/* Use form for email/password */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="signup-next-button"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Next"}
          </button>
          {error && <p className="signup-error-message">{error}</p>}{" "}
          {/* Display errors */}
        </form>

        <p className="signup-login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
