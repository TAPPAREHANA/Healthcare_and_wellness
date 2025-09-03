import React, { createContext, useContext, useEffect, useState } from 'react';
 
// Create the Auth context
const AuthContext = createContext();
 
// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if exists
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('hc_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
 
  // Initialize token from localStorage if exists
  const [token, setToken] = useState(() => localStorage.getItem('hc_token'));
 
  // Sync user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('hc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hc_user');
    }
  }, [user]);
 
  // Sync token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('hc_token', token);
    } else {
      localStorage.removeItem('hc_token');
    }
  }, [token]);
 
  // Function to login (set user and token)
  const login = ({ token, user }) => {
    setUser(user);
    setToken(token);
  };
 
  // Function to logout (clear user and token)
  const logout = () => {
    setUser(null);
    setToken(null);
  };
 
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 
// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);