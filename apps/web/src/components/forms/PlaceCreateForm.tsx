import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useCreatePlace } from "@/hooks/usePlaces";
import type { CreatePlaceRequest } from "@/types/Api";
import { createPlaceSchema } from "@/validationSchemas/place.validationSchema";
import CustomCardFooter from "../card/CustomCardFooter";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import usePersistentData from "@/hooks/usePersistentData";
import { Separator } from "../ui/separator";
import { ArrowLeft } from "lucide-react";
import { ButtonLoading } from "../ui/button-loading";

function PlaceCreateForm() {
  const navigate = useNavigate();
  const { mutateAsync: createPlace } = useCreatePlace();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { appData, updateAppData, resetAppData } = usePersistentData();

  // Function to handle the map redirect
  const handleMapRedirect = () => {
    updateAppData({ newPlace: form.getValues() });
    const url = "/places/create";
    navigate({
      pathname: "./choose-on-map",
      search: `?${createSearchParams([["returnUrl", url]])}`,
    });
  };

  const form = useForm<CreatePlaceRequest>({
    defaultValues: {
      name: "",
      description: "",
      position: {
        latitude: 0,
        longitude: 0,
      },
    },
    resolver: zodResolver(createPlaceSchema),
  });

  // Change the longitude and latitude fields when redirected from the map
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (appData.newPlace) {
      form.setValue("name", appData.newPlace.name);
      form.setValue("description", appData.newPlace.description);
      form.setValue("position.latitude", appData.newPlace.position.latitude);
      form.setValue("position.longitude", appData.newPlace.position.longitude);
    }
    if (lat && lng) {
      form.setValue("position.latitude", parseFloat(lat));
      form.setValue("position.longitude", parseFloat(lng));
    }
  }, [lat, lng, appData]);

  const onSubmit = async (values: CreatePlaceRequest) => {
    try {
      const result = await createPlace(values);
      resetAppData();
      toast({
        title: `Place ${result.data.name} created!`,
      });
    } catch (e: any) {
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    updateAppData({ newPlace: form.getValues() });
    navigate("/home");
  };

  return (
    <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">Create new place</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Place name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Give more info about the place if you want.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row  justify-around space-x-3">
              <FormField
                control={form.control}
                name="position.latitude"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-lg">Longitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position.longitude"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-lg">Latitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="mt-2" onClick={() => handleMapRedirect()}>
              Choose on map
            </Button>
          </CardContent>
          <Separator />
          <CardFooter className="flex w-full justify-around mt-3 pb-3">
            <Button variant="secondary" size="icon" onClick={() => handleBack()}>
              <ArrowLeft />
            </Button>

            <div>
              {form.formState.isSubmitting ? (
                <ButtonLoading />
              ) : (
                // Only show second button even if first condition is met
                <Button className="px-5 h-fit" type="submit">
                  <span className="py-1">Create place</span>
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default PlaceCreateForm;
