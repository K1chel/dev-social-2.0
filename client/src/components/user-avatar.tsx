import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src: string | null;
  className?: string;
}

const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("border", className)}>
      <AvatarImage src={src || "/images/placeholder.jpg"} />
    </Avatar>
  );
};

export default UserAvatar;
