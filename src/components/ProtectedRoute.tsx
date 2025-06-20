// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white">Loading...</div>;

  return user ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
