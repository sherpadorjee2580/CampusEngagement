import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendar, FaUsers, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-title">
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
              <NavLink to="/" end className="sidebar-menu-link">
                <FaHome className="sidebar-icon" />
                <span className="text-dashboard">Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar-menu-item">
              <NavLink to="explore-events" className="sidebar-menu-link">
                <FaCalendar className="sidebar-icon" />
                <span className="text-events">Events</span>
              </NavLink>
            </li>
            <li className="sidebar-menu-item">
              <NavLink to="communityhub" className="sidebar-menu-link">
                <FaUsers className="sidebar-icon" />
                <span className="text-communities">Communities</span>
              </NavLink>
            </li>
            <li className="sidebar-menu-item">
              <NavLink to="user-profile" className="sidebar-menu-link">
                <FaUsers className="sidebar-icon" />
                <span className="text-my-profile">My Profile</span>
              </NavLink>
            </li>
            <li className="sidebar-menu-item">
              <NavLink to="campus-calendar" className="sidebar-menu-link">
                <FaCalendarAlt className="sidebar-icon" />
                <span className="text-my-profile">Calendar</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
