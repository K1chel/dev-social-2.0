import { postAtom } from "@/atoms/post-atom";
import { Loader } from "@/components/loaders/loader";
import { AddPostInput } from "@/components/posts/add-post-input";
import { Post } from "@/components/posts/post";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useRecoilState<IPost[]>(postAtom);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/posts/all-posts");
        const data = await res.json();
        if (data.error) {
          toast.error(data.error || "Something went wrong");
          return;
        }
        setPosts(data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [setPosts]);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 md:px-6 mt-5">
      <AddPostInput />
      {isLoading && <Loader />}
      {!isLoading &&
        !!posts.length &&
        posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};
