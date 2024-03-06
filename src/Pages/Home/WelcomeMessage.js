import React from 'react';
import { useAuth } from '../../context/AuthContext';


   
  
    

const WelcomeMessage = () => {
   const { user } = useAuth();

  return (
    <div>
       <h2>Welcome {user.username}</h2>
    </div>
  );
};

export default WelcomeMessage;
