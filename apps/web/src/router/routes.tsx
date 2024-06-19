import { Navigate, type RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";

// TODO Not found page

const mainLayoutRoutes: RouteObject[] = [
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
