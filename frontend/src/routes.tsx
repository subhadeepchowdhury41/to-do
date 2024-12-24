import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/layout/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
