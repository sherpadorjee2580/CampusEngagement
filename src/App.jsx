// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom"; // Import Outlet
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import CampusCalendar from "./Components/CampusCalendar/CampusCalendar";

// Import your components
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp"; // Adjust path if needed
import Dashboard from "./Pages/Dashboard"; // Your Dashboard component (now a layout)
import Feed from "./Components/Feed/Feed"; // Keep Feed if it's the default view
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import Communities from "./Components/CommunityHub/CommunityHub";
import UserProfile from "./Components/UserProfile/UserProfile";
import NewEvent from "./Components/NewEvent/NewEvent";
import CommunityHub from "./Components/CommunityHub/CommunityHub";

// PrivateRoute component (remains the same)
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
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes - Dashboard as a Layout */}
      <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        {/* Nested Routes will render within Dashboard's <Outlet /> */}
        <Route path="/" element={<Feed />} />{" "}
        {/* Default content for / is Feed */}
        <Route path="/dashboard" element={<Feed />} />{" "}
        {/* /dashboard also shows Feed */}
        <Route path="/explore-events" element={<ExploreEvents />} />
        <Route path="/communityhub" element={<CommunityHub />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/new-event" element={<NewEvent />} />
        <Route path="/campus-calendar" element={<CampusCalendar />} />
        <Route path="/new-event" element={<NewEvent />} />
      </Route>

      {/* Catch-all for 404 Not Found */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
