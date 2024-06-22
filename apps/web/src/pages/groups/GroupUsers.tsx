import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useGroupExtended } from "@/hooks/useGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <Card className="flex flex-col items-center justify-center w-full max-w-sm min-w-72 bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Group members</CardTitle>
        </CardHeader>
        {isLoading ? (
          <LoadingSpinner size={50} className="" />
        ) : (
          <div>
            <CardContent className="flex justify-center">
              <ScrollArea className=" w-fit rounded-md max-h-72 border-2 ">
                {groupExtended?.data?.users?.map((user) => (
                  <div className="flex items-center" key={user.id}>
                    <Button variant="ghost" className="flex justify-start space-x-4 w-full h-fit px-10 ">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.profilePicture} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-start">
                        <h4 className="font-semibold">{user.name}</h4>
                      </div>
                    </Button>
                    <Button variant="ghost">
                      <X color="red" size={20} />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            {/* TODO redirect to invite*/}
            <CustomCardFooter
              buttonText="Invite user"
              buttonOnClick={() => navigate("/home")}
              backPath={`/groups/${id}`}
            />
          </div>
        )}
      </Card>
    </>
  );
}

export default Groups;
