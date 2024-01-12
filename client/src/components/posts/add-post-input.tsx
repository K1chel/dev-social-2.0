import useAddPostModal from "@/hooks/use-add-post-modal";
import { Input } from "../ui/input";
import UserAvatar from "../user-avatar";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/user-atom";
import { Button } from "../ui/button";

export const AddPostInput = () => {
  const user = useRecoilValue(userAtom);
  const { onOpen } = useAddPostModal();

  return (
    <div onClick={onOpen} className="relative w-full">
      <div className="absolute top-0 flex items-center justify-center h-full w-16">
        <UserAvatar src={user?.avatar} className="w-8 h-8" />
      </div>
      <Input
        className="py-6 px-16 focus-visible:ring-0"
        placeholder="Start a post..."
      />
      <div className="absolute right-3 top-0 flex items-center justify-center w-20 h-full">
        <Button variant="outline" size="sm">
          Add post
        </Button>
      </div>
    </div>
  );
};
