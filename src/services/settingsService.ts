
import { useAuthStore } from '../stores/authStore';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const settingsService = {
  updateProfile: async (userId: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    return response.json();
  },

  changePassword: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to change password');
    }
    return response.json();
  },

  updateNotificationSettings: async (userId: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/notifications`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update notification settings');
    }
    return response.json();
  },

  updatePreferences: async (userId: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/preferences`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }
    return response.json();
  },
};
