import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useGroups } from "@/hooks/useGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Import Button component
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CustomCardFooter from "@/components/CustomCardFooter";

function Groups() {
  const navigate = useNavigate();
  const { data: groups, isLoading } = useGroups();

  const handleClick = (id: string) => {
    navigate(`/groups/${id}`); // Navigate directly
  };

  return (
    <>
      <Card className="flex flex-col items-center justify-center w-full max-w-sm min-w-72 bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">My groups</CardTitle>
        </CardHeader>
        {isLoading ? (
          <LoadingSpinner size={50} className="" />
        ) : (
          <div>
            <CardContent className="flex justify-center">
              <ScrollArea className=" w-fit rounded-md max-h-72 border-2 ">
                {groups?.data?.map((group) => (
                  <Button
                    key={group.id}
                    variant="ghost"
                    className="flex justify-start space-x-4 w-full h-fit px-10 "
                    onClick={() => handleClick(group.id)}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={group.imageUrl} />
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <h4 className="font-semibold">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </Button>
                ))}
              </ScrollArea>
            </CardContent>
            <CustomCardFooter buttonText="Create new" buttonOnClick={() => navigate("/groups/create")} backPath="/" />
          </div>
        )}
      </Card>
    </>
  );
}

export default Groups;
