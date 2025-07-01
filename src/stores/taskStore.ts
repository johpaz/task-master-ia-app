import { create } from 'zustand';
import type { Task, CreateTaskData } from '../types';

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: CreateTaskData) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setSelectedTask: (task: Task | null) => void;
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByUser: (userId: string) => Task[];
}

// Mock tasks for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implementar autenticación',
    description: 'Desarrollar sistema de login y registro',
    status: 'en progreso',
    priority: 'alta',
    type: 'desarrollo',
    assignedTo: '3',
    assignedBy: '2',
    client: 'Cliente A',
    createdAt: '2024-12-01',
    updatedAt: '2024-12-15',
    endDate: '2024-12-31',
    estimatedHours: 40,
    actualHours: 25,
    tags: ['backend', 'seguridad']
  },
  {
    id: '2',
    title: 'Diseño de interfaz',
    description: 'Crear mockups para la aplicación',
    status: 'completada',
    priority: 'media',
    type: 'desarrollo',
    assignedTo: '3',
    assignedBy: '2',
    client: 'Cliente B',
    createdAt: '2024-11-15',
    updatedAt: '2024-12-01',
    endDate: '2024-12-15',
    estimatedHours: 20,
    actualHours: 18,
    tags: ['frontend', 'diseño']
  }
];

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ tasks: mockTasks, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createTask: async (taskData: CreateTaskData) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        ...taskData,
        status: 'por hacer',
        priority: taskData.priority || 'media',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: '3'
      };

      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id 
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        ),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setSelectedTask: (task: Task | null) => {
    set({ selectedTask: task });
  },

  getTasksByStatus: (status: Task['status']) => {
    return get().tasks.filter((task) => task.status === status);
  },

  getTasksByUser: (userId: string) => {
    return get().tasks.filter((task) => task.assignedTo === userId);
  }
}));
