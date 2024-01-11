import { IUser } from "@/types";
import UserAvatar from "../user-avatar";
import { Link } from "react-router-dom";
import useFollowUnfollowUser from "@/hooks/use-follow-unfollow-user";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface UserSuggestedCardProps {
  user: IUser | null;
}

export const UserSuggestedCard = ({ user }: UserSuggestedCardProps) => {
  const { handleFollowUnfollow, isFollowing, isUpdating } =
    useFollowUnfollowUser(user);

  if (!user) return null;

  return (
    <div className="w-full px-4 py-5 border rounded-md flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <UserAvatar className="w-14 h-14" src={user.avatar} />
        <Link
          to={`/profile/${user.username}`}
          className="text-sm text-muted-foreground hover:text-primary hover:underline transition underline-offset-4"
        >
          @{user.username}
        </Link>
      </div>
      <Button
        variant={isFollowing ? "outline" : "secondary"}
        className="w-24 h-10"
        onClick={handleFollowUnfollow}
      >
        {isUpdating ? (
          <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
        ) : isFollowing ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </Button>
    </div>
  );
};
