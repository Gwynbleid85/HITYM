import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useGroups } from "@/hooks/useGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Import Button component
import { useNavigate } from "react-router-dom";

function Groups() {
  const navigate = useNavigate();
  const { data: groups, isLoading } = useGroups();

  const handleClick = (id: string) => {
    console.log(id);
    //TODO
  };

  return (
    <>
      <Card className="w-full max-w-sm min-w-64 bg-background/95 rounded-xl shadow-xl">
        <CardHeader className="items-center justify-center">
          <CardTitle className="text-3xl">My groups</CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center">
          <ScrollArea className=" w-fit max-h-80 rounded-md border-2 ">
            {groups?.data?.map((group) => (
              <Button
                key={group.id}
                variant="ghost"
                className="flex justify-start space-x-4 w-full h-fit "
                onClick={() => handleClick(group.id)}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={group.imageUrl} />
                  <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">{group.name}</h4>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                </div>
              </Button>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-1/2 min-w-fit" onClick={() => navigate("/groups/create")}>
            Create new
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Groups;
