import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedLayout from './ProtectedLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const jwt = localStorage.getItem('access_token');
  if (!jwt) {
    return <Navigate to="/login" />;
  }
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default ProtectedRoute;
