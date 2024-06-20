import { Navigate, type RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import GroupCreateForm from "@/components/forms/GroupCreateForm";
import GroupEditForm from "@/components/forms/GroupEditForm";
import GroupOverview from "@/pages/groups/GroupOverview";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Groups from "@/pages/groups/Groups";
import { Group } from "lucide-react";

// TODO Not found page

const GroupRoutes: RouteObject[] = [
  {
    index: true,
    element: <Groups />,
  },
  {
    path: "create",
    Component: GroupCreateForm,
  },
  {
    path: ":id/edit",
    Component: GroupEditForm,
  },
  {
    path: ":id",
    Component: GroupOverview,
  },
  // TODO group users
];

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
    children: GroupRoutes,
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
