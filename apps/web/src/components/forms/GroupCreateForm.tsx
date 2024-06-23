import React from "react";
import type { CreateGroupRequest } from "@/types/Api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "../ui/button-loading";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createGroupSchema } from "@/validationSchemas/group.validationSchemas";
import { useGroupCreate } from "@/hooks/useGroups";
import { useNavigate } from "react-router-dom";
import CustomCardFooter from "../CustomCardFooter";

function GroupCreateForm() {
  const navigate = useNavigate();
  const { mutateAsync: createGroup } = useGroupCreate();
  const { toast } = useToast();

  const form = useForm<CreateGroupRequest>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createGroupSchema),
  });

  const onSubmit = async (values: CreateGroupRequest) => {
    try {
      const result = await createGroup(values);
      toast({
        title: `Group ${result.data.name} created!`,
      });
      // Redirect to groups page
      navigate("/groups");
    } catch (e: any) {
      console.error(e);
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
          <CardHeader className="items-center justify-center" >
            <CardTitle className="text-3xl">Create new group</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 w-full">
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

          <CustomCardFooter
            buttonText="Create group"
            isSubmitting={form.formState.isSubmitting}
            buttonType="submit"
            backPath="/groups"
          />
        </form>
      </Form>
    </Card>
  );
}

export default GroupCreateForm;
