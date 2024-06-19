import { Navigate, type RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Groups from "@/pages/Groups";

// TODO Not found page

const mainLayoutRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="./login" relative="path" />,
  }, //TODO check if logged in
  {
    path: "login",
    Component: Login,
  },
  {
    path: "signup",
    Component: SignUp,
  },
  {
    path: "home",
    Component: Home,
  },
  {
    path: "groups",
    Component: Groups,
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    Component: MainLayout,
    children: mainLayoutRoutes,
  },
  // {
  //   path: "*",
  //   Component: ErrorsNotFound,
  // },
];

export default routes;
