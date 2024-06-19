import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "../ui/button-loading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UserRegistrationRequest } from "@/types/Api";
import { userRegistrationDataSchema } from "@/validationSchemas/user.validationSchemas";
import { useUserRegistrate } from "@/hooks/useUsers";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();
  const { mutateAsync: createUser } = useUserRegistrate();
  const { toast } = useToast();

  const form = useForm<UserRegistrationRequest>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: zodResolver(userRegistrationDataSchema),
  });

  const onSubmit = async (values: UserRegistrationRequest) => {
    try {
      const result = await createUser(values);
      console.log(result);
      toast({
        title: "Account successfully created.",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white bg-opacity-95 rounded-xl m-5 shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">Sign up</CardTitle>
            <CardDescription>Enter your information to create an account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="hitym@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col">
            {!form.formState.isSubmitting ? (
              <Button type="submit" className="w-5/6">
                Create an account
              </Button>
            ) : (
              <ButtonLoading />
            )}

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
