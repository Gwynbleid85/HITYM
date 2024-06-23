import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrowLeft } from "lucide-react";
import { useInvites } from "@/hooks/useGroupInvites";

import InviteAction from "@/components/invites/InviteAction";

function PendingInvites() {
  const navigate = useNavigate();
  const { data: pendingInvites, isLoading } = useInvites();

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[70vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Pending invites</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center w-full overflow-auto">
          {isLoading ? (
            <LoadingSpinner size={50} />
          ) : (pendingInvites?.data?.length ?? 0) > 0 ? ( // Check if there are any invites
            <ScrollArea className="rounded-md border-2 w-full overflow-auto ">
              {pendingInvites?.data?.map((invite) => (
                <div className="grid grid-cols-[1fr_auto_auto] w-full items-center" key={invite.id}>
                  <Button variant="ghost" className=" truncate flex items-center justify-start space-x-4 px-3 h-fit">
                    <Avatar name={invite.group?.name || ""} url={invite.group?.imageUrl} size="12" />
                    <div className="flex flex-col items-start truncate">
                      <h4 className="font-semibold">{invite.group?.name}</h4>
                      <p className="text-sm text-muted-foreground w-full">{invite.group?.description}</p>
                    </div>
                  </Button>
                  <InviteAction key={invite.id} inviteId={invite.id} />
                </div>
              ))}
            </ScrollArea>
          ) : (
            <p>You have no pending invites :/</p> // Message when there are no invites
          )}
        </CardContent>
        <CardFooter className="flex w-full justify-center items-center mt-3 pb-3">
          <Button variant="secondary" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default PendingInvites;
