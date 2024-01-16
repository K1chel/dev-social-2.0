import { Heart, MessageSquareText } from "lucide-react";

import { userAtom } from "@/atoms/user-atom";
import { Button } from "@/components/ui/button";
import { IPost } from "@/types";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { postAtom } from "@/atoms/post-atom";
import { cn } from "@/lib/utils";

interface PostActionsProps {
  post: IPost;
}

const PostActions = ({ post }: PostActionsProps) => {
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postAtom);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?._id));
  const [isLikedLoading, setIsLikedLoading] = useState(false);

  const handleLikePost = async () => {
    if (isLikedLoading) return;
    setIsLikedLoading(true);
    try {
      const res = await fetch(`/api/posts/like/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error || "Unable to like post");
        return;
      }

      if (!isLiked) {
        const updatedPost = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: [...p.likes, currentUser?._id] };
          }
          return p;
        });
        setPosts(updatedPost);
      } else {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              likes: p.likes.filter((id) => id !== currentUser._id),
            };
          }
          return p;
        });
        setPosts(updatedPosts);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLikedLoading(false);
    }
  };

  return (
    <>
      <div className="px-10 flex items-center gap-x-2">
        <Button
          onClick={handleLikePost}
          size="icon"
          variant="ghost"
          className="w-10 h-10 active:scale-90 transition-all rounded-md"
        >
          <Heart
            className={cn("w-6 h-6", isLiked && "text-red-500 fill-red-500")}
          />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="w-10 h-10 active:scale-90 transition-all rounded-md"
        >
          <MessageSquareText className="w-6 h-6" />
        </Button>
      </div>
      <div>
        <div className="px-10 flex items-center gap-x-2">
          <span className="text-sm font-medium text-muted-foreground">
            {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
          </span>
          <div className="w-1 h-1 bg-muted-foreground rounded-sm" />
          <span className="text-sm font-medium text-muted-foreground">
            {post.replies.length}{" "}
            {post.replies.length === 1 ? "reply" : "replies"}
          </span>
        </div>
      </div>
    </>
  );
};

export default PostActions;
