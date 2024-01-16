import { formatDateDistance } from "@/lib/utils";
import { IPost, IUser } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import UserAvatar from "../user-avatar";
import PostActions from "./post-actions";

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
    <div className="max-w-4xl mx-auto w-full mt-10 flex flex-col gap-y-2 px-4 md:px-6">
      <div className="flex gap-x-3">
        <Link to={`/profile/${user?.username}`}>
          <UserAvatar
            src={user?.avatar}
            className="hover:opacity-75 transition"
          />
        </Link>
        <div className="flex items-center justify-between w-full">
          <Link to={`/profile/${user?.username}`}>
            <p className="text-sm hover:underline hover:underline-offset-4">
              @{user?.username}
            </p>
          </Link>
          <div className="ml-auto flex items-center gap-x-2">
            <span className="text-xs text-muted-foreground">
              {formatDateDistance(post.createdAt)}
            </span>
            <Button size="icon" variant="ghost" className="w-7 h-7">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="px-10">
        <span className="text-sm font-medium">{post.text}</span>
      </div>
      {post.image && (
        <div className="mt-3 px-10">
          <img
            src={post.image}
            alt={post.text}
            className="w-full max-h-[440px] min-h-[300px] object-cover max-w-fit rounded-md border"
          />
        </div>
      )}
      <PostActions post={post} />
    </div>
  );
};
