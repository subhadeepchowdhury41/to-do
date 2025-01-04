import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import routes from "../../consts/routes";
import { Navigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { useTheme } from "@mui/material";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const isAuthenticated = !!auth.user;
  if (auth.loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BounceLoader color={theme.palette.primary.main} />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to={routes.login} replace={true} />;
  }
  return children;
};

export default PrivateRoute;
