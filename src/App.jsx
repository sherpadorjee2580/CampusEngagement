import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Assuming './firebase' is correct path

import CampusCalendar from "./Components/CampusCalendar/CampusCalendar";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Pages/Dashboard";
import Feed from "./Components/Feed/Feed";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import UserProfile from "./Components/UserProfile/UserProfile";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent"; // Import NewEvent component
// import EventAddedSuccess from "./Components/EventAddedSuccess/EventAddedSuccess"; // If you're not using it, remove this import and its route
import WebWelcome from "./Components/WebWelcome/WebWelcome";

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
      location: "University Green",
      category: "Social",
    },
    {
      id: 2,
      image: "/event2.jpg",
      name: "Tech Innovation Summit",
      description: "Workshops and networking with tech leaders.",
      date: "May 16, 2025",
      time: "9:00am - 5:00pm",
      location: "Engineering Building Auditorium",
      category: "Academic",
    },
  ]);

  const addEvent = (newEvent) => {
    // Ensure new event gets a unique ID
    setEvents((prev) => [...prev, { id: prev.length + 1, ...newEvent }]);
  };

  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const handleWelcomeTimeout = () => {
    setShowWelcomeScreen(false);
  };

  if (showWelcomeScreen) {
    return <WebWelcome onTimeout={handleWelcomeTimeout} />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard events={events} addEvent={addEvent} />
            </PrivateRoute>
          }
        >
          <Route index element={<Feed />} />
          <Route path="explore-events" element={<ExploreEvents />} />
          <Route path="communityhub" element={<CommunityHub />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="campus-calendar" element={<CampusCalendar />} />
          {/* Route for NewEvent, passing addEvent as a prop */}
          <Route path="new-event" element={<NewEvent addEvent={addEvent} />} />
          {/* If you're no longer using EventAddedSuccess, remove this route */}
          {/* <Route path="event-added-success" element={<EventAddedSuccess />} /> */}
        </Route>
        {/* Fallback 404 Route */}
        <Route path="/" element={<Feed />} />{" "}
        <Route path="/dashboard" element={<Feed />} />{" "}
        <Route path="/explore-events" element={<ExploreEvents />} />
        <Route path="/communityhub" element={<CommunityHub />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/new-event" element={<NewEvent />} />
        <Route path="/campus-calendar" element={<CampusCalendar />} />
        <Route path="/new-event" element={<NewEvent />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
