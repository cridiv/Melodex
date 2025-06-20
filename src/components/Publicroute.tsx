// src/components/PublicRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white">Loading...</div>;

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
