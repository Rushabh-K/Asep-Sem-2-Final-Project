import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to sign-in page but save the attempted URL
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 