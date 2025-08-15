import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Components
import CampusCalendar from "./Components/CampusCalendar/CampusCalendar";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Pages/Dashboard";
import Feed from "./Components/Feed/Feed";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import UserProfile from "./Components/UserProfile/UserProfile";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent";
import WebWelcome from "./Components/WebWelcome/WebWelcome";
import Navbar from "./Components/Nav/Nav";

// React Router
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading authentication...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      image: "/event1.jpg",
      name: "Annual Campus Spring Festival",
      description: "Celebrate spring with music, food trucks, and art.",
      date: "August 15, 2025",
      time: "6:30am - 6:30pm",
      location: "TCMIT",
      category: "Social",
    },
    {
      id: 2,
      image: "/event2.jpg",
      name: "Tech Innovation Summit",
      description: "Workshops and networking with tech leaders.",
      date: "May 16, 2025",
      time: "9:00am - 5:00pm",
      location: "BIT",
      category: "Academic",
    },
  ]);

  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, { id: prev.length + 1, ...newEvent }]);
  };

  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 3000);

    return () => {
      unsubscribeAuth();
      clearTimeout(timer);
    };
  }, []);

  if (showWelcomeScreen) {
    return <WebWelcome onTimeout={() => setShowWelcomeScreen(false)} />;
  }

  if (authLoading) {
    return <div>Loading application...</div>;
  }

  return (
    <>
      <Navbar isAuthenticated={!!currentUser} />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard events={events} addEvent={addEvent} />
            </PrivateRoute>
          }
        >
          {/* Default dashboard route */}
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
          <Route path="explore-events" element={<ExploreEvents />} />
          <Route path="communityhub" element={<CommunityHub />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="campus-calendar" element={<CampusCalendar />} />
          <Route path="new-event" element={<NewEvent />} />
        </Route>

        {/* Root: go to feed if logged in, else login */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/feed" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
