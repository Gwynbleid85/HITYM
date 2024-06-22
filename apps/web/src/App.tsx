import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useUserContext } from "./context/UserContext";
import { useEffect } from "react";
import Map from "@/components/Map";

function App() {
  const { userContext, fetchUser } = useUserContext();

  // If JWT token exist verify it
  useEffect(() => {
    fetchUser();
  }, []);

  // App requires user to be logged in to use the app
  if (userContext.state === "fetching") {
    return <Map />;
  }
  return <RouterProvider router={router} />;
}

export default App;
