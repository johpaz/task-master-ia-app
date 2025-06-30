
import { useAuthStore } from '../stores/authStore';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  if (!token) {
    // No lanzar un error aquí, simplemente devolver las cabeceras sin autorización.
    // El backend se encargará de rechazar la petición si el token es necesario.
    return {
      'Content-Type': 'application/json',
    };
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const notificationService = {
  getNotifications: async () => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch notifications');
    }
    return response.json();
  },

  markAsRead: async (notificationId: string) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to mark notification as read');
    }
    // No es necesario devolver JSON si la respuesta es 200 OK sin cuerpo.
    return;
  },
};
