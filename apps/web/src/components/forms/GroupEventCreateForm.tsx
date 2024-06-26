"use client";

import React from "react";
import { Button } from "../ui/button";
import {  useNavigate, useParams,  } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { usePlaces } from "@/hooks/usePlaces";
import CustomCardFooter from "../card/CustomCardFooter";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import type { CreateGroupEventRequest } from "@/types/Api";
import { createGroupEventSchema } from "@/validationSchemas/groupEvent.ValidationSchemas";
import { useCreateGroupEvent } from "@/hooks/useGroupEvents";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function GroupEventCreateForm() {
  const navigate = useNavigate();
  const { mutateAsync: createGroupEvent } = useCreateGroupEvent();
  const { data: places, isLoading } = usePlaces();
  const { groupId } = useParams();
  const { toast } = useToast();

  console.log(places);

  const form = useForm<CreateGroupEventRequest>({
    defaultValues: {
      name: "",
      description: "",
      groupId: groupId,
    },
    resolver: zodResolver(createGroupEventSchema),
  });

  const onSubmit = async (values: CreateGroupEventRequest) => {
    try {
      await createGroupEvent(values);
      toast({
        title: "Group event created successfully",
      });
      navigate(`/groups/${groupId}/events`);
    } catch (e: any) {
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">Create new event</CardTitle>
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
                          initialFocus
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
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
            buttonText="Create event"
            isSubmitting={form.formState.isSubmitting}
            buttonType="submit"
            backPath={`/groups/${groupId}/events`}
          />
        </form>
      </Form>
    </Card>
  );
}

export default GroupEventCreateForm;
