import React from "react";
import { Button } from "@/components/ui/button";
import useWebsockets from "@/hooks/usePosition";
import { ReadyState } from "react-use-websocket";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { CircleMarker } from "react-leaflet";

let counter = 0;

const stringToColour = (str: string) => {
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


  return (
    <MapContainer zoomControl={false} center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100vw" }} className="z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
