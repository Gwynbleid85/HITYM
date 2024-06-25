import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { useGroupExtended } from "@/hooks/useGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X } from "lucide-react";
import CustomCardFooter from "@/components/card/CustomCardFooter";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRemoveUserFromGroup } from "@/hooks/useGroups";
import { useToast } from "@/components/ui/use-toast";
import { ButtonLoading } from "@/components/ui/button-loading";
import { useUserContext } from "@/context/UserContext";

// Component to display the group members
function GroupUsers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthorized } = useUserContext();
  const { id: groupId } = useParams();
  const { data: groupExtended, isLoading } = useGroupExtended(groupId as string);
  const { mutateAsync: removeUser, isPending } = useRemoveUserFromGroup(groupId as string);

  const handleRemoveUser = async (userId: string) => {
    try {
      await removeUser(userId);
      toast({
        title: `User was removed from the group!`,
      });
    } catch (e: any) {
      toast({
        title: "Could not remove the user.",
        variant: "destructive",
      });
      console.error(e);
    }
  };

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[70vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Group members</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center w-full overflow-auto">
          {isLoading ? (
            <LoadingSpinner size={50} />
          ) : (
            <ScrollArea className="rounded-md border-2 w-full overflow-auto ">
              {groupExtended?.data?.users?.map((user) => (
                <div className="grid grid-cols-[1fr_auto] w-full items-center" key={user.id}>
                  {/* Button 1: Left Side (Full Width) */}
                  <Button
                    variant="ghost"
                    className="cursor-auto truncate flex items-center justify-start space-x-4 px-3 h-fit"
                  >
                    <Avatar name={user.name} url={user.profilePicture} size="12" />
                    <div className="truncate">
                      <h4 className="font-semibold">{user.name}</h4>
                    </div>
                  </Button>
                  {/* Button for removing user: Show only if loggen in user is the owner of group */}
                  {isAuthorized(groupExtended.data.createdById) && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="px-3 justify-self-end ">
                          <X color="red" size={20} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure to remove the group member?</DialogTitle>
                          <DialogDescription>User {user.name} will be removed from the group.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogFooter>
                            {isPending ? (
                              <ButtonLoading />
                            ) : (
                              <DialogClose asChild>
                                <Button variant="destructive" onClick={() => handleRemoveUser(user.id)}>
                                  Remove member
                                </Button>
                              </DialogClose>
                            )}
                          </DialogFooter>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
        {/* TODO redirect to invite*/}
        <CustomCardFooter
          buttonText="Invite user"
          buttonOnClick={() => navigate(`/groups/${groupId}/users/invite`)}
          backPath={`/groups/${groupId}`}
        />
      </Card>
    </>
  );
}

export default GroupUsers;
