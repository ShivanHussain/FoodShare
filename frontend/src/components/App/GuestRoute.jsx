import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // If user is already logged in, redirect to home
  if (userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { GuestRoute };