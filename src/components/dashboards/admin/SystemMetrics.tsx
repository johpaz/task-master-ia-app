import { 
  CheckSquare, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Database,
  ClipboardList,
  UserCheck,
  UserCog,
  UserRound,
  Building
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { Skeleton } from '@/components/ui/skeleton';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchDashboardStats = async (token) => {
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

export const SystemMetrics = () => {
  const { token } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => fetchDashboardStats(token),
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-8 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) return <div>Error loading metrics.</div>;

  const statCards = [
    {
      title: 'Total de Tareas',
      value: data?.totalTasks ?? 0,
      icon: ClipboardList,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total de Usuarios',
      value: data?.totalUsers ?? 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Admins',
      value: data?.usersByRole?.admin ?? 0,
      icon: UserCog,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Colaboradores',
      value: data?.usersByRole?.collaborator ?? 0,
      icon: UserRound,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Clientes',
      value: data?.usersByRole?.client ?? 0,
      icon: Building,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ].filter(card => card.value > 0 || !['Admins', 'Colaboradores', 'Clientes'].includes(card.title)); // Opcional: Ocultar si es 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};