import React from "react";
import "./App.css";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent";
import UserProfile from "./Components/UserProfile/UserProfile";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import Feed from "./Components/Feed/Feed";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";
import Nav from "./Components/Nav/Nav";
import PassForget from "./Components/PassForget/PassForget";

const App = () => {
  return (
    <div>
      <Nav />
      <Feed />
      <Login />
      <Sidebar />
      <PassForget />
    </div>
  );
};

export default App;
