import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authGuard';

const ProtectedBusinessRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();


  if (currentUser && userRole == 'user') {
    return <Navigate to="/" replace />;
  }

  if(!currentUser){
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedBusinessRoute;