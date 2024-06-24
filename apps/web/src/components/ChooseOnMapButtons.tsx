import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useMap } from "react-leaflet";

export const ChooseOnMapButtons = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const map = useMap();

  const returnUrl = searchParams.get("returnUrl") ?? "/home";

  const onSubmit = () => {
    // Get coord from map
    const coord = map.getCenter();

    navigate({
      pathname: returnUrl,
      search: `?${createSearchParams([
        ["lat", coord.lat.toString()],
        ["lng", coord.lng.toString()],
      ])}`,
    });
  };

  const onCancel = () => {
    navigate({
      pathname: returnUrl,
      search: `?${createSearchParams([["asdf", "/asdf/asdf"]])}`,
    });
  };

  return (
    <Card className="fixed z-[400] w-[80%] bottom-24 p-8 left-[10%] flex items-center justify-around bg-background/85">
      <Button className="w-1/3 font-bold" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="w-1/3 font-bold" onClick={onSubmit}>
        Select
      </Button>
    </Card>
  );
};
