import { X, Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useAcceptInvite, useRejectInvite } from "@/hooks/useGroupInvites";
import { useToast } from "../ui/use-toast";

interface InviteActionProps {
  inviteId: string;
}

// Component to accept or reject an invite, needs to be seperate because of the hooks
const InviteAction: React.FC<InviteActionProps> = ({ inviteId }) => {
  const { mutateAsync: acceptInvite } = useAcceptInvite(inviteId);
  const { mutateAsync: rejectInvite } = useRejectInvite(inviteId);
  const { toast } = useToast();

  // Function to accept the invite
  const handleAccept = async () => {
    try {
      await acceptInvite();
      toast({ title: "Invite accepted!" });
    } catch (e: any) {
      toast({ title: e.error.message, variant: "destructive" });
    }
  };

  // Function to decline the invite
  const handleReject = async () => {
    try {
      await rejectInvite();
      toast({ title: "Invite rejected!" });
    } catch (e: any) {
      toast({ title: e.error.message, variant: "destructive" });
    }
  };

  return (
    <>
      <Button variant="ghost" className="px-3 justify-self-end" onClick={() => handleReject()}>
        <X color="red" size={20} />
      </Button>
      <Button variant="ghost" className="px-3 justify-self-end" onClick={() => handleAccept()}>
        <Check color="green" size={20} /> {/* Use your Check component */}
      </Button>
    </>
  );
};

export default InviteAction;
