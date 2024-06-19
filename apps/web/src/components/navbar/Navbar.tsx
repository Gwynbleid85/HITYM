import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Sidebar } from "./Sidebar";

function Navbar() {
  return (
    <>
      <div className="fixed top-4 left-4 z-10">
        <Sidebar />
      </div>
      <div className="fixed top-4 right-4 z-10">
        <Avatar className="w-14 h-14 shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback> 
          {/* TODO */}
        </Avatar>
      </div>
    </>
  );
}

export default Navbar;
