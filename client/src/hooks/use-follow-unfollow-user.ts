import { userAtom } from "@/atoms/user-atom";
import { IUser } from "@/types";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

const useFollowUnfollowUser = (user: IUser) => {
  const currentUser = useRecoilValue(userAtom);

  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to follow a user");
      return;
    }
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (isFollowing) {
        toast.success(`You unfollowed ${user.username}`);
      } else {
        toast.success(`You are now following ${user.username}`);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isFollowing, handleFollowUnfollow, isUpdating };
};

export default useFollowUnfollowUser;
