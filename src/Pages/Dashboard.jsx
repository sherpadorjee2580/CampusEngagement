import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Nav from "../Components/Nav/Nav";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Nav />
      <Sidebar />
      <main>
        <Outlet />{" "}
        {/* This is where nested route content (Feed, ExploreEvents, etc.) will appear */}
      </main>
    </div>
  );
}

export default Dashboard;
