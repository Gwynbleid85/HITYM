import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useMemo } from "react";
import { useGroupExtended } from "@/hooks/useGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { X } from "lucide-react";
import CustomCardFooter from "@/components/card/CustomCardFooter";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRemoveGroupEvent } from "@/hooks/useGroupEvents";
import { useToast } from "@/components/ui/use-toast";
import { ButtonLoading } from "@/components/ui/button-loading";
import { useUserContext } from "@/context/UserContext";
import { NavigateButton } from "@/components/NavigateButton";
import { usePlaces } from "@/hooks/usePlaces";
import type { Place } from "@/types/Api";

// Component to display the group members
function GroupEvents() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthorized } = useUserContext();
  const { id: groupId } = useParams();
  const { data: groupExtended, isLoading } = useGroupExtended(groupId as string);
  const { data: places } = usePlaces();
  const { mutateAsync: deleteEvent, isPending } = useRemoveGroupEvent();



  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      toast({
        title: `Event was deleted.`,
      });
    } catch (e: any) {
      toast({
        title: "Could not delete the event.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[70vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Group events</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center w-full overflow-auto">
          {isLoading ? (
            <LoadingSpinner size={50} />
          ) : (
            <ScrollArea className="rounded-md border-2 w-full overflow-auto ">
              {groupExtended?.data?.events?.map((event) => (
                <div className="grid grid-cols-[1fr_auto_auto] w-full items-center gap-2" key={event.id}>
                  {/* Button 1: Left Side (Full Width) */}
                  <Button
                    variant="ghost"
                    className="truncate flex items-center justify-start space-x-4 px-3 h-fit"
                    onClick={() => navigate(`/groups/${groupId}/events/${event.id}`)}
                  >
                    <Avatar name={event.name} url={event.imageUrl} size="12" />
                    <div className="truncate">
                      <h4 className="font-semibold">{event.name}</h4>
                    </div>
                  </Button>
                  {/* Button for deleting event: Show only if loggen in event is the owner of group */}
              
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="px-3 justify-self-end ">
                        <X color="red" size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure to delete the event?</DialogTitle>
                        <DialogDescription>Event {event.name} will be deleted.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogFooter>
                          {isPending ? (
                            <ButtonLoading />
                          ) : (
                            <DialogClose asChild>
                              <Button variant="destructive" onClick={() => handleDeleteEvent(event.id)}>
                                Delete event
                              </Button>
                            </DialogClose>
                          )}
                        </DialogFooter>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
        <CustomCardFooter
          buttonText="Create event"
          buttonOnClick={() => navigate(`/groups/${groupId}/events/create`)}
          backPath={`/groups/${groupId}`}
        />
      </Card>
    </>
  );
}

export default GroupEvents;
