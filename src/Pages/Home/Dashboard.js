// Dashboard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faBed, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import "../../styles/components/Home.scss";

const Card = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Card title="Total Paid Amount" value="41265" icon={faDollarSign} />
      <Card title="Available Beds" value="26" icon={faBed} />
      <Card title="Total Complaints" value="14" icon={faExclamationCircle} />
    </div>
  );
};

export default Dashboard;
