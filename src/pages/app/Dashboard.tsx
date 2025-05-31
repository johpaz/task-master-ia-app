
import { useAuthStore } from '../../stores/authStore';
import { ClientDashboard } from './ClientDashboard';
import { 
  CheckSquare, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const AdminManagerDashboard = () => {
  const { getDashboardMetrics } = useTaskStore();
  const { user } = useAuthStore();
  const metrics = getDashboardMetrics();

  const statCards = [
    {
      title: 'Total de Tareas',
      value: metrics.totalTasks,
      icon: CheckSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'En Progreso',
      value: metrics.inProgressTasks,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Completadas',
      value: metrics.completedTasks,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Vencidas',
      value: metrics.overdueCovers,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Bienvenido a tu Dashboard, {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-blue-100">
          Aquí tienes un resumen de tus proyectos y tareas más importantes
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5 text-blue-600" />
              Tareas Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Chatbot E-commerce</p>
                  <p className="text-sm text-gray-600">Agente IA - En progreso</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  65%
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">API REST Inventarios</p>
                  <p className="text-sm text-gray-600">Desarrollo - En revisión</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  90%
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Soporte Técnico</p>
                  <p className="text-sm text-gray-600">Soporte - Urgente</p>
                </div>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  0%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              Rendimiento del Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tareas completadas</span>
                <span className="font-semibold">{metrics.completedTasks}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tiempo promedio</span>
                <span className="font-semibold">
                  {metrics.averageCompletionTime.toFixed(1)}h
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Eficiencia</span>
                <span className="font-semibold text-green-600">95%</span>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progreso mensual</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <CheckSquare className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Nueva Tarea</h3>
              <p className="text-sm text-gray-600">Crear una nueva tarea o proyecto</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <CalendarIcon className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Ver Calendario</h3>
              <p className="text-sm text-gray-600">Revisar fechas límite y eventos</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Users className="h-6 w-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Gestionar Equipo</h3>
              <p className="text-sm text-gray-600">Asignar tareas y revisar progreso</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Dashboard = () => {
  const { user } = useAuthStore();

  // Mostrar dashboard específico para clientes
  if (user?.role === 'client') {
    return <ClientDashboard />;
  }

  // Dashboard para admin, manager y collaborator
  return <AdminManagerDashboard />;
};
