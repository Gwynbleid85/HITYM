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
import UserInvite from "@/pages/invites/UserInvite";
import { useUserContext } from "@/context/UserContext";
import PendingInvites from "@/pages/invites/PendingInvites";
import UserEditForm from "@/components/forms/UserEditForm";
import UserStatusEdit from "@/components/forms/UserStatusEdit";
import ChooseOnMap from "@/pages/ChooseOnMap";
import PlaceCreateForm from "@/components/forms/PlaceCreateForm";
import GroupEventOverview from "@/pages/groups/GroupEventOverview";
import GroupEventEditForm from "@/components/forms/GroupEventEditForm";
import GroupEventCreateForm from "@/components/forms/GroupEventCreateForm";

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
  { path: ":groupId/events/:eventId/edit", element: <GroupEventEditForm /> },
  { path: ":groupId/events/:eventId", element: <GroupEventOverview /> },
  { path: ":groupId/events/create", element: <GroupEventCreateForm /> },
  { path: ":id/events", element: <GroupEvents /> },
  { path: ":id/users/invite", element: <UserInvite /> },
  { path: ":id/users", element: <GroupUsers /> },
  { path: ":id/edit", element: <GroupEditForm /> },
  { path: ":id", element: <GroupOverview /> },
];

// User Routes
const ProfileRoutes: RouteObject[] = [
  { path: "edit", element: <UserEditForm /> },
  { path: "invites", element: <PendingInvites /> },
  { path: "status", element: <UserStatusEdit /> },
];

// Places Routes
const PlacesRoutes: RouteObject[] = [
  { path: "create/choose-on-map", element: <ChooseOnMap /> },
  { path: "create", element: <PlaceCreateForm /> },
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
          { path: "profile/*", element: <Outlet />, children: ProfileRoutes },
          { path: "places/*", element: <Outlet />, children: PlacesRoutes },
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
