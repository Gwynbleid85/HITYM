import type { FC } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MapPinned } from "lucide-react";
import { useTrackPositionContext } from "@/context/TrackPositionContext";

type PositionConfigProps = {
  latitude: number;
  longitude: number;
} & JSX.IntrinsicElements["div"];

export const NavigateButton: FC<PositionConfigProps> = (props) => {
  const { latitude, longitude, className, ...otherProps } = props;
  const { myPosition } = useTrackPositionContext();

  const navigateToGoogleMaps = () => {
    const url = `https://www.google.cz/maps/dir/${myPosition?.latitude},${myPosition?.longitude}/${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <Button className={cn("", className)} onClick={() => navigateToGoogleMaps()}>
      <MapPinned className="" />
    </Button>
  );
};
