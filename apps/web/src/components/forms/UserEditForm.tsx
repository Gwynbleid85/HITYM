import { useUserContext } from "@/context/UserContext";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UpdateUserRequest, UpdateImageRequest } from "@/types/Api";
import { updateUserSchema } from "@/validationSchemas/user.validationSchemas";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useUserUpdate, useUserProfilePictureUpdate } from "@/hooks/useUsers";
import { useNavigate } from "react-router-dom";
import CustomCardFooter from "../card/CustomCardFooter";
import { Avatar } from "../Avatar";
import { Separator } from "../ui/separator";

// Type for the user edit form, union of the user data and the image
interface UpdateRequest extends UpdateUserRequest {
  image: FileList; // Needs to be FileList, because forms treat file inputs as FileList
}

function UserEditForm() {
  const { userContext, updateUser } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: updateUserInfo } = useUserUpdate(); // Hook for updating the user info
  const { mutateAsync: updateUserProfilePicture } = useUserProfilePictureUpdate(); // Hook for updating the user info

  const form = useForm<UpdateRequest>({
    defaultValues: {
      name: userContext.user?.name,
      bio: userContext.user?.bio,
      image: undefined,
    },
    resolver: zodResolver(updateUserSchema),
  });

  // Register the file input
  const fileRef = form.register("image");

  const onSubmit = async (values: UpdateRequest) => {
    try {
      // Update profile picture
      // If the new profile picture was selected
      if (values.image[0]) {
        console.log(values.image[0]);
        const profilePictureResult = await updateUserProfilePicture({ image: values.image[0] });
        console.log(profilePictureResult.data);
      }
      // Update user info
      const userResult = await updateUserInfo({ name: values.name, bio: values.bio });
      toast({
        title: `User was updated!`,
      });
      // Update the user data in the context
      updateUser({ user: userResult.data, state: "loggedIn" });
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
    <Card className="w-[95vw] sm:max-w-[640px] max-h-[80vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">My profile</CardTitle>
          </CardHeader>
          <Separator />

          <CardContent className="grid gap-3 w-full">
            <div className="flex items-center justify-center space-x-5 mt-2 rounded-lg bg-secondary p-2">
              <Avatar name={userContext.user?.name as string} url={userContext.user?.profilePicture} size="20" />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Choose new profile picture</FormLabel>
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
                  <FormLabel className="font-semibold text-lg">User name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Bio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Give more info about yourself if you want.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CustomCardFooter
            buttonText="Save changes"
            isSubmitting={form.formState.isSubmitting}
            buttonType="submit"
            backPath="/home"
          />
        </form>
      </Form>
    </Card>
  );
}

export default UserEditForm;
