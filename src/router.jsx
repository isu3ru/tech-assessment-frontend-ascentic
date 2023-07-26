import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/pages/user/Login";
import Signup from "./views/pages/user/Signup";
import Dashboard from "./views/pages/user/Dashboard";
import NotFound from "./views/pages/NotFound";
import MasterLayout from "./views/layouts/MasterLayout";
import GuestLayout from "./views/layouts/GuestLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      {
        path: "/",
        // navigate to dashboard if user is logged in and tries to access the / route
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
