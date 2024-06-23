import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGroupExtended } from "@/hooks/useGroups";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomCardFooter from "@/components/CustomCardFooter";

function GroupOverview() {
  const navigate = useNavigate();
  const { id } = useParams();

  //   const { data: groups, isLoading } = useGroupExtended(id);

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Group overview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col w-full pb-3">
          <Button variant="secondary" className="my-3" onClick={() => navigate(`/groups/${id}/events`)}>
            <span>Show events</span>
          </Button>
          <Button variant="secondary" onClick={() => navigate(`/groups/${id}/users`)}>
            <span>Show members</span>
          </Button>
        </CardContent>
        <CustomCardFooter
          buttonText="Edit group"
          buttonOnClick={() => navigate(`/groups/${id}/edit`)}
          backPath="/groups"
        />
      </Card>
    </>
  );
}

export default GroupOverview;
