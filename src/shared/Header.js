import React from 'react';
import '../styles/components/Header.scss';
import Logout from './../Pages/Home/Logout';
import companyLogo from "../Asset/images/company logo.png";

const Header = () => {
  return (
    <div className="header">
      <img src={companyLogo} alt="Logo" className="company-logo" />
      <h2>PG Tenant</h2>
      <div className="logout-button">
        <Logout />
      </div>
    </div>
  );
}

export default Header;
