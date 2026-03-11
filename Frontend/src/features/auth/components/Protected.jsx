import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <main className="form-container">
        <div className="loading-container">
          <h1 className="loading-text">Loading...</h1>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
