
import { create } from 'zustand';
import { Task } from '../types';

interface TimeEntry {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // en minutos
  description?: string;
}

interface PersonalGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  completed: boolean;
}

interface CollaboratorState {
  currentSession: TimeEntry | null;
  timeEntries: TimeEntry[];
  personalGoals: PersonalGoal[];
  weeklyHours: number;
  isTrackingTime: boolean;
  startTimeTracking: (taskId: string) => void;
  stopTimeTracking: (description?: string) => void;
  addPersonalGoal: (goal: Omit<PersonalGoal, 'id'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  getTasksStats: (tasks: Task[]) => {
    completed: number;
    inProgress: number;
    pending: number;
    overdue: number;
  };
}

export const useCollaboratorStore = create<CollaboratorState>((set, get) => ({
  currentSession: null,
  timeEntries: [
    {
      id: '1',
      taskId: 'task-1',
      startTime: new Date('2024-01-07T09:00:00'),
      endTime: new Date('2024-01-07T12:30:00'),
      duration: 210,
      description: 'Desarrollo de componentes React'
    },
    {
      id: '2',
      taskId: 'task-2',
      startTime: new Date('2024-01-07T14:00:00'),
      endTime: new Date('2024-01-07T17:00:00'),
      duration: 180,
      description: 'Testing y corrección de bugs'
    }
  ],
  personalGoals: [
    {
      id: '1',
      title: 'Completar certificación React',
      description: 'Obtener certificación avanzada en React',
      targetDate: new Date('2024-03-01'),
      progress: 65,
      completed: false
    },
    {
      id: '2',
      title: 'Mejorar tiempo de entrega',
      description: 'Reducir tiempo promedio de entrega en 20%',
      targetDate: new Date('2024-02-15'),
      progress: 40,
      completed: false
    }
  ],
  weeklyHours: 32,
  isTrackingTime: false,

  startTimeTracking: (taskId) => {
    const newSession: TimeEntry = {
      id: Date.now().toString(),
      taskId,
      startTime: new Date(),
      duration: 0
    };
    set({
      currentSession: newSession,
      isTrackingTime: true
    });
  },

  stopTimeTracking: (description) => {
    const { currentSession } = get();
    if (currentSession) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - currentSession.startTime.getTime()) / 60000);
      
      const completedEntry: TimeEntry = {
        ...currentSession,
        endTime,
        duration,
        description
      };

      set((state) => ({
        timeEntries: [completedEntry, ...state.timeEntries],
        currentSession: null,
        isTrackingTime: false
      }));
    }
  },

  addPersonalGoal: (goal) => {
    const newGoal: PersonalGoal = {
      ...goal,
      id: Date.now().toString()
    };
    set((state) => ({
      personalGoals: [...state.personalGoals, newGoal]
    }));
  },

  updateGoalProgress: (id, progress) => {
    set((state) => ({
      personalGoals: state.personalGoals.map(goal =>
        goal.id === id
          ? { ...goal, progress, completed: progress >= 100 }
          : goal
      )
    }));
  },

  getTasksStats: (tasks) => {
    return {
      completed: tasks.filter(t => t.status === 'completada').length,
      inProgress: tasks.filter(t => t.status === 'en_progreso').length,
      pending: tasks.filter(t => t.status === 'pendiente').length,
      overdue: tasks.filter(t => 
        new Date(t.endDate) < new Date() && t.status !== 'completada'
      ).length
    };
  }
}));
