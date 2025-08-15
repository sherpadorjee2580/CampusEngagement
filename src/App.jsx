<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Components/Nav/Nav';

function App() {
  const [count, setCount] = useState(0)
=======
import React from "react";
import "./App.css";
import CommunityHub from "./Components/CommunityHub/CommunityHub";
import NewEvent from "./Components/NewEvent/NewEvent";
import UserProfile from "./Components/UserProfile/UserProfile";
import ExploreEvents from "./Components/ExploreEvents/ExploreEvents";
import Feed from "./Components/Feed/Feed";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar"; // Importing the Sidebar component
>>>>>>> 79facd757479fc24e2d5747c07079beac9ef7d23

const App = () => {
  return (
<<<<<<< HEAD
    <>
      <Nav/>
        
    </>
  )
}
=======
    <div>
      <Feed />
      <Login />
      <Sidebar />
    </div>
  );
};
>>>>>>> 79facd757479fc24e2d5747c07079beac9ef7d23

export default App;
