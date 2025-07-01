import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Mock users for development
const mockUsers = [
  {
    id: '1',
    name: 'Admin Usuario',
    email: 'admin@taskmanager.com',
    role: 'admin' as const,
    department: 'Administración',
    phone: '+1234567890',
    status: 'active' as const,
    createdAt: '2024-01-01',
    lastLogin: '2024-12-30'
  },
  {
    id: '2',
    name: 'Manager Usuario',
    email: 'manager@taskmanager.com',
    role: 'manager' as const,
    department: 'Gestión',
    phone: '+1234567891',
    status: 'active' as const,
    createdAt: '2024-01-01',
    lastLogin: '2024-12-29'
  },
  {
    id: '3',
    name: 'Colaborador Usuario',
    email: 'colaborador@taskmanager.com',
    role: 'collaborator' as const,
    department: 'Desarrollo',
    phone: '+1234567892',
    status: 'active' as const,
    createdAt: '2024-01-01',
    lastLogin: '2024-12-28'
  },
  {
    id: '4',
    name: 'Cliente Usuario',
    email: 'cliente@taskmanager.com',
    role: 'client' as const,
    department: 'Clientes',
    phone: '+1234567893',
    status: 'active' as const,
    createdAt: '2024-01-01',
    lastLogin: '2024-12-27'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const user = mockUsers.find(u => u.email === email);
          
          if (!user) {
            throw new Error('Usuario no encontrado');
          }

          if (password !== 'password123') {
            throw new Error('Contraseña incorrecta');
          }

          const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ 
            userId: user.id, 
            email: user.email, 
            role: user.role,
            iat: Date.now(),
            exp: Date.now() + (24 * 60 * 60 * 1000)
          }))}.signature`;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          });

          console.log('Login exitoso:', { user, token });
        } catch (error: any) {
          set({ isLoading: false });
          console.error('Error en login:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
        console.log('Logout exitoso');
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
