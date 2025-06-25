import { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle,
  Plus,
  Eye,
  MessageCircle
} from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { TaskModal } from '../../components/tasks/TaskModal';

const statusLabels = {
  pendiente: 'Pendiente',
  en_progreso: 'En Progreso',
  revision: 'En Revisión',
  completada: 'Completada',
  cancelada: 'Cancelada'
};

const statusColors = {
  pendiente: 'bg-gray-100 text-gray-800',
  en_progreso: 'bg-purple-100 text-purple-800',
  revision: 'bg-blue-100 text-blue-800',
  completada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800'
};

const typeLabels = {
  desarrollo: 'Desarrollo',
  agente: 'Agente IA',
  soporte: 'Soporte Técnico',
  pqr: 'PQR',
  consultoria: 'Consultoría',
  capacitacion: 'Capacitación'
};

export const ClientDashboard = () => {
  const { tasks } = useTaskStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filtrar solo las tareas del cliente actual
  const clientTasks = tasks.filter(task => 
    task.assignedTo === user?.id || task.assignedBy === user?.id
  );

  const metrics = {
    total: clientTasks.length,
    pending: clientTasks.filter(t => t.status === 'pendiente').length,
    inProgress: clientTasks.filter(t => t.status === 'en_progreso').length,
    completed: clientTasks.filter(t => t.status === 'completada').length,
    overdue: clientTasks.filter(t => 
      new Date(t.endDate) < new Date() && t.status !== 'completada'
    ).length
  };

  const recentTasks = clientTasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const handleCreateRequest = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Bienvenido, {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-blue-100">
          Aquí puedes ver el estado de tus solicitudes y crear nuevas tareas
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.total}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Proceso</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.completed}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.pending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mis Solicitudes Recientes</CardTitle>
              <Button onClick={handleCreateRequest} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nueva Solicitud
              </Button>
            </CardHeader>
            <CardContent>
              {recentTasks.length > 0 ? (
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {task.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {task.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={statusColors[task.status]}>
                              {statusLabels[task.status]}
                            </Badge>
                            <Badge variant="outline">
                              {typeLabels[task.type]}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              Creada: {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                            <span>
                              Entrega: {new Date(task.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewTask(task)}
                          className="ml-4"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tienes solicitudes aún
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Crea tu primera solicitud para comenzar
                  </p>
                  <Button onClick={handleCreateRequest}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Solicitud
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleCreateRequest}
                className="w-full justify-start" 
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Solicitud
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Soporte Técnico
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CheckSquare className="h-4 w-4 mr-2" />
                Ver Todas las Tareas
              </Button>
            </CardContent>
          </Card>

          {/* Types of Services */}
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Desarrollo de Software</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Agentes de IA</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Soporte Técnico</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span>Consultoría</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Capacitación</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>¿Necesitas Ayuda?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: soporte@tuprofedeai.com</p>
                <p>WhatsApp: +57 300 123 4567</p>
                <p>Horarios: Lun-Vie 8am-6pm</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};