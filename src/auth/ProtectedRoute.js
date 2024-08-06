/* src/auth/ProtectedRoute.js*/
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ component: Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
