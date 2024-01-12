import { create } from "zustand";

interface AddPostModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddPostModal = create<AddPostModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddPostModal;
