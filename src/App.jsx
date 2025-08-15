import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp"; 
import Dashboard from "./Pages/Dashboard"; 
import Feed from "./Components/Feed/Feed"; 
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import Communities from "./Components/CommunityHub/CommunityHub";
import UserProfile from "./Components/UserProfile/UserProfile";
import NewEvent from "./Components/NewEvent/NewEvent";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import WebWelcome from "./Components/WebWelcome/WebWelcome";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return isAuthenticated ? children : null;
};

  

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const handleWelcomeTimeout = () => {
    setShowWelcomeScreen(false);
  };

  if (showWelcomeScreen) {
    return <WebWelcome onTimeout={handleWelcomeTimeout} />;
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Feed />} />{" "}
        <Route path="/dashboard" element={<Feed />} />{" "}
        <Route path="/explore-events" element={<ExploreEvents />} />
        <Route path="/communityhub" element={<CommunityHub />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/new-event" element={<NewEvent />} />
      </Route>

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;