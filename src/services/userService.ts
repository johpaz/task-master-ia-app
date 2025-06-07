
const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'collaborator' | 'client';
  department?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'manager' | 'collaborator' | 'client';
  department?: string;
  status?: 'active' | 'inactive';
}

export const userService = {
  // Obtener todos los usuarios
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    return response.json();
  },

  // Obtener usuario por ID
  async getUserById(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener usuario');
    }

    return response.json();
  },

  // Crear nuevo usuario
  async createUser(userData: CreateUserRequest) {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al crear usuario');
    }

    return response.json();
  },

  // Actualizar usuario
  async updateUser(id: string, userData: UpdateUserRequest) {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar usuario');
    }

    return response.json();
  },

  // Eliminar usuario
  async deleteUser(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar usuario');
    }

    return response.json();
  },
};
