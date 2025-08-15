import React, { useState } from "react";
import "./SignUp.css";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider, 
} from "firebase/auth";
import { auth, db } from "../../firebase"; 
import { doc, setDoc } from "firebase/firestore"; 

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
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
      console.log("User profile saved to Firestore for UID:", user.uid);
    } catch (firestoreError) {
      console.error("Error saving user profile to Firestore:", firestoreError);
      setError("Failed to save profile data."); 
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault(); 
    setError(null); 
    setLoading(true); 

    try {
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await saveUserProfileToFirestore(user);

      console.log("Email signup successful:", user);
      
      navigate("/"); 
    } catch (err) {
      
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
      setLoading(false); 
    }
  };

  const handleSocialSignUp = async (provider) => {
    setError(null);
    setLoading(true);

    try {
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      
      await saveUserProfileToFirestore(user);

      console.log("Social signup successful:", user);
      navigate("/dashboard");
    } catch (err) {
      
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
          
        </form>

        <p className="signup-login-link">
          Already have an account? <a href="/">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
