import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroupExtended } from "@/hooks/useGroups";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomCardFooter from "@/components/card/CustomCardFooter";
import { useUserContext } from "@/context/UserContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Avatar } from "@/components/Avatar";
import { Label } from "@/components/ui/label";

import { useGroupEvent } from "@/hooks/useGroupEvents";
import { usePlaces } from "@/hooks/usePlaces";
import { NavigateButton } from "@/components/NavigateButton";

function GroupEventOverview() {
  const navigate = useNavigate();
  const { groupId, eventId } = useParams();
  const { data: groupEvent, isLoading } = useGroupEvent(eventId as string);
  const { data: places } = usePlaces();

  const eventPlace = useMemo(() => {
    return places?.data.find((place) => place.id === groupEvent?.data.placeId);
  }, [groupEvent, places]);

  // Format the date
  const readableDate = useMemo(() => {
    return new Date(groupEvent?.data.date ?? "").toLocaleDateString();
  }, [groupEvent]);

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        {isLoading ? (
          <LoadingSpinner size={50} />
        ) : (
          <>
            <CardHeader className=" rounded-xl bg-slate-100 p-1 m-5 pt-2 w-11/12 ">
              <CardTitle className="text-4xl flex items-center justify-center text-center pb-1">
                {groupEvent?.data.name}
              </CardTitle>
              <CardContent className="flex flex-row items-center gap-4">
                <Avatar
                  name={groupEvent?.data.name ?? ""}
                  url={groupEvent?.data.imageUrl}
                  className="w-20 h-20"
                ></Avatar>
                <div className="text-sm rounded-md bg-gray-300 p-2 text-center text w-full ">
                  {groupEvent?.data.description}
                </div>
              </CardContent>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center w-full pb-3">
              <div className="flex flex-col sm:flex-row justify-around w-full">
                <Card>
                  <CardHeader className="py-2 mb-0">
                    <CardTitle className="text-xl">Where?</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center py-2 my-0 space-x-2">
                    <Avatar name={eventPlace?.name ?? ""} url={eventPlace?.imageUrl}></Avatar>
                    <div className="font-semibold">{eventPlace?.name}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-2 mb-0">
                    <CardTitle className="text-xl">When?</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center py-2 my-0 space-x-2">
                    <div className="font-semibold">{readableDate}</div>
                  </CardContent>
                </Card>
              </div>

              <NavigateButton
                latitude={eventPlace?.position.latitude ?? 0}
                longitude={eventPlace?.position.longitude ?? 0}
                className="w-fit px-10 mt-5"
              ></NavigateButton>
            </CardContent>

            <CustomCardFooter
              buttonText="Edit event"
              buttonOnClick={() => navigate(`/groups/${groupId}/events/${eventId}/edit`)}
              backPath={`/groups/${groupId}/events`}
            />
          </>
        )}
      </Card>
    </>
  );
}

export default GroupEventOverview;
