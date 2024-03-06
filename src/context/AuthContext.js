// AuthProvider.js
import React, { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    // This effect will run when the component mounts and whenever the user state changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]); // Dependency array ensures effect is run whenever the user state changes

  const login = (userData) => {
    setUser(userData); // This will trigger the useEffect above
  };

  const logout = () => {
    setUser(null); // This will also trigger the useEffect above
  };

  const contextValue = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
