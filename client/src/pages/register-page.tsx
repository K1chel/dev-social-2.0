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
import { registerValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setUser = useSetRecoilState(userAtom);

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof registerValidation>) => {
    try {
      const res = await fetch(`/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.message);
        return;
      }

      window.location.reload();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isLoading && <TopLoader />}
      <AuthWrapper>
        <AuthHeader
          title="Welcome to DevSocial"
          subtitle="Create an account to communicate with other developers"
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
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
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
          title="Already have an account?"
          subtitle="Login"
          href="/login"
        />
      </AuthWrapper>
    </>
  );
};
