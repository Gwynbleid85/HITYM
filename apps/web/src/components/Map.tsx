import React, { useEffect, type FC } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { MapUserMarker } from "./MapUserMarker";
import { useUserContext } from "@/context/UserContext";
import { useTrackPositionContext } from "@/context/TrackPositionContext";
import { CurrentLocationMarker } from "./CurrentLocationMarker";

type MapProps = {} & React.ComponentProps<typeof MapContainer>;

export const Map: FC<MapProps> = (props) => {
  const { children, ...otherProps } = props;

  const { usersPositions, myPosition, trackPosition } = useTrackPositionContext();
  const { userContext } = useUserContext();

  useEffect(() => {
    console.log("Map rendered");
  }, []);

  return (
    <MapContainer
      zoomControl={false}
      center={[51.505, -0.09]}
      zoom={12}
      style={{ height: "100vh", width: "100vw" }}
      className="z-0"
      {...otherProps}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(usersPositions).map(([userId, user]) => {
        if (!user.position || userId === userContext.user?.id) {
          return null;
        }
        return <MapUserMarker key={userId} userId={userId} user={user} />;
      })}
      {children}

      {trackPosition && myPosition && (
        <CurrentLocationMarker latitude={myPosition.latitude} longitude={myPosition.longitude} />
      )}
    </MapContainer>
  );
};

export default Map;
