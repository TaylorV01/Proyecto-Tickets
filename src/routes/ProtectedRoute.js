import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

/**
 * ProtectedRoute
 * @param {Array|string} roles - Rol(es) permitidos para acceder a la ruta
 */
const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    // No autenticado
    return <Navigate to="/login" replace />;
  }

  if (roles && ![].concat(roles).includes(user.rol)) {
    // Autenticado pero sin el rol adecuado
    return <Navigate to="/acceso-denegado" replace />;
  }

  // Autenticado y con el rol adecuado
  return <Outlet />;
};

export default ProtectedRoute;
