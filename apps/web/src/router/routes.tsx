import { Navigate, Outlet, type RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import GroupCreateForm from "@/components/forms/GroupCreateForm";
import GroupEditForm from "@/components/forms/GroupEditForm";
import GroupOverview from "@/pages/groups/GroupOverview";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Groups from "@/pages/groups/Groups";
import GroupEvents from "@/pages/groups/GroupEvents";
import GroupUsers from "@/pages/groups/GroupUsers";
import UserInvite from "@/pages/UserInvite";
import { useUserContext } from "@/context/UserContext";

// Layout for Public Routes (Login and Signup), checks if user is logged in
// If user is logged in, redirect to home page
const PublicLayout = () => {
  const { isLoggedIn } = useUserContext();
  return isLoggedIn() ? <Navigate to="/home" replace /> : <Outlet />;
};

// Protected Layout for all Main Routes, checks if user is logged in
// If user is not logged in, redirect to login page
const ProtectedLayout = () => {
  const { isLoggedIn } = useUserContext();
  return !isLoggedIn() ? <Navigate to="/login" replace /> : <Outlet />;
};

// Redirect Component
const Redirect = () => {
  const { isLoggedIn } = useUserContext();
  return isLoggedIn() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

// Group Routes
const GroupRoutes: RouteObject[] = [
  { index: true, element: <Groups /> },
  { path: "create", element: <GroupCreateForm /> },
  { path: ":id/events", element: <GroupEvents /> },
  { path: ":id/users/invite", element: <UserInvite /> },
  { path: ":id/users", element: <GroupUsers /> },
  { path: ":id/edit", element: <GroupEditForm /> },
  { path: ":id", element: <GroupOverview /> },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Check the root path and redirect to the appropriate page based on the user's authentication status
      {
        index: true,
        element: <Redirect />,
      },
      // Protected routes
      {
        path: "",
        element: <ProtectedLayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "groups/*", element: <Outlet />, children: GroupRoutes },
        ],
      },
      // Public routes
      {
        path: "",
        element: <PublicLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
    ],
  },
  // When no route matches, redirect to the default page based on the user's authentication status
  {
    path: "*",
    element: <Redirect />,
  },
];

export default routes;
