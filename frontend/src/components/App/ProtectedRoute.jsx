import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // Not logged in → Redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && userInfo.role !== role) {
    // If role is passed and doesn't match → Redirect home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

