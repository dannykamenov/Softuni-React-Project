import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authGuard';

const ProtectedUserRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();


  if (currentUser && userRole == 'business') {
    return <Navigate to="/" replace />;
  }

  if(!currentUser){
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUserRoute;