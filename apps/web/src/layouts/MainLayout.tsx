import { Outlet } from "react-router-dom";
import Map from "@/components/Map";
import Navbar from "@/components/navbar/Navbar";

export function MainLayout() {
  return (
    //TODO center, compute
    <>
      <Navbar />
      <Map />
      <div id="hovno" className="absolute inset-0 w-fit h-fit flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
