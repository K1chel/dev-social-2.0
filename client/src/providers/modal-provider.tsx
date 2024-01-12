import { AddPostModal } from "@/components/modals/add-post-modal";
import { UpdateProfileModal } from "@/components/modals/update-profile-modal";

export const ModalProvider = () => {
  return (
    <>
      <UpdateProfileModal />
      <AddPostModal />
    </>
  );
};
