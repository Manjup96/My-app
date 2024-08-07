import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaNewspaper,
  FaExclamationCircle,
  FaMoneyBill,
  FaUser,
} from "react-icons/fa"; 
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../Asset/images/logo.png";

import '../styles/components/Sidebar.scss';
import Header from "../shared/Header";
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Header />
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {!collapsed && (
          <div className="Title">
            
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px', }} />
            <h4>Hi, {user.username}</h4>
          </div>
        )}

        <div className="position-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">

     <div
      className={`sidebar-toggle ${collapsed ? 'collapsed' : ''}`}
      onClick={toggleSidebar}
    >
      <FontAwesomeIcon icon={faBars} className="toggle-icon" />
    </div>
</li>


            <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <Link className="nav-link" to="/dashboard">
                <FaHome className="nav-icon" />
                {!collapsed && <span className="link_text">Dashboard</span>}
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/meals' ? 'active' : ''}`}>
              <Link className="nav-link" to="/meals">
                <FaUtensils className="nav-icon" />
                {!collapsed && <span className="link_text">Meals</span>}
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`}>
              <Link className="nav-link" to="/news">
                <FaNewspaper className="nav-icon" />
                {!collapsed && <span className="link_text">News</span>}
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/complaints' ? 'active' : ''}`}>
              <Link className="nav-link" to="/complaints">
                <FaExclamationCircle className="nav-icon" />
                {!collapsed && <span className="link_text">Complaints</span>}
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/payments' ? 'active' : ''}`}>
              <Link className="nav-link" to="/payments">
                <FaMoneyBill className="nav-icon" />
                {!collapsed && <span className="link_text">Payments</span>}
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
              <Link className="nav-link" to="/profile">
                <FaUser className="nav-icon" />
                {!collapsed && <span className="link_text">Profile</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
