import { IUser } from "@/types";
import UserAvatar from "../user-avatar";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/user-atom";
import { Button } from "../ui/button";
import useUpdateProfileModal from "@/hooks/use-update-profile-modal";
import useFollowUnfollowUser from "@/hooks/use-follow-unfollow-user";
import { Loader2 } from "lucide-react";

interface UserProfileHeaderProps {
  user: IUser;
}

export const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  const { _id, username, avatar, createdAt, bio, followers, following } = user;
  const currentUser = useRecoilValue(userAtom);

  const { onOpen } = useUpdateProfileModal();
  const { handleFollowUnfollow, isFollowing, isUpdating } =
    useFollowUnfollowUser(user);

  const truncatedBio =
    bio && bio.length > 300 ? bio.slice(0, 300) + "..." : bio;

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 w-full">
      <UserAvatar className="w-40 h-40" src={avatar || ""} />
      <h3 className="text-2xl font-semibold">@{username}</h3>
      <h5 className="text-sm">
        Joined{" "}
        <span className="text-muted-foreground">
          {new Date(createdAt).toLocaleDateString("en-US")}
        </span>
      </h5>
      {bio && (
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <span className="text-sm text-muted-foreground">{truncatedBio}</span>
        </div>
      )}
      {!bio && _id === currentUser?._id && (
        // TODO: open update user modal
        <span className="text-sm text-muted-foreground underline cursor-pointer">
          Add bio
        </span>
      )}
      <div className="flex justify-start px-4 md:px-6 flex-col w-full">
        <h5 className="text-sm">
          Followers{" "}
          <span className="text-muted-foreground">{followers.length}</span>
        </h5>
        <h5 className="text-sm">
          Following{" "}
          <span className="text-muted-foreground">{following.length}</span>
        </h5>
      </div>
      <div className="mt-4 w-full px-4 md:px-6">
        {_id === currentUser?._id ? (
          <Button onClick={onOpen} size="lg" className="w-full">
            Update Profile
          </Button>
        ) : (
          <Button onClick={handleFollowUnfollow} size="lg" className="w-full">
            {isUpdating ? (
              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
            ) : isFollowing ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
