import { IPost, IUser } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import UserAvatar from "../user-avatar";

type UserType = Pick<IUser, "username" | "avatar"> | null;

interface PostProps {
  post: IPost | null;
}

export const Post = ({ post }: PostProps) => {
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${post?.postedBy}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [post?.postedBy]);

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto w-full mt-10 flex flex-col gap-y-4 px-3">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <UserAvatar src={user?.avatar} />
            <p>{user?.username}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <p className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <Button size="icon" variant="ghost" className="w-8 h-8 group">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground dark:group-hover:text-white group-hover:text-black transition" />
            </Button>
          </div>
        </div>
        <div className="pl-10 pr-8 text-md text-muted-foreground">
          <p>{post.text}</p>
        </div>
        {post.image && (
          <div className="mt-6 px-5">
            <img
              src={post.image}
              alt="image"
              className="w-full max-h-[450px] min-h-[300px] object-cover max-w-fit rounded-md border"
            />
          </div>
        )}
        <div className="flex items-center justify-start px-5 mt-3">
          <span>
            {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
          </span>
        </div>
      </div>
    </div>
  );
};
