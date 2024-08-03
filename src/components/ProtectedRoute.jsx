import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.token);
  // console.log("Protected routes -> token: ", token);
  const isAuthenticated = token || localStorage.getItem("token");
  if (!isAuthenticated) {
    return (
      <>
        <h1>Please login first</h1>
        <Navigate to="/" replace />
      </>
    );
  }
  return <Outlet />;
};
export default ProtectedRoute;
