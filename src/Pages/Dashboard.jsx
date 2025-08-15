import React from "react";
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Feed from "../Components/Feed/Feed";

const Dashboard = () => {
  return (
    <div>
      <Nav />
      <Sidebar />
      <Feed />
    </div>
  );
};

export default Dashboard;
