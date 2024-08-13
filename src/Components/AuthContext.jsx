import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check token validity when the app loads
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Example API call to validate token
          const response = await axios.get('http://127.0.0.1:5000/protected', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
