import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { status, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {status !== "LOADING" &&
        (isAuthenticated ? <Outlet /> : <Navigate to={"/auth/signin"} />)}
    </>
  );
};

export default ProtectedRoute;
