import { Marker } from "react-leaflet";
import type { FC } from "react";
import L from "leaflet";

const MARKER_SIZE = 40;
const MARKER_SIZE_HALF = MARKER_SIZE / 2;

type CurrentLocationMarkerProps = {
  latitude: number;
  longitude: number;
};

export const CurrentLocationMarker: FC<CurrentLocationMarkerProps> = (props) => {
  const { latitude, longitude, ...otherProps } = props;

  const icon = L.divIcon({
    html: `<div class="flex items-center justify-center w-full h-full rounded-full bg-cyan-400"></div>`,
    iconSize: [MARKER_SIZE, MARKER_SIZE], // size of the icon
    iconAnchor: [MARKER_SIZE_HALF, MARKER_SIZE_HALF], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -MARKER_SIZE_HALF], // point from which the popup should open relative to the iconAnchor
    className: `rounded-full border-2 border-cyan-900 shadow-md`,
  });

  return <Marker {...otherProps} position={[latitude, longitude]} title="Me" icon={icon}></Marker>;
};
