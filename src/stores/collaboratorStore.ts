
import { create } from 'zustand';
import type { Task, Metrics } from '../types';

interface CollaboratorState {
  personalTasks: Task[];
  timeEntries: any[];
  personalMetrics: Metrics;
  isLoading: boolean;
  error: string | null;
  fetchPersonalTasks: (userId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>;
  addTimeEntry: (entry: any) => Promise<void>;
  getPersonalMetrics: (userId: string) => Promise<void>;
}

export const useCollaboratorStore = create<CollaboratorState>((set, get) => ({
  personalTasks: [],
  timeEntries: [],
  personalMetrics: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    totalUsers: 0,
    activeUsers: 0,
    tasksThisMonth: 0,
    completionRate: 0
  },
  isLoading: false,
  error: null,

  fetchPersonalTasks: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - en producción obtener del API
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Tarea Personal 1',
          description: 'Descripción de tarea personal',
          status: 'en progreso',
          priority: 'alta',
          type: 'desarrollo',
          assignedTo: userId,
          assignedBy: '2',
          client: 'Cliente A',
          createdAt: '2024-12-01',
          updatedAt: '2024-12-15',
          tags: ['personal']
        }
      ];
      
      set({ personalTasks: mockTasks, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateTaskStatus: async (taskId: string, status: Task['status']) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set((state) => ({
        personalTasks: state.personalTasks.map((task) =>
          task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task
        ),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addTimeEntry: async (entry: any) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set((state) => ({
        timeEntries: [...state.timeEntries, { ...entry, id: Date.now().toString() }],
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  getPersonalMetrics: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const tasks = get().personalTasks;
      const completedTasks = tasks.filter(task => task.status === 'completada').length;
      const pendingTasks = tasks.filter(task => task.status === 'en progreso' || task.status === 'por hacer').length;
      
      const metrics: Metrics = {
        totalTasks: tasks.length,
        completedTasks,
        pendingTasks,
        overdueTasks: 0,
        totalUsers: 1,
        activeUsers: 1,
        tasksThisMonth: tasks.length,
        completionRate: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0
      };
      
      set({ personalMetrics: metrics, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));
