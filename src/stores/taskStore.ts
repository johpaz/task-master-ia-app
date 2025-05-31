
import { create } from 'zustand';
import { Task, DashboardMetrics } from '../types';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  filters: {
    search: string;
    status: string;
    type: string;
    priority: string;
    assignedTo: string;
  };
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilters: (filters: Partial<TaskState['filters']>) => void;
  getFilteredTasks: () => Task[];
  getDashboardMetrics: () => DashboardMetrics;
}

// Mock task data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Desarrollar chatbot para e-commerce',
    description: 'Crear un agente conversacional para atención al cliente automática',
    type: 'agente',
    status: 'en_progreso',
    priority: 'alta',
    assignedTo: '3',
    assignedBy: '2',
    client: 'TechCommerce S.A.',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    estimatedHours: 80,
    actualHours: 45,
    tags: ['chatbot', 'AI', 'customer-service'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    title: 'API REST para gestión de inventarios',
    description: 'Desarrollo de API backend con autenticación y CRUD completo',
    type: 'desarrollo',
    status: 'revision',
    priority: 'media',
    assignedTo: '3',
    assignedBy: '2',
    client: 'Inventarios Plus',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-30'),
    estimatedHours: 60,
    actualHours: 58,
    tags: ['API', 'Node.js', 'MongoDB'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '3',
    title: 'Soporte técnico - Error en login',
    description: 'Cliente reporta problemas para acceder a la plataforma',
    type: 'soporte',
    status: 'pendiente',
    priority: 'urgente',
    assignedTo: '3',
    assignedBy: '1',
    client: 'Empresa ABC',
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    estimatedHours: 4,
    actualHours: 0,
    tags: ['bug', 'login', 'urgente'],
    attachments: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: mockTasks,
  loading: false,
  filters: {
    search: '',
    status: '',
    type: '',
    priority: '',
    assignedTo: ''
  },
  setTasks: (tasks) => set({ tasks }),
  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  },
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },
  getFilteredTasks: () => {
    const { tasks, filters } = get();
    return tasks.filter(task => {
      const matchesSearch = !filters.search || 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesType = !filters.type || task.type === filters.type;
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesAssignee = !filters.assignedTo || task.assignedTo === filters.assignedTo;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesAssignee;
    });
  },
  getDashboardMetrics: () => {
    const { tasks } = get();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completada').length;
    const inProgressTasks = tasks.filter(t => t.status === 'en_progreso').length;
    const pendingTasks = tasks.filter(t => t.status === 'pendiente').length;
    const overdueCovers = tasks.filter(t => new Date(t.endDate) < new Date() && t.status !== 'completada').length;
    
    const completedTasksWithTime = tasks.filter(t => t.status === 'completada' && t.actualHours > 0);
    const averageCompletionTime = completedTasksWithTime.length > 0 
      ? completedTasksWithTime.reduce((acc, t) => acc + t.actualHours, 0) / completedTasksWithTime.length
      : 0;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      overdueCovers,
      averageCompletionTime
    };
  }
}));
