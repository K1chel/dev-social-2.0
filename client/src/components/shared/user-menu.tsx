import { LogOut, Settings, User } from "lucide-react";
import { useRecoilValue } from "recoil";

import { userAtom } from "@/atoms/user-atom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { useNavigate } from "react-router-dom";
import useUpdateProfileModal from "@/hooks/use-update-profile-modal";

interface UserMenuProps {
  handleLogout: () => void;
}

export const UserMenu = ({ handleLogout }: UserMenuProps) => {
  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const { onOpen } = useUpdateProfileModal();

  const onNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar src={user?.avatar} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mt-3 p-0">
        <DropdownMenuItem
          onClick={() => onNavigate(`/profile/${user?.username}`)}
          className="rounded-none flex items-center gap-x-4 py-2.5"
        >
          <User className="w-5 h-5" />
          <span className="text-sm">Profile</span>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          onClick={onOpen}
          className="rounded-none flex items-center gap-x-4 py-2.5"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Update</span>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="rounded-none flex items-center gap-x-4 py-2.5"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm text-red-500">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
