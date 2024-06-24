import { useState, type FC } from "react";
import { Card } from "./ui/card";
import { cn, useInterval } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { LocateFixed } from "lucide-react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import usePosition from "@/hooks/usePosition";

type PositionConfigProps = {} & JSX.IntrinsicElements["div"];

export const PositionConfig: FC<PositionConfigProps> = (props) => {
  const { className, ...otherProps } = props;
  const [effect, setEffect] = useState(false);
  const map = useMap();
  const { myPosition, trackPosition, invertTrackPosition, updatePosition } = usePosition();
  // If tracking is enabled, update the position every 2 seconds
  useInterval(() => {
    if (!trackPosition) return;
    updatePosition();
  }, 2000);

  // Center map to users position
  const centerMap = () => {
    if (trackPosition && myPosition) {
      map.panTo(new L.LatLng(myPosition.latitude, myPosition.longitude));
    }
  };

  // Toggle tracking of position
  const toggleTrackPosition = () => {
    invertTrackPosition();
    updatePosition();
  };

  return (
    <div {...otherProps} className={cn(className)}>
      {trackPosition && myPosition && (
        <Card
          className={`${
            effect && "animate-wiggle"
          } fixed z-[400] bottom-14 right-1 h-8 w-8 m-1 flex items-center justify-center cursor-pointer`}
          onClick={() => {
            setEffect(true);
            centerMap();
          }}
          onAnimationEnd={() => setEffect(false)}
        >
          <LocateFixed />
        </Card>
      )}
      <div className="fixed z-[400] bottom-6 right-2 flex items-center space-x-2 justify-center bg-slate-50 p-1 rounded-md">
        <Label htmlFor="track-position flex items-center">Track position</Label>
        <Switch className="" onClick={() => toggleTrackPosition()} />
      </div>
    </div>
  );
};
