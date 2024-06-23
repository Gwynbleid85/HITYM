import CustomCardFooter from "@/components/card/CustomCardFooter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useUsers } from "@/hooks/useUsers";
import { Avatar } from "@/components/Avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useInviteUserToGroup } from "@/hooks/useGroupInvites";
import type { InviteUserToGroupRequest } from "@/types/Api";
import { useToast } from "@/components/ui/use-toast";

function UserInvite() {
  const { toast } = useToast();

  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { data: allUsers, isLoading } = useUsers();
  const [searchUser, setSearchUser] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const { mutateAsync: inviteUser, isPending } = useInviteUserToGroup(selectedUserId); // Hook for inviting the user

  // Filter the users based on searching
  const filteredUsers = allUsers?.data.filter((user) => user.name.toLowerCase().includes(searchUser.toLowerCase()));

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleSubmit = async () => {
    try {
      console.log(groupId);
      await inviteUser({ groupId: groupId } as InviteUserToGroupRequest);
      toast({
        title: `User was invited!`,
      });
      navigate(`/groups/${groupId}/users`);
    } catch (e: any) {
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[70vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Choose a new member</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center w-full overflow-auto">
          {isLoading ? (
            <LoadingSpinner size={50} />
          ) : (
            <>
              {/* Search Input */}
              <div className="w-full p-4">
                <Input
                  placeholder="Search by name..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </div>
              <ScrollArea className="rounded-md border-2 w-full overflow-auto ">
                {filteredUsers?.map((user) => (
                  <Button
                    key={user.id}
                    variant={selectedUserId === user.id ? "default" : "ghost"}
                    onClick={() => handleUserClick(user.id)}
                    className=" flex justify-start space-x-4 w-full h-fit px-2"
                  >
                    {/* TODO avatar color */}
                    <Avatar name={user.name} url={user.profilePicture} size="12" />
                    <div className="flex flex-col items-start">
                      <h4 className="font-semibold ">{user.name}</h4>
                    </div>
                  </Button>
                ))}
              </ScrollArea>
            </>
          )}
        </CardContent>
        <Separator />
        <CardFooter className="flex w-full justify-around mt-3 pb-3">
          <Button variant="secondary" size="icon" onClick={() => navigate(`/groups/${groupId}/users`)}>
            <ArrowLeft />
          </Button>

          {isPending ? (
            <ButtonLoading />
          ) : (
            <Button disabled={selectedUserId === ""} className="px-5 h-fit" onClick={() => handleSubmit()}>
              <span className="py-1">Invite</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default UserInvite;
