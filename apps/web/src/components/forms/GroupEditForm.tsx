import React, { useEffect } from "react";
import type { CreateGroupRequest } from "@/types/Api";
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "../ui/button-loading";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateGroupSchema } from "@/validationSchemas/group.validationSchemas";
import { useGroup, useGroupUpdate } from "@/hooks/useGroups";
import { useNavigate, useParams } from "react-router-dom";

function GroupEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutateAsync: updateGroup } = useGroupUpdate(id as string); // Hook for updating the group data
  const { data: group, isLoading, isError } = useGroup(id as string); // Get the group data
  const { toast } = useToast();

  const form = useForm<CreateGroupRequest>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(updateGroupSchema),
  });

  // Update form default values when data has finished loading
  useEffect(() => {
    if (!isLoading) {
      form.reset({
        name: group?.data?.name,
        description: group?.data?.description,
      });
    }
    // Check if group was not found or if there was an error
    if (isError) {
      toast({
        title: "Group could not be found or fetched.",
        variant: "destructive",
      });
      navigate(`/home`); // Navigate to home page
    }
  }, [group, form, isLoading]);

  const onSubmit = async (values: CreateGroupRequest) => {
    try {
      await updateGroup(values);
      toast({
        title: `Group was updated!`,
      });
      navigate(`/groups/${id}`); // Navigate to group overview
    } catch (e) {
      // Handle error
      console.error(e);
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm bg-background/95 rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">Editing group</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Name of group</FormLabel>
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
                  <FormLabel className="font-medium">Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Give more info about the group if you want.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col">
            {!form.formState.isSubmitting ? (
              <Button type="submit" className="w-5/6">
                Update group
              </Button>
            ) : (
              <ButtonLoading />
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default GroupEditForm;
