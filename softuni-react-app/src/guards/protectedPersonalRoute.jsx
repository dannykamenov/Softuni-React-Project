import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authGuard';

const ProtectedPersonalRoute = ({ children }) => {
  const { currentUser } = useAuth();

    if(!currentUser){
        return <Navigate to="/" replace />;
    }

  return children;
};

export default ProtectedPersonalRoute;