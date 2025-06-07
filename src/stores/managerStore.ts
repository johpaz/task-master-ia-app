
import { create } from 'zustand';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  tasksAssigned: number;
  tasksCompleted: number;
  efficiency: number;
  availability: 'available' | 'busy' | 'offline';
}

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'review' | 'completed';
  progress: number;
  teamSize: number;
  deadline: Date;
  budget: number;
  spent: number;
}

interface ManagerState {
  teamMembers: TeamMember[];
  projects: Project[];
  isLoading: boolean;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  assignTask: (taskId: string, memberId: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  fetchTeamData: () => Promise<void>;
}

export const useManagerStore = create<ManagerState>((set, get) => ({
  teamMembers: [
    {
      id: '1',
      name: 'Ana García',
      role: 'Frontend Developer',
      tasksAssigned: 5,
      tasksCompleted: 3,
      efficiency: 95,
      availability: 'available'
    },
    {
      id: '2',
      name: 'Carlos López',
      role: 'Backend Developer',
      tasksAssigned: 4,
      tasksCompleted: 4,
      efficiency: 88,
      availability: 'busy'
    },
    {
      id: '3',
      name: 'María Rodríguez',
      role: 'UI/UX Designer',
      tasksAssigned: 3,
      tasksCompleted: 2,
      efficiency: 92,
      availability: 'available'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      status: 'active',
      progress: 75,
      teamSize: 5,
      deadline: new Date('2024-02-15'),
      budget: 50000,
      spent: 32000
    },
    {
      id: '2',
      name: 'Mobile App',
      status: 'review',
      progress: 90,
      teamSize: 3,
      deadline: new Date('2024-01-30'),
      budget: 25000,
      spent: 22000
    }
  ],
  isLoading: false,

  updateTeamMember: (id, updates) => {
    set((state) => ({
      teamMembers: state.teamMembers.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    }));
  },

  assignTask: (taskId, memberId) => {
    // Lógica para asignar tarea
    const { teamMembers } = get();
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      set((state) => ({
        teamMembers: state.teamMembers.map(m =>
          m.id === memberId
            ? { ...m, tasksAssigned: m.tasksAssigned + 1 }
            : m
        )
      }));
    }
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    }));
  },

  fetchTeamData: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Team data fetched');
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
