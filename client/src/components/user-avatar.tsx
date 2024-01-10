import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src: string | null;
  className?: string;
  onClick?: () => void;
}

const UserAvatar = ({ src, className, onClick }: UserAvatarProps) => {
  return (
    <Avatar onClick={onClick} className={cn("border", className)}>
      <AvatarImage src={src || "/images/placeholder.jpg"} />
    </Avatar>
  );
};

export default UserAvatar;
