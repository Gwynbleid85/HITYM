import { Outlet } from "react-router-dom";
import Map from "@/components/Map";

export function MainLayout() {
  return (
    // TODO navbar
    <>
      <Map />
      <Outlet />
    </>
  );
}

export default MainLayout;
