import React from "react";
import "./Sidebar.css"; 
import {
  FaHome,
  FaCalendar,
  FaTicketAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div class="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-title">
          <ul class="sidebar-menu">
            <li class="sidebar-menu-item">
              <a href="#" class="sidebar-menu-link">
                <FaHome className="sidebar-icon" />
                <span class="text-dashboard">Dashboard</span>
              </a>
            </li>
            <li class="sidebar-menu-item">
              <a href="#" class="sidebar-menu-link">
                <FaCalendar className="sidebar-icon" />
                <span class="text-events">Events</span>
              </a>
            </li>
            <li class="sidebar-menu-item">
              <a href="#" class="sidebar-menu-link">
                <FaTicketAlt className="sidebar-icon" />
                <span class="text-my-events">My Events</span>
              </a>
            </li>
            <li class="sidebar-menu-item">
              <a href="#" class="sidebar-menu-link">
                <FaUsers className="sidebar-icon" />
                <span class="text-communities">Communities</span>
              </a>
            </li>
            <li class="sidebar-menu-item">
              <a href="#" class="sidebar-menu-link">
                <FaUsers className="sidebar-icon" />
                <span class="text-my-profile">My Profile</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
