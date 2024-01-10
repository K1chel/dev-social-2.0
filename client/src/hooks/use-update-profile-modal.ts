import { create } from "zustand";

interface UpdateProfileModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateProfileModal = create<UpdateProfileModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateProfileModal;
