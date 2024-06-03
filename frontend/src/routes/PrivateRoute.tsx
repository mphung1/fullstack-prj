import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
