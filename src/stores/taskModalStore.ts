import { create } from 'zustand';
import { Task } from '../../types';

interface TaskModalState {
  isOpen: boolean;
  editingTask: Task | null;
  openModal: (task?: Task) => void;
  closeModal: () => void;
}

export const useTaskModalStore = create<TaskModalState>((set) => ({
  isOpen: false,
  editingTask: null,
  openModal: (task = null) => set({ isOpen: true, editingTask: task }),
  closeModal: () => set({ isOpen: false, editingTask: null }),
}));
