import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "../ui/button-loading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UserLoginRequest } from "@/types/Api";
import { userLoginDataSchema } from "@/validationSchemas/user.validationSchemas";
import { useUserLogin } from "@/hooks/useUsers";
import { useNavigate } from "react-router-dom";
import usePersistentData from "@/hooks/usePersistentData";
import { useUserContext } from "@/context/UserContext";

export function LoginForm() {
  const navigate = useNavigate();
  const { mutateAsync: loginUser } = useUserLogin();
  const { toast } = useToast();
  const { updateAuthData } = usePersistentData();
  const { updateUser } = useUserContext();

  const form = useForm<UserLoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userLoginDataSchema),
  });

  const onSubmit = async (values: UserLoginRequest) => {
    try {
      const result = await loginUser(values);
      toast({
        title: `Hi ${result.data.user.name}. Let's find your friends!`,
      });
      // Store the token and username in local storage
      updateAuthData({
        token: result.data.token,
      });
      // Save the user data in context
      updateUser({ user: result.data.user, state: "loggedIn" });

      // Redirect to home page
      navigate("/home");
    } catch (e: any) {
      toast({
        title: e.error.message, //TODO
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm bg-background/95 rounded-xl shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="items-center justify-center">
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription>Enter email and password to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
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
                Sign in
              </Button>
            ) : (
              <ButtonLoading />
            )}

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
