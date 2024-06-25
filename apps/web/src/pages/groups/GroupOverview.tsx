import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroupExtended } from "@/hooks/useGroups";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomCardFooter from "@/components/card/CustomCardFooter";
import { useUserContext } from "@/context/UserContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Avatar } from "@/components/Avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useFollowGroup,
  useSharePositionWithGroup,
  useStopSharingPositionWithGroup,
  useUnfollowGroup,
  useUserTrackingConfig,
} from "@/hooks/useUsers";
import { useTrackPositionContext } from "@/context/TrackPositionContext";

function GroupOverview() {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { isAuthorized } = useUserContext();
  const { unfollowGroupUsers } = useTrackPositionContext();
  const { data: groupExtended, isLoading } = useGroupExtended(groupId as string);
  const { data: userTrackConfig } = useUserTrackingConfig();
  const { mutateAsync: followGroup } = useFollowGroup(groupId as string);
  const { mutateAsync: unfollowGroup } = useUnfollowGroup(groupId as string);
  const { mutateAsync: sharePosition } = useSharePositionWithGroup(groupId as string);
  const { mutateAsync: stopSharingPosition } = useStopSharingPositionWithGroup(groupId as string);

  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isSharingPosition, setIsSharingPosition] = React.useState(false);

  useEffect(() => {
    const isFollowing = userTrackConfig?.data.following?.includes(groupId as string);
    const isSharingPosition = userTrackConfig?.data.sharingWith?.includes(groupId as string);

    setIsFollowing((val) => isFollowing ?? val);
    setIsSharingPosition((val) => isSharingPosition ?? val);
  }, [userTrackConfig]);

  const handleFollowGroupButton = async () => {
    if (isFollowing) {
      await unfollowGroup();
      setIsFollowing(false);
    } else {
      await followGroup();
      setIsFollowing(true);
    }
  };

  const handleSharePositionButton = async () => {
    if (isSharingPosition) {
      await stopSharingPosition();
      setIsSharingPosition(false);
    } else {
      await sharePosition();
      setIsSharingPosition(true);
    }
  };
  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        {isLoading ? (
          <LoadingSpinner size={50} />
        ) : (
          <>
            <CardHeader className=" rounded-xl bg-slate-100 p-1 m-5 pt-2 w-11/12 ">
              <CardTitle className="text-4xl flex items-center justify-center text-center pb-1">
                {groupExtended?.data.name}
              </CardTitle>
              <CardContent className="flex flex-row items-center gap-4">
                <Avatar
                  name={groupExtended?.data.name ?? ""}
                  url={groupExtended?.data.imageUrl}
                  className="w-20 h-20"
                ></Avatar>
                <div className="text-sm rounded-md bg-gray-300 p-2 text-center text w-full ">
                  {groupExtended?.data.description}
                </div>
              </CardContent>
            </CardHeader>
            <CardContent className="flex flex-col w-full pb-3">
              <div className="flex justify-between mb-1">
                <div className="flex items-center space-x-2 justify-center bg-slate-100 p-2 rounded-md">
                  <Label htmlFor="track-position flex items-center">Share position with group</Label>
                  <Switch checked={isSharingPosition} onClick={handleSharePositionButton} />
                </div>
                <div className="flex items-center space-x-2 justify-center bg-slate-100 p-2 rounded-md">
                  <Label htmlFor="track-position flex items-center">Follow user in this group</Label>
                  <Switch checked={isFollowing} onClick={handleFollowGroupButton} />
                </div>
              </div>

              <Button variant="secondary" className="my-3" onClick={() => navigate(`/groups/${groupId}/events`)}>
                <span>Show events</span>
              </Button>
              <Button variant="secondary" onClick={() => navigate(`/groups/${groupId}/users`)}>
                <span>Show members</span>
              </Button>
            </CardContent>
            <CustomCardFooter
              isAuthorized={isAuthorized(groupExtended?.data.createdById as string)}
              buttonText="Edit group"
              buttonOnClick={() => navigate(`/groups/${groupId}/edit`)}
              backPath="/groups"
            />
          </>
        )}
      </Card>
    </>
  );
}

export default GroupOverview;
