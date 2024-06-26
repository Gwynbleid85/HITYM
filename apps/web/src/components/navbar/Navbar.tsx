import ProfileMenu from "./ProfileMenu";
import { SidebarMenu } from "./SidebarMenu";

function Navbar() {
  return (
    <>
      <div className="fixed top-4 left-4 z-10">
        <SidebarMenu />
      </div>

      <div className="fixed top-4 right-4 z-10">
        <ProfileMenu />
      </div>
    </>
  );
}

export default Navbar;
