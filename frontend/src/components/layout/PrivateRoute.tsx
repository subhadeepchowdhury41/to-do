/* eslint-disable react-hooks/exhaustive-deps */
// src/components/Layout/PrivateRoute.tsx
import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import routes from "../../consts/routes";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        window.location.href = routes.login;
      }, 1000);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You are not logged in.</p>
        <p>You will be redirected to the login page.</p>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
