import { Outlet } from "react-router-dom";
import Map from "@/components/Map";

export function MainLayout() {
  return (
    // TODO navbar
    <>
      <div>
        <Map />
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
