import React, { useEffect } from "react";
import type { UpdateGroupRequest } from "@/types/Api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateGroupSchema } from "@/validationSchemas/group.validationSchemas";
import { useGroup, useGroupProfilePictureUpdate, useGroupUpdate } from "@/hooks/useGroups";
import { useNavigate, useParams } from "react-router-dom";
import CustomCardFooter from "../card/CustomCardFooter";
import { Separator } from "../ui/separator";
import { Avatar } from "../Avatar";

// Interface for the event edit form, union of the event data and the image
interface UpdateRequest extends UpdateGroupRequest {
  image: FileList; // Needs to be FileList, because forms treat file inputs as FileList
}

function GroupEditForm() {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const { mutateAsync: updateGroupInfo } = useGroupUpdate(groupId as string); // Hook for updating the group data
  const { mutateAsync: updateGroupProfilePicture } = useGroupProfilePictureUpdate(groupId as string); // Hook for updating the group profile picture
  const { data: group, isLoading, isError } = useGroup(groupId as string); // Get the group data
  const { toast } = useToast();

  const form = useForm<UpdateRequest>({
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
    resolver: zodResolver(updateGroupSchema),
  });

  // Register the file input
  const fileRef = form.register("image");

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

  const onSubmit = async (values: UpdateRequest) => {
    try {
      // Update profile picture
      // If the new profile picture was selected
      if (values.image[0]) {
        const imageResult = await updateGroupProfilePicture({ image: values.image[0] });
      }
      // Update user info
      await updateGroupInfo({ name: values.name, description: values.description });
      toast({
        title: `Group was updated!`,
      });
    } catch (e: any) {
      console.error(e);
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  // Source of file upload: https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81

  return (
    <>
      <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardHeader className="items-center justify-center">
              <CardTitle className="text-3xl">Editing group</CardTitle>
            </CardHeader>
            <Separator />

            <CardContent className="grid gap-3 w-full">
              <div className="flex items-center justify-center space-x-5 mt-2 rounded-lg bg-secondary p-2">
                <Avatar name={group?.data?.name ?? ""} url={group?.data?.imageUrl as string} size="20" />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Choose new group picture</FormLabel>
                      <FormControl>
                        <Input type="file" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">Group name</FormLabel>
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
                    <FormDescription>Give more info about group if you want.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CustomCardFooter
              buttonText="Save changes"
              isSubmitting={form.formState.isSubmitting}
              buttonType="submit"
              backPath={`/groups/${groupId}`}
            />
          </form>
        </Form>
      </Card>
    </>
  );
}

export default GroupEditForm;
