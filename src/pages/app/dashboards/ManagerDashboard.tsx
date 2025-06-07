
import { useAuthStore } from '../../../stores/authStore';
import { useTaskStore } from '../../../stores/taskStore';
import { TeamMetrics } from '../../../components/dashboards/manager/TeamMetrics';
import { ProjectOverview } from '../../../components/dashboards/manager/ProjectOverview';
import { TaskAssignment } from '../../../components/dashboards/manager/TaskAssignment';
import { TeamReports } from '../../../components/dashboards/manager/TeamReports';

export const ManagerDashboard = () => {
  const { user } = useAuthStore();
  const { getDashboardMetrics } = useTaskStore();
  const metrics = getDashboardMetrics();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Panel de Gestión - {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-purple-100">
          Gestiona tu equipo y proyectos de manera eficiente
        </p>
      </div>

      {/* Team Metrics */}
      <TeamMetrics metrics={metrics} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Overview */}
        <ProjectOverview />
        
        {/* Task Assignment */}
        <TaskAssignment />
      </div>

      {/* Team Reports */}
      <TeamReports />
    </div>
  );
};
