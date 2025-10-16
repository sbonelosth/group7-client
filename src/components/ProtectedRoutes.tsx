import React from 'react';
import { useMernAccess } from 'mern-access-client';
import { Navigate } from 'react-router-dom';
import Loader from '../pages/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useMernAccess();

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}