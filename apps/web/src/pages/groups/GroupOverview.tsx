import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGroupExtended } from "@/hooks/useGroups";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomCardFooter from "@/components/card/CustomCardFooter";
import { useUserContext } from "@/context/UserContext";

function GroupOverview() {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { isAuthorized } = useUserContext();

  const { data: groupExtended, isLoading } = useGroupExtended(groupId as string); 

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Group overview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col w-full pb-3">
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
      </Card>
    </>
  );
}

export default GroupOverview;
