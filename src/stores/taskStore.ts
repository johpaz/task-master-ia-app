// src/stores/taskStore.ts

import {create} from 'zustand';
import { taskService, CreateTaskRequest, UpdateTaskRequest } from '../services/taskService';
import { Task,Metrics } from '@/types/index';
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (taskData: CreateTaskRequest) => Promise<void>;
  updateTask: (id: string, taskData: UpdateTaskRequest) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getDashboardMetrics: () => Metrics;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  /**
   * Carga todas las tareas desde la API y las guarda en el estado.
   */
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await taskService.getTasks();
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  /**
   * Agrega una nueva tarea llamando al servicio y actualiza el estado local.
   */
  addTask: async (taskData: CreateTaskRequest) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await taskService.createTask(taskData);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ error: errorMessage, isLoading: false });
      // Re-lanzamos el error para que el componente pueda capturarlo y reaccionar.
      throw new Error(errorMessage);
    }
  },

  /**
   * Actualiza una tarea llamando al servicio y actualiza el estado local.
   */
  updateTask: async (id: string, taskData: UpdateTaskRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },
  
  /**
   * Elimina una tarea llamando al servicio y la quita del estado local.
   */
  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await taskService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getDashboardMetrics: (): Metrics => {
    const { tasks } = get();
    const completedTasks = tasks.filter(task => task.status === 'completada');
    const totalCompletionTime = completedTasks.reduce((acc, task) => {
      const startDate = new Date(task.startDate).getTime();
      const endDate = new Date(task.endDate).getTime();
      const diffInHours = (endDate - startDate) / (1000 * 60 * 60);
      return acc + diffInHours;
    }, 0);

    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: tasks.filter(task => task.status === 'pendiente').length,
      inProgressTasks: tasks.filter(task => task.status === 'en_progreso').length,
      overdueTasks: tasks.filter(task => new Date(task.endDate) < new Date() && task.status !== 'completada').length,
      averageCompletionTime: completedTasks.length > 0 ? totalCompletionTime / completedTasks.length : 0,
    };
  },

 }));
