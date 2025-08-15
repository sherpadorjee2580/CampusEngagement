import React from "react";
import "./App.css";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent";
import UserProfile from "./Components/UserProfile/UserProfile";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import Feed from "./Components/Feed/Feed";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <div>
      <Feed />
      <Login />
    </div>
  );
};

export default App;
