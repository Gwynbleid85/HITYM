import React, { type FC } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import usePosition from "@/hooks/usePosition";
import { MapUserMarker } from "./MapUserMarker";
import { Marker } from "react-leaflet";

type MapProps = {} & React.ComponentProps<typeof MapContainer>;

export const Map: FC<MapProps> = (props) => {
  const { children, ...otherProps } = props;

  const { users, myPosition, trackPosition } = usePosition();

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

      {Object.entries(users).map(([userId, user]) => {
        if (!user.position) {
          return null;
        }
        return <MapUserMarker key={userId} userId={userId} user={user} />;
      })}
      {trackPosition && myPosition && (
        <Marker position={[51.505, -0.09]} />
        // <CurrentLocationMarker latitude={myPosition.latitude} longitude={myPosition.longitude} />
      )}
      {children}
    </MapContainer>
  );
};

export default Map;
