import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Home/SignUp/SignUp";
import Secret from "../pages/secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Instructors from "../pages/Home/Instructors/Instructors";
import Classes from "../pages/Home/Classes/Classes";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "carts",
        element: <Cart />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);
