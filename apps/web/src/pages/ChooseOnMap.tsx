import { ChooseOnMapButtons } from "@/components/ChooseOnMapButtons";
import Map from "@/components/Map";
import { PositionConfig } from "@/components/PositionConfig";
import { MapPin } from "lucide-react";

function ChooseOnMap() {
  return (
    <Map>
      <PositionConfig />
      <ChooseOnMapButtons />
      <MapPin className="absolute inset-0 m-auto w-10 h-10 z-[400] -translate-y-4 " />
    </Map>
  );
}

export default ChooseOnMap;
