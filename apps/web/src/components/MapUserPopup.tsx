import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "./Avatar";
import type { FC } from "react";

type MapUserPopupProps = {
  user: {
    name: string;
    profilePicture: string | null;
    position: {
      latitude: number;
      longitude: number;
    } | null;
    status: { status: string; color: string } | null;
    active: boolean;
  };
};

export const MapUserPopup: FC<MapUserPopupProps> = (props) => {
  const { user, ...otherProps } = props;
  return (
    <>
      <CardContent className="flex flex-row items-center gap-4">
        <Avatar name={user.name} url={user.profilePicture}></Avatar>
        <div className="space">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          {user.active ? (
            <Badge variant="secondary" className="text-xs">
              🟢 Online
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs text-gray-400">
              Offline
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className=" p-0">
        <div className={`text-sm rounded-md bg-gray-300 p-2 text-center text`} style={{ color: user.status?.color }}>
          {user.status?.status}
        </div>
      </CardFooter>
    </>
  );
};
