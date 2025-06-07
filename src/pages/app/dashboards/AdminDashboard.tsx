
import { useAuthStore } from '../../../stores/authStore';
import { useTaskStore } from '../../../stores/taskStore';
import { SystemMetrics } from '../../../components/dashboards/admin/SystemMetrics';
import { UserManagement } from '../../../components/dashboards/admin/UserManagement';
import { AdvancedReports } from '../../../components/dashboards/admin/AdvancedReports';
import { QuickActions } from '../../../components/dashboards/admin/QuickActions';

export const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { getDashboardMetrics } = useTaskStore();
  const metrics = getDashboardMetrics();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Panel de Administración - {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-red-100">
          Vista completa del sistema y gestión de usuarios
        </p>
      </div>

      {/* System Metrics */}
      <SystemMetrics metrics={metrics} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advanced Reports */}
        <div className="lg:col-span-2">
          <AdvancedReports />
        </div>

        {/* User Management & Quick Actions */}
        <div className="space-y-6">
          <UserManagement />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};
