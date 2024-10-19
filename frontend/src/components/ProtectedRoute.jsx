import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../authService";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = authService.getCurrentUser();

  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    // if user isn't authenticated, redirect the user to login page
    return <Navigate to="/login" />;
  }

  // if user is authenticated, redirect the user to the protected page
  return children;
}
