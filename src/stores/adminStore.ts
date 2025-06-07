
import { create } from 'zustand';

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

interface SystemMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface AdminState {
  systemAlerts: SystemAlert[];
  systemMetrics: SystemMetric[];
  isLoading: boolean;
  addSystemAlert: (alert: Omit<SystemAlert, 'id' | 'timestamp'>) => void;
  dismissAlert: (id: string) => void;
  updateSystemMetrics: (metrics: SystemMetric[]) => void;
  fetchSystemData: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  systemAlerts: [
    {
      id: '1',
      type: 'warning',
      message: 'Alto uso de CPU detectado en el servidor principal',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'info',
      message: 'Backup automático completado exitosamente',
      timestamp: new Date()
    }
  ],
  systemMetrics: [
    { name: 'CPU Usage', value: 75, trend: 'up', change: 5 },
    { name: 'Memory Usage', value: 68, trend: 'stable', change: 0 },
    { name: 'Disk Usage', value: 45, trend: 'down', change: -3 },
    { name: 'Network I/O', value: 82, trend: 'up', change: 12 }
  ],
  isLoading: false,

  addSystemAlert: (alert) => {
    const newAlert: SystemAlert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    set((state) => ({
      systemAlerts: [newAlert, ...state.systemAlerts]
    }));
  },

  dismissAlert: (id) => {
    set((state) => ({
      systemAlerts: state.systemAlerts.filter(alert => alert.id !== id)
    }));
  },

  updateSystemMetrics: (metrics) => {
    set({ systemMetrics: metrics });
  },

  fetchSystemData: async () => {
    set({ isLoading: true });
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Aquí iría la lógica real de fetch
      console.log('System data fetched');
    } catch (error) {
      console.error('Error fetching system data:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
