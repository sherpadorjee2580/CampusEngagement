<<<<<<< HEAD
import React from "react";
import "./App.css";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent";
import UserProfile from "./Components/UserProfile/UserProfile";

const App = () => {
  return (
    <div>
      {/* <CommunityHub /> */}
      {/* <NewEvent />   */}
      <UserProfile />
    </div>
  );
};
=======
import "./App.css";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";

function App() {
  return (
    <>
      <ExploreEvents />
    </>
  );
}
>>>>>>> 89abe3b0eeb1112a360e9ab54211f6c0378dc100

export default App;
