  // src/store/useAuthStore.ts  (o la ruta donde lo quieras ubicar)

  import { create } from 'zustand';
  import { persist, createJSONStorage } from 'zustand/middleware';
  import { User } from '../types'; // Ajusta esta ruta si es necesario

  interface LoginCredentials {
    email: string;
    password: string;
  }

  interface LoginResponse {
    message: string;
    user: User;
    token: string;
    redirectTo: string;
  }

  interface MeResponse {
    user: User;
  }

  interface RegisterPayload { // Ajusta esto según los campos que tu API de registro espera
    email: string;
    password: string;
    name: string;
    role: User['role'];
    avatar?: string;
    department?: string;
  }

  interface RegisterResponse { // Ajusta esto según lo que devuelve tu API de registro
    message: string;
    user: User;
    token?: string; // Algunas APIs devuelven token al registrar, otras no
  }

  // --- Configuración de la URL Base de la API ---

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

 
  // --- Definición del Estado y Acciones del Store ---

  interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean; // Para el estado de carga general de operaciones de auth
    error: string | null; // Para mensajes de error
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; redirectTo?: string }>;
    logout: () => void;
    checkAuthStatus: () => Promise<void>;
    register: (userData: RegisterPayload) => Promise<{ success: boolean; message?: string }>;
    setUser: (user: User) => void;
    // Podrías añadir forgotPassword, resetPassword aquí también
  }

  export const useAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true, // Inicia como true para el checkAuthStatus inicial
        error: null,

       login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            });
            const data: LoginResponse = await response.json();

            if (!response.ok) {
              throw new Error(data.message || `Login failed: ${response.status}`);
            }

            const user: User = data.user;

            // 2. Elimina campo password para no persistirlo
            //    (asume que tu tipo User no lo incluye)
            // (No es necesario eliminar password porque no existe en User)

            // 3. Guarda en el store
            set({
              user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true, redirectTo: data.redirectTo };
          } catch (error: unknown) {
            console.error("Login failed:", error);
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error instanceof Error ? error.message : 'Error desconocido en login',
            });
            return { success: false };
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
          } catch (error: Error) {
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