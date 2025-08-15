import React, { useState} from "react";
import "./App.css";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent";
import UserProfile from "./Components/UserProfile/UserProfile";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import Feed from "./Components/Feed/Feed";
import WebWelcome from "./Components/WebWelcome/WebWelcome";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar"; 
import Nav from "./Components/Nav/Nav";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Pages/Dashboard";
import PassForget from "./Components/PassForget/PassForget";
import Footer from "./Components/Footer/Footer"; 
import { Route, Link, Routes } from "react-router-dom";

const App = () => {
  
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const handleWelcomeTimeout = () => {
    setShowWelcomeScreen(false);
  };

  if (showWelcomeScreen) {
    return <WebWelcome onTimeout={handleWelcomeTimeout} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/community-hub" element={<CommunityHub />} />
      <Route path="/new-event" element={<NewEvent />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/explore-events" element={<ExploreEvents />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pass-forget" element={<PassForget />} />
    </Routes>
  );
};

export default App;
