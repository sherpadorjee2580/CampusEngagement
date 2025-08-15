import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Nav from "../Components/Nav/Nav";

function Dashboard({ events, addEvent }) {
  return (
    <div className="dashboard-layout">
      <Nav />
      <Sidebar />
      <main>
        {/* Pass events + addEvent via outlet context */}
        <Outlet context={{ events, addEvent }} />
      </main>
    </div>
  );
}

export default Dashboard;
