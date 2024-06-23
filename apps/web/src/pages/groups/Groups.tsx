import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useGroups } from "@/hooks/useGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/Avatar";
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
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">My groups</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center w-full">
          {isLoading ? (
            <LoadingSpinner size={50} />
          ) : (
            <ScrollArea className="rounded-md border-2 w-full overflow-auto">
              {groups?.data?.map((group) => (
                <Button
                  key={group.id}
                  variant="ghost"
                  className=" flex justify-start space-x-4 w-full h-fit px-2"
                  onClick={() => handleClick(group.id)}
                >
                  <Avatar name={group.name} url={group.imageUrl} size="12"/>
                  <div className="flex flex-col items-start">
                    <h4 className="font-semibold ">{group.name}</h4>
                    <p className="text-sm text-muted-foreground w-full">{group.description}</p>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          )}
        </CardContent>
        <CustomCardFooter buttonText="Create new" buttonOnClick={() => navigate("/groups/create")} backPath="/" />
      </Card>
    </>
  );
}

export default Groups;
