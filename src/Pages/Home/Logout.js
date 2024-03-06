import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
      logout();
        console.log('Logged out');
        navigate('/');
      };

  return (
    <div>
      
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        
    </div>
  );
};

export default Logout;
