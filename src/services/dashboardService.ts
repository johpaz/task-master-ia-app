import { useAuthStore } from '../stores/authStore';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const dashboardService = {
  getClientDashboardStats: async (token: string | null) => {
    if (!token) {
      throw new Error('No authentication token provided');
    }
    const response = await fetch(`${API_BASE_URL}/dashboard/client`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch client dashboard stats');
    }
    return response.json();
  },
};
