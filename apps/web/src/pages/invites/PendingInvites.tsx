import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X, Check, ArrowLeft } from "lucide-react";
import { useAcceptInvite, useInvites, useRejectInvite } from "@/hooks/useGroupInvites";

import { useToast } from "@/components/ui/use-toast";
import InviteAction from "@/components/invites/InviteAction";

function PendingInvites() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: pendingInvites, isLoading } = useInvites();

  // Function to accept the invite
  const acceptInvite = async (inviteId: string) => {
    const { mutateAsync: acceptInvite } = useAcceptInvite(inviteId);

    try {
      await acceptInvite();
      toast({
        title: `Invite accepted.`,
      });
    } catch (e: any) {
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  // Function to decline the invite
  const rejectInvite = async (inviteId: string) => {
    const { mutateAsync: rejectInvite } = useRejectInvite(inviteId);

    try {
      await rejectInvite();
      toast({
        title: `Invite rejected.`,
      });
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
          <CardTitle className="text-3xl">Pending invites</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center w-full overflow-auto">
          {isLoading ? (
            <LoadingSpinner size={50} />
          ) : (
            <ScrollArea className="rounded-md border-2 w-full overflow-auto ">
              {pendingInvites?.data?.map((invite) => (
                <div className="grid grid-cols-[1fr_auto_auto] w-full items-center" key={invite.id}>
                  {/* Button 1: Left Side (Full Width) */}
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
