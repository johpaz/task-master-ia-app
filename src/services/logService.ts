import { useAuthStore } from '../stores/authStore';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Authorization': `Bearer ${token}`,
  };
};

export const logService = {
  getLogs: async () => {
    const response = await fetch(`${API_BASE_URL}/logs`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch logs');
    }
    return response.text();
  },
};
