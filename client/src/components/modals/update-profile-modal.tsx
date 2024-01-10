/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

import { userAtom } from "@/atoms/user-atom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useUpdateProfileModal from "@/hooks/use-update-profile-modal";
import { IUser } from "@/types";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import UserAvatar from "../user-avatar";

export const UpdateProfileModal = () => {
  const { isOpen, onClose } = useUpdateProfileModal();
  const avatarRef = useRef<HTMLInputElement>(null!);

  const [user, setUser] = useRecoilState<IUser | null>(userAtom);

  const form = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      bio: user?.bio || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: any) => {
    try {
      const res = await fetch(`/api/users/update/${user?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      onClose();
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again.");
    }
  };

  console.log(user);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>
        <main className="my-5 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex items-center w-full">
                <div className="flex-1 flex items-center justify-center">
                  <UserAvatar
                    onClick={() => avatarRef.current.click()}
                    className="md:w-40 md:h-40 w-32 h-32 cursor-pointer"
                    src=""
                  />
                  <input type="file" hidden ref={avatarRef} />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input disabled={isLoading} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                Update
              </Button>
            </form>
          </Form>
        </main>
      </DialogContent>
    </Dialog>
  );
};
