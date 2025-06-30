
import { create } from 'zustand';
import { User } from '../../types';

interface UserModalState {
  isOpen: boolean;
  editingUser: User | null;
  openModal: (user?: User) => void;
  closeModal: () => void;
}

export const useUserModalStore = create<UserModalState>((set) => ({
  isOpen: false,
  editingUser: null,
  openModal: (user = null) => set({ isOpen: true, editingUser: user }),
  closeModal: () => set({ isOpen: false, editingUser: null }),
}));
