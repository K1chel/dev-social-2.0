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
  FormMessage,
} from "@/components/ui/form";
import useAddPostModal from "@/hooks/use-add-post-modal";
import { createPostValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import * as z from "zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import UserAvatar from "../user-avatar";
import usePreviewImage from "@/hooks/use-preview-image";
import { useRef } from "react";
import { postAtom } from "@/atoms/post-atom";
import { toast } from "sonner";
import { IPost } from "@/types";

export const AddPostModal = () => {
  const user = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState<IPost[]>(postAtom);

  const imageRef = useRef<HTMLInputElement>(null);

  const { isOpen, onClose } = useAddPostModal();
  const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage();

  const form = useForm<z.infer<typeof createPostValidation>>({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
      text: "",
      image: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const isDisabled = form.formState.isSubmitting || !form.formState.isDirty;

  const onSubmit = async (values: z.infer<typeof createPostValidation>) => {
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user?._id,
          ...values,
          image: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Post created successfully.");
      setPosts([data, ...posts]);
      onClose();
      setImageUrl("");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add post</DialogTitle>
          <DialogDescription>
            Share your thoughts with other developers around the world.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <UserAvatar src={user?.avatar} />
            <p className="text-sm text-muted-foreground font-semibold">
              @{user?.username}
            </p>
          </div>
          <div className="px-5 flex flex-col gap-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-none resize-none"
                          placeholder="Start a post..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {imageUrl && (
                  <div className="relative mt-5">
                    <img
                      src={imageUrl}
                      alt="Uploaded Image"
                      className="w-full h-full rounded-md object-contain max-h-[500px]"
                    />
                    <button
                      className="absolute top-3 right-3 bg-red-500/75 h-8 w-8 rounded-full flex items-center justify-center"
                      onClick={() => setImageUrl("")}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  {!imageUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10"
                      onClick={() => imageRef.current?.click()}
                    >
                      <Image className="w-5 h-5" />
                      <input
                        hidden
                        type="file"
                        onChange={handleImageChange}
                        ref={imageRef}
                      />
                    </Button>
                  )}
                  <Button
                    disabled={isDisabled}
                    type="submit"
                    size="sm"
                    variant="outline"
                    className="w-20 h-10 ml-auto"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
