import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useGroupExtended } from "@/hooks/useGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button"; // Import Button component
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X } from "lucide-react";
import CustomCardFooter from "@/components/CustomCardFooter";

function Groups() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: groupExtended, isLoading } = useGroupExtended(id as string);

  const handleClick = (id: string) => {
    navigate(`/groups/${id}`); // Navigate directly
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
                  <Button variant="ghost" className=" truncate flex items-center justify-start space-x-4 px-3 h-fit">
                    <Avatar name={user.name} url={user.profilePicture} size="12"/>
                    <div className="truncate">
                      <h4 className="font-semibold">{user.name}</h4>
                    </div>
                  </Button>
                  {/* Button 2: Right Side */}
                  <Button variant="ghost" className="px-3 justify-self-end ">
                    <X color="red" size={20} />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
        {/* TODO redirect to invite*/}
        <CustomCardFooter
          buttonText="Invite user"
          buttonOnClick={() => navigate(`/groups/${id}/users/invite`)}
          backPath={`/groups/${id}`}
        />
      </Card>
    </>
  );
}

export default Groups;
