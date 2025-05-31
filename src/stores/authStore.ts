
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@tuprofedeai.com',
    name: 'Carlos Rodríguez',
    role: 'admin',
    avatar: '/api/placeholder/40/40',
    department: 'Dirección General',
    createdAt: new Date()
  },
  {
    id: '2',
    email: 'manager@tuprofedeai.com',
    name: 'Ana García',
    role: 'manager',
    avatar: '/api/placeholder/40/40',
    department: 'Desarrollo',
    createdAt: new Date()
  },
  {
    id: '3',
    email: 'dev@tuprofedeai.com',
    name: 'Miguel Santos',
    role: 'collaborator',
    avatar: '/api/placeholder/40/40',
    department: 'Desarrollo',
    createdAt: new Date()
  },
  {
    id: '4',
    email: 'cliente@empresa.com',
    name: 'Laura Martínez',
    role: 'client',
    avatar: '/api/placeholder/40/40',
    createdAt: new Date()
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would call an API
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
