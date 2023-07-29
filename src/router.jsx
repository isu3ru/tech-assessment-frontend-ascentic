import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/pages/auth/Login";
import Signup from "./views/pages/auth/Signup";
import Dashboard from "./views/pages/user/Dashboard";
import NotFound from "./views/pages/NotFound";
import MasterLayout from "./views/layouts/MasterLayout";
import GuestLayout from "./views/layouts/GuestLayout";
import Validator from "./views/pages/user/Validator.jsx";
import ValidationsList from "./views/pages/admin/ValidationsList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />, // only for inner pages
    children: [
      // children of MasterLayout
      {
        path: "/",
        // navigate to dashboard if user is logged in and tries to access the / route
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/validate",
        element: <Validator />,
      },
      {
        path: "/validations",
        element: <ValidationsList />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />, // only for guest pages
    children: [
      // children of GuestLayout
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
