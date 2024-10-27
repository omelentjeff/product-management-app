import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

/**
 * ProtectedRoute component that restricts access to certain routes.
 * Redirects to the home page if the user is not authenticated.
 * @returns {JSX.Element} The rendered ProtectedRoute component, or a redirect to the home page.
 */
const ProtectedRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
