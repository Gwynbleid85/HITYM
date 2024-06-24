import { useUserContext } from "@/context/UserContext";
import { useUserStatus, useUserStatusDelete, useUserStatusUpdate } from "@/hooks/useUsers";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import type { UpdateUserStatusRequest } from "@/types/Api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CustomCardFooter from "../card/CustomCardFooter";
import { updateUserStatusSchema } from "@/validationSchemas/user.validationSchemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function UserStatusEdit() {
  const { userContext } = useUserContext();
  const { mutateAsync: updateUserStatus } = useUserStatusUpdate();
  const { mutateAsync: deleteUserStatus } = useUserStatusDelete();
  const { data: userStatus, isSuccess } = useUserStatus(userContext.user?.id as string);
  const { toast } = useToast();

  const form = useForm<UpdateUserStatusRequest>({
    defaultValues: {
      status: "",
      color: "",
    },
    resolver: zodResolver(updateUserStatusSchema),
  });

  // Update form default values when data has finished loading
  useEffect(() => {
    if (isSuccess) {
      form.reset({
        status: userStatus?.data?.status,
        color: "", // TODO color
      });
    }
  }, [userStatus]);

  const onSubmit = async (values: UpdateUserStatusRequest) => {
    console.log("Here");
    try {
      await updateUserStatus(values);
      toast({
        title: `Status was updated!`,
      });
    } catch (e: any) {
      console.error(e);
      toast({
        title: e.error.message,
        variant: "destructive",
      });
    }
  };

  // const handleDeleteUserStatus = async () => {
  //   try {
  //     await deleteUserStatus();
  //     toast({
  //       title: `Status was deleted.`,
  //     });
  //   } catch (e: any) {
  //     toast({
  //       title: e.error.message,
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <Card className="w-[95vw] sm:max-w-[640px] max-h-[70vh] flex flex-col items-center justify-center bg-background/95 rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">My status</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 w-full">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Status</FormLabel>
                  <FormControl>
                    <div className="flex space-x-3 justify-center items-center">
                      <Input {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Do you have something on your mind?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CustomCardFooter
            buttonText="Update status"
            isSubmitting={form.formState.isSubmitting}
            buttonType="submit"
            backPath="/home"
          />
        </form>
      </Form>
    </Card>
  );
}

export default UserStatusEdit;
