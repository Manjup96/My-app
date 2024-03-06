import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="col-md-2 d-md-block bg-light sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/meals">
              Meals
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/news">
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/complaints">
            Complaints
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/payments">
            Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
