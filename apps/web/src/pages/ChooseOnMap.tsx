import { ChooseOnMapButtons } from "@/components/ChooseOnMapButtons";
import Map from "@/components/Map";
import { PositionConfig } from "@/components/PositionConfig";
import { CirclePlus } from "lucide-react";

function ChooseOnMap() {
  return (
    <Map>
      <PositionConfig />
      <ChooseOnMapButtons />
      <CirclePlus className="absolute inset-0 m-auto w-10 h-10 z-[400]" />
    </Map>
  );
}

export default ChooseOnMap;
