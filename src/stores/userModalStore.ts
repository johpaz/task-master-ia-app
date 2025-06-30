
import { create } from 'zustand';
import type { User } from '../types';

interface UserModalState {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view';
  selectedUser: User | null;
  openModal: (mode: 'create' | 'edit' | 'view', user?: User) => void;
  closeModal: () => void;
}

export const useUserModalStore = create<UserModalState>((set) => ({
  isOpen: false,
  mode: 'create',
  selectedUser: null,

  openModal: (mode, user = null) => {
    set({
      isOpen: true,
      mode,
      selectedUser: user
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
      mode: 'create',
      selectedUser: null
    });
  }
}));
