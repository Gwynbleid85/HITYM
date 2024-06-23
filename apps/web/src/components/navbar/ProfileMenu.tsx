import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserRoundPlus } from "lucide-react";
import usePersistentData from "@/hooks/usePersistentData";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { useUserContext } from "@/context/UserContext";
import { Avatar } from "../Avatar";

// Component for the profile menu in the navbar
function ProfileMenu() {
  const { deleteAuthData } = usePersistentData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userContext, updateUser } = useUserContext();

  // Function to handle logout, delete the token from local storage, delete the user data from context and redirect to login page
  const handleLogout = () => {
    // Delete the token from local storage
    toast({
      title: `Bye ${userContext.user?.name}. Hope you don't get lost!`,
    });
    // Delete the token from local storage
    deleteAuthData();
    // Delete the user data from context
    updateUser({ user: null, state: "loggedOut" });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar name={userContext.user?.name || ""} url={userContext.user?.profilePicture} size="20" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>{userContext.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>My profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/invite")}>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          <span>Pending Invites</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
