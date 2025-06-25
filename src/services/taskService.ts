// src/services/taskService.ts

import { useAuthStore } from "@/stores/authStore";
import { Metrics ,Task} from "@/types/index";

// La URL base de tu API, tomada de las variables de entorno.
const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

// --- INTERFACES DE DATOS ---
// Define la estructura de los datos para evitar errores y mejorar el autocompletado.

/**
 * Representa la estructura completa de una Tarea, tal como la devuelve la API.
 */

/**
 * Datos necesarios para crear una nueva tarea.
 * Se omiten los campos que genera el backend (id, timestamps, etc.).
 */
export type CreateTaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'actualHours'>;

/**
 * Datos que se pueden enviar para actualizar una tarea.
 * Todos los campos son opcionales.
 */
export type UpdateTaskRequest = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'assignedBy'>>;

// --- SERVICIO API ---
// Contiene todos los métodos para interactuar con el endpoint /tasks de la API.

export const taskService = {
  /**
   * Obtiene los encabezados de autenticación actualizados antes de cada petición.
   * Esto asegura que siempre se use el token más reciente.
   */
  getHeaders() {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  },

  /**
   * Obtiene una lista de todas las tareas.
   * @returns {Promise<Task[]>} Una promesa que resuelve a un array de tareas.
   */
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Error al obtener las tareas.');
    return response.json();
  },

  /**
   * Crea una nueva tarea.
   * @param {CreateTaskRequest} taskData - Los datos de la tarea a crear.
   * @returns {Promise<Task>} La nueva tarea creada, incluyendo su ID y timestamps.
   */
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error al crear la tarea.' }));
      throw new Error(errorData.message);
    }
    return response.json();
  },

  /**
   * Actualiza una tarea existente.
   * @param {string} id - El ID de la tarea a actualizar.
   * @param {UpdateTaskRequest} taskData - Los campos de la tarea a modificar.
   * @returns {Promise<Task>} La tarea actualizada.
   */
  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT', // o 'PATCH' si tu API lo soporta
      headers: this.getHeaders(),
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error al actualizar la tarea.' }));
      throw new Error(errorData.message);
    }
    return response.json();
  },

  /**
   * Elimina una tarea.
   * @param {string} id - El ID de la tarea a eliminar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la tarea es eliminada.
   */
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Error al eliminar la tarea.');
  },
   /**
   * Obtiene las métricas del dashboard desde el backend.
   * @returns {Promise<Metrics>} Una promesa que resuelve a un objeto con las métricas.
   */
  async getDashboardMetrics(): Promise<Metrics> {
    const response = await fetch(`${API_BASE_URL}/tasks/metrics`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener las métricas del dashboard');
    }
    return response.json();
  },

};