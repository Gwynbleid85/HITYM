import { Marker, Popup } from "react-leaflet";
import type { UserInfo } from "@/hooks/usePosition";
import type { FC } from "react";
import L from "leaflet";
import { stringAvatar } from "@/utils";
import { MapUserPopup } from "./MapUserPopup";

const MARKER_SIZE = 40;
const MARKER_SIZE_HALF = MARKER_SIZE / 2;

type MapUserMarkerProps = {
  userId: string;
  user: UserInfo;
};

export const MapUserMarker: FC<MapUserMarkerProps> = (props) => {
  const { userId, user, ...otherProps } = props;

  if (!user.position) {
    return null;
  }

  let icon = null;
  const imageUrl = user.profilePicture;
  // user has a profile picture
  if (imageUrl) {
    icon = L.icon({
      iconUrl: imageUrl.startsWith("/") ? process.env.NEXT_PUBLIC_API_URL + imageUrl : imageUrl,

      iconSize: [MARKER_SIZE, MARKER_SIZE], // size of the icon
      iconAnchor: [MARKER_SIZE_HALF, MARKER_SIZE_HALF], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -MARKER_SIZE_HALF], // point from which the popup should open relative to the iconAnchor
      className: `rounded-full border-2 border-white bg-white shadow-md ${!user.active && "grayscale"}`,
    });
  }
  // user does not have a profile picture
  else {
    const avatarData = stringAvatar(user.name);

    icon = L.divIcon({
      html: `<div class="flex items-center justify-center w-full h-full rounded-full" style="background-color:${avatarData.color}"}"}>${avatarData.name}</div>`,
      iconSize: [MARKER_SIZE, MARKER_SIZE], // size of the icon
      iconAnchor: [MARKER_SIZE_HALF, MARKER_SIZE_HALF], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -MARKER_SIZE_HALF], // point from which the popup should open relative to the iconAnchor
      className: `rounded-full border-2 border-white shadow-md ${!user.active && "grayscale"}`,
    });
  }

  return (
    <Marker {...otherProps} position={[user.position.latitude, user.position.longitude]} title={user.name} icon={icon}>
      <div className="">asdf</div>
      <Popup className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <MapUserPopup user={user} />
      </Popup>
    </Marker>
  );
};
