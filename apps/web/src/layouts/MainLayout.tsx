import { Outlet } from "react-router-dom";
import Map from "@/components/Map";
import Navbar from "@/components/navbar/Navbar";
import usePersistentData from "@/hooks/usePersistentData";

export function MainLayout() {
  const { isLoggedIn } = usePersistentData();

  return (
    //TODO center, compute
    <>
      {isLoggedIn() ? <Navbar /> : null}
      <Map />
      <div className="absolute inset-0 m-auto w-fit h-fit">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
