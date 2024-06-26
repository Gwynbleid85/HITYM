"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useCreatePlace, usePlaces } from "@/hooks/usePlaces";
import type { CreatePlaceRequest, UpdateGroupEventRequest } from "@/types/Api";
import { createPlaceSchema } from "@/validationSchemas/place.validationSchema";
import CustomCardFooter from "../card/CustomCardFooter";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import type { CreateGroupEventRequest } from "@/types/Api";
import { createGroupEventSchema, updateGroupEventSchema } from "@/validationSchemas/groupEvent.ValidationSchemas";
import { useCreateGroupEvent, useGroupEvent, useUpdateGroupEvent } from "@/hooks/useGroupEvents";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function GroupEventEditForm() {
  const navigate = useNavigate();
  const { groupId, eventId } = useParams();
  const { mutateAsync: updateGroupEventInfo } = useUpdateGroupEvent(eventId as string);
  const { data: groupEvent, isLoading: isLoadingEvent } = useGroupEvent(eventId as string);
  const { data: places, isLoading: isLoadingPlaces } = usePlaces();

  const { toast } = useToast();

  const form = useForm<UpdateGroupEventRequest>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(updateGroupEventSchema),
  });

  const onSubmit = async (values: UpdateGroupEventRequest) => {
    try {
      //TODO
      await updateGroupEventInfo(values);
      toast({
        title: "Group event updated successfully",
      });
    } catch (e: any) {
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  // Update form default values when data has finished loading
  useEffect(() => {
    if (!isLoadingEvent) {
      form.reset({
        name: groupEvent?.data?.name,
        description: groupEvent?.data?.description,
        date: groupEvent?.data?.date,
        placeId: groupEvent?.data?.placeId,
      });
    }
  }, [groupEvent, form, isLoadingEvent]);

  return (
    <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">Editing event</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 w-full overflow-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-base">Event name</FormLabel>
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
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-base">Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Give more info about the event if you want.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:space-y-0 space-y-3 sm:space-x-3 sm:flex-row">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full mt-">
                    <FormLabel className="font-semibold text-base">Event date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "flex justify-start w-full pl-3 text-left font-normal space-x-3",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placeId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-base mt-10">Select a place for the event</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose place" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {places?.data.map((place) => (
                          <SelectItem key={place.id} value={place.id}>
                            {place.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CustomCardFooter
            buttonText="Update event"
            isSubmitting={form.formState.isSubmitting}
            buttonType="submit"
            backPath={`/groups/${groupId}/events/${eventId}`}
          />
        </form>
      </Form>
    </Card>
  );
}

export default GroupEventEditForm;
