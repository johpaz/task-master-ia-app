
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; redirectTo?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setUser: (user: User | null) => void;
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

      login: async (credentials: { email: string; password: string }) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const user = mockUsers.find(u => u.email === credentials.email);
          
          if (!user) {
            throw new Error('Usuario no encontrado');
          }

          if (credentials.password !== 'password123') {
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
          return { success: true, redirectTo: '/dashboard' };
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
            isLoading: false, // Resetear isLoading
            error: null,
          });
          // El middleware 'persist' se encarga de limpiar el storage según la configuración de 'partialize'.
        },

        checkAuthStatus: async () => {
          const token = get().token; // Obtiene el token del estado (posiblemente de localStorage)
          
          if (!token) {
            set({ isLoading: false, isAuthenticated: false, user: null, token: null }); // Asegurar que token también se limpia
            return;
          }

          set({ isLoading: true, error: null });
          try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            const data: MeResponse | { message: string } = await response.json();

            if (!response.ok) {
              const errorMessage = (data as { message: string }).message || `Session check failed with status: ${response.status}`;
              throw new Error(errorMessage);
            }
            
            const meData = data as MeResponse;
            set({
              user: meData.user,
              isAuthenticated: true, // Sigue autenticado
              token: token, // Mantiene el token actual
              isLoading: false,
              error: null,
            });
          } catch (error: unknown) {
            console.error("Failed to fetch user status (checkAuthStatus):", error);
            // Si hay error (ej. token expirado, 401, 403), deslogueamos completamente
            set({
              user: null,
              token: null, // Limpiar el token inválido
              isAuthenticated: false,
              isLoading: false,
              error: "Your session may have expired or the token is invalid. Please log in again.",
            });
          }
        },

        setUser: (user: User) => {
          set({ user });
        },

        register: async (userData: RegisterPayload) => {
          set({ isLoading: true, error: null });
          try {
            // Asumimos que el registro es público o manejado por un admin ya logueado
            // Si es por admin, el token del admin debe ir en el header
            const adminToken = get().token; // Solo si el registro requiere un admin logueado
            const headers: HeadersInit = {
              'Content-Type': 'application/json',
            };
            if (adminToken) { // Ajusta esta lógica según si el registro es protegido
              headers['Authorization'] = `Bearer ${adminToken}`;
            }

            const response = await fetch(`${API_BASE_URL}/auth/register`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(userData),
            });

            const data: RegisterResponse | { message: string; errors?: unknown[] } = await response.json();

            if (!response.ok) {
              const errorMessage = (data as { message: string }).message || `Registration failed with status: ${response.status}`;
              // Si hay 'errors' de Zod, podrías querer mostrarlos
              if ((data as { errors?: unknown[] }).errors) {
                console.error("Validation errors:", (data as { errors?: unknown[] }).errors);
              }
              throw new Error(errorMessage);
            }
            
            // const registerData = data as RegisterResponse;
            // Decide si quieres loguear al usuario automáticamente después del registro
            // Si tu API de registro devuelve un token y los datos del usuario como en login, podrías hacer:
            // set({ user: registerData.user, token: registerData.token, isAuthenticated: !!registerData.token, isLoading: false });

            set({ isLoading: false, error: null });
            return { success: true, message: (data as RegisterResponse).message || "Registration successful!" };
          } catch (error: Error) {
            console.error("Registration failed:", error);
            set({
              isLoading: false,
              error: error.message || 'An unknown error occurred during registration.',
            });
            return { success: false, message: error.message || 'Registration failed.' };
          }
        },
      }),
      {
        name: 'auth-storage', // Clave para localStorage
        storage: createJSONStorage(() => localStorage), // Usa localStorage
        // Define qué partes del estado se deben persistir:
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          // No persistir isLoading ni error, ya que son estados transitorios.
        }),
        // Opcional: una función para ejecutar después de la rehidratación
        // onRehydrateStorage: () => (state) => {
        //   if (state) {
        //     state.isLoading = false; // Asegurar que isLoading se resetea al rehidratar
        //   }
        // },
      }
    )
  );

  // --- Inicialización y Lógica de Arranque de la App ---

  // Es una buena práctica llamar a checkAuthStatus una vez cuando la app se carga.
  // Esto se puede hacer en tu archivo principal de React (App.tsx o main.tsx)
  // usando un useEffect, o incluso aquí si quieres que se auto-ejecute.
  // Sin embargo, es más controlable hacerlo desde un componente.

  // Ejemplo de cómo exportar el estado inicial para ser usado en App.tsx:
  // (No es necesario si lo llamas desde useEffect en App.tsx)
  // if (typeof window !== 'undefined') { // Asegurar que solo se ejecute en el cliente
  //   useAuthStore.getState().checkAuthStatus();
  // }

  export default useAuthStore;