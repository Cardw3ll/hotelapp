import React from "react";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <NavLink to="/" />;
  }
  return children;
};

export default ProtectedRoute;
