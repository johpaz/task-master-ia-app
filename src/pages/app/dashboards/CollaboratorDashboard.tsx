
import { useAuthStore } from '../../../stores/authStore';
import { useTaskStore } from '../../../stores/taskStore';
import { PersonalTasks } from '../../../components/dashboards/collaborator/PersonalTasks';
import { TimeTracking } from '../../../components/dashboards/collaborator/TimeTracking';
import { PersonalCalendar } from '../../../components/dashboards/collaborator/PersonalCalendar';
import { PersonalMetrics } from '../../../components/dashboards/collaborator/PersonalMetrics';

export const CollaboratorDashboard = () => {
  const { user } = useAuthStore();
  const { tasks } = useTaskStore();

  // Filtrar tareas asignadas al colaborador
  const myTasks = tasks.filter(task => task.assignedTo === user?.id);

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Mi Espacio de Trabajo - {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-green-100">
          Gestiona tus tareas y revisa tu progreso
        </p>
      </div>

      {/* Personal Metrics */}
      <PersonalMetrics tasks={myTasks} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Tasks */}
        <div className="lg:col-span-2">
          <PersonalTasks tasks={myTasks} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TimeTracking />
          <PersonalCalendar />
        </div>
      </div>
    </div>
  );
};
