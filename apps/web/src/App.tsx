import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useUserContext } from "./context/UserContext";
import { useEffect, useRef } from "react";
import Map from "@/components/Map";
import usePosition from "./hooks/usePosition";

function App() {
  const { userContext, fetchUser } = useUserContext();
  const { updatePosition } = usePosition();
  const updatePositionRunning = useRef(false);

  useEffect(() => {
    fetchUser();
    // Update user position every 10 seconds
  }, []);

  // App requires user to be logged in to use the app
  if (userContext.state === "fetching") {
    return <Map />;
  }
  return <RouterProvider router={router} />;
}

export default App;
