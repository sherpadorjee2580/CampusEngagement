import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";

function Dashboard({ events, addEvent }) {
  return (
    <div className="dashboard-layout">
      <Nav />
      <Sidebar />
      <main>
        <Outlet context={{ events, addEvent }} />
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
