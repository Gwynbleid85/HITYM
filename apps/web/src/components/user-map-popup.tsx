import type { UserInfo } from "@/hooks/usePosition";
import { Avatar } from "./Avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type UserMapPopupProps = {
  user: UserInfo;
};

export const UserMapPopup = ({ user }: UserMapPopupProps) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar name={user.name} imageUrl={user.profilePicture} size={20} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
