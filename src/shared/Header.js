import React from 'react';
import '../styles/components/Header.scss';
import Logout from './../Pages/Home/Logout';

const Header = () => {
  return (
    <div className="header">
      <h2>PG Tenant</h2>
      <div className="logout-button">
        <Logout />
      </div>
    </div>
  );
}

export default Header;
