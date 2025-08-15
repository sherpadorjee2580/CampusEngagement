import React from "react";
import "./App.css";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent";
import UserProfile from "./Components/UserProfile/UserProfile";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import Feed from "./Components/Feed/Feed";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar"; // Importing the Sidebar component
import Nav from "./Components/Nav/Nav";
import Dashboard from "./Pages/Dashboard";
import { Route, Link, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/community-hub" element={<CommunityHub />} />
      <Route path="/new-event" element={<NewEvent />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/explore-events" element={<ExploreEvents />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
};

export default App;
