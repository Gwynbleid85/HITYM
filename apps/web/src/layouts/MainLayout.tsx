import { Outlet } from "react-router-dom";
import Map from "@/components/Map";
import Navbar from "@/components/navbar/Navbar";
import { useUserContext } from "@/context/UserContext";

export function MainLayout() {
  const { isLoggedIn } = useUserContext();

  return (
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
