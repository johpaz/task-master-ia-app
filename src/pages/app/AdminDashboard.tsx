
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { UserTable } from '../../components/dashboard/UserTable';
import { TaskTable } from '../../components/dashboard/TaskTable';
import { SystemMetrics } from '@/components/dashboards/admin/SystemMetrics';
import { AdvancedReports } from '@/components/dashboards/admin/AdvancedReports';
import { QuickActions } from '@/components/dashboards/admin/QuickActions';
import { UserManagement } from '@/components/dashboards/admin/UserManagement';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchDashboardStats = async (token: string | null) => {
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const AdminDashboard: React.FC = () => {
  const { token } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => fetchDashboardStats(token),
    enabled: !!token,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <SystemMetrics />

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <AdvancedReports />
        </div>
        <div className="grid gap-6">
          <QuickActions />
          <UserManagement />
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <TaskTable />
      </div>
    </div>
  );
};
