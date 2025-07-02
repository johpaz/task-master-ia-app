
import { create } from 'zustand';
import { User } from '../types';

interface UserModalState {
  isOpen: boolean;
  editingUser: User | null;
  openModal: (user?: User) => void;
  closeModal: () => void;
}

export const useUserModalStore = create<UserModalState>((set) => ({
  isOpen: false,
  editingUser: null,
  openModal: (user?: User) => set({ isOpen: true, editingUser: user || null }),
  closeModal: () => set({ isOpen: false, editingUser: null }),
}));
