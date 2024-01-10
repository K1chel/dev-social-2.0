import * as z from "zod";

import { userAtom } from "@/atoms/user-atom";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ShowPassword } from "@/components/auth/show-password";
import { TopLoader } from "@/components/loaders/top-loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setUser = useSetRecoilState(userAtom);

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginValidation>) => {
    try {
      const res = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Logged in successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {isLoading && <TopLoader />}
      <AuthWrapper>
        <AuthHeader
          title="Welcome back to DevSocial"
          subtitle="Login to communicate with other developers"
        />
        <main className="my-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        className="bg-secondary/90"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isLoading}
                          {...field}
                          className="bg-secondary/90"
                          type={showPassword ? "text" : "password"}
                        />
                        <ShowPassword
                          showPassword={showPassword}
                          setShowPassword={setShowPassword}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full"
                variant="primary"
                disabled={isLoading}
              >
                Login
              </Button>
            </form>
          </Form>
        </main>
        <AuthFooter
          title="First time here?"
          subtitle="Create an account"
          href="/register"
        />
      </AuthWrapper>
    </>
  );
};
