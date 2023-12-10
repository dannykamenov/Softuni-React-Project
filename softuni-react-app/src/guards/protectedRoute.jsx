import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authGuard';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const verified = currentUser?.emailVerified;

  if (!verified) {
    return children;
  }

  if (currentUser && verified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;