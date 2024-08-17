import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Check if the token exists and is truthy

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/home" />;
};

export default PrivateRoute;
