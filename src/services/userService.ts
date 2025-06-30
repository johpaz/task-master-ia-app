import { useAuthStore } from "@/stores/authStore";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  if (!token) {
    // Devolver cabeceras sin token si no está disponible
    return {
      'Content-Type': 'application/json',
    };
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'collaborator' | 'client';
  department?: string;
  company?: string;
  phone?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'manager' | 'collaborator' | 'client';
  department?: string;
  company?: string;
  phone?: string;
  status?: 'active' | 'inactive';
}

export const userService = {
  // Obtener todos los usuarios
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener usuarios');
    }

    return response.json();
  },

  // Obtener usuario por ID
  async getUserById(id: string) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener usuario');
    }

    return response.json();
  },

  // Crear nuevo usuario (usa la ruta de registro)
  async createUser(userData: CreateUserRequest) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear usuario');
    }

    return response.json();
  },

  // Actualizar usuario
  async updateUser(id: string, userData: UpdateUserRequest) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar usuario');
    }

    return response.json();
  },

  // Eliminar usuario
  async deleteUser(id: string) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar usuario');
    }

    // DELETE puede no devolver un cuerpo, así que no intentamos parsear JSON si la respuesta es 204
    if (response.status === 204) {
      return;
    }
    
    return response.json();
  },
};
