
import { useAuthStore } from '../../stores/authStore';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { ManagerDashboard } from './dashboards/ManagerDashboard';
import { CollaboratorDashboard } from './dashboards/CollaboratorDashboard';
import { ClientDashboard } from './ClientDashboard';

export const Dashboard = () => {
  const { user } = useAuthStore();

  // Renderizar dashboard específico según el rol del usuario
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'collaborator':
      return <CollaboratorDashboard />;
    case 'client':
      return <ClientDashboard />;
    default:
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Rol no reconocido
            </h2>
            <p className="text-gray-600">
              Por favor, contacta al administrador del sistema.
            </p>
          </div>
        </div>
      );
  }
};
