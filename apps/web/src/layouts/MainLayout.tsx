import { Outlet } from "react-router-dom";
import Map from "@/components/Map";

export function MainLayout() {
  return (

    // TODO navbar
    //TODO center, compute
    <>
      <Map />
      <div id="hovno" className="absolute inset-0 w-fit h-fit flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
