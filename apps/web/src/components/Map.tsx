import React from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import usePosition from "@/hooks/usePosition";
import { CircleMarker, Popup } from "react-leaflet";
import { UserMapPopup } from "./user-map-popup";

const stringToColor = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};

export function Map() {
  const { users } = usePosition();

  return (
    <MapContainer
      zoomControl={false}
      center={[51.505, -0.09]}
      zoom={12}
      style={{ height: "100vh", width: "100vw" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(users).map(([key, user]) => {
        if (!user.position) {
          return null;
        }
        return (
          <CircleMarker
            key={key}
            center={[user.position.latitude, user.position.longitude]}
            radius={10}
            color={stringToColor(key)}
          >
            <Popup>
              <UserMapPopup user={user} />
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
