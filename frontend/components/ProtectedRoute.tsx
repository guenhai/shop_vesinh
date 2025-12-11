import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('admin_token');

  // TODO: Add real token validation here (decode/expiry check)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
