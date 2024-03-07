
import React, { useState } from "react";
import '../styles/components/Sidebar.scss';
import { NavLink } from "react-router-dom"; 
import { FaBars, FaHome, FaUserAlt, FaUtensils, FaNewspaper, FaExclamationCircle } from "react-icons/fa";
import logo from "../Asset/images/logo.png";
 import Header from "../shared/Header";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
     
      path: "/meals",
      name: "Meals",
      icon: <FaUtensils />,
    },
    {
      
      path: "/news",
      name: "News",
      icon: <FaNewspaper />,
    },
    {
      
      path: "/complaints",
      name: "Complaints",
      icon: <FaExclamationCircle />,
    },
    {
         path: "/profile",
       name: "My Profile",
        icon: <FaUserAlt />,
    },
   
  ];

  return (
    <div className="container">
      <Header /> 
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
          <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
      <h4>PG Tenant</h4>
          </h1>
          <div className="bars">
            <FaBars
              className={isOpen ? "toggle-btn open" : "toggle-btn"}
              onClick={toggleSidebar}
            />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
