import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import routes from "../../consts/routes";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth);
  const isAuthenticated = !!auth.user;
  if (auth.loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to={routes.login} replace={true} />;
  }
  return children;
};

export default PrivateRoute;