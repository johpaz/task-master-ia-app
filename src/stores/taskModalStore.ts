
import { create } from 'zustand';
import type { Task } from '../types';

interface TaskModalState {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view';
  selectedTask: Task | null;
  openModal: (mode: 'create' | 'edit' | 'view', task?: Task) => void;
  closeModal: () => void;
}

export const useTaskModalStore = create<TaskModalState>((set) => ({
  isOpen: false,
  mode: 'create',
  selectedTask: null,

  openModal: (mode, task = null) => {
    set({
      isOpen: true,
      mode,
      selectedTask: task
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
      mode: 'create',
      selectedTask: null
    });
  }
}));
