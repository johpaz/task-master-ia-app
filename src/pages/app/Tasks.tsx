
import { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar,
  User,
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { TaskModal } from '../../components/tasks/TaskModal';

const statusColors = {
  pendiente: 'bg-gray-100 text-gray-800',
  en_progreso: 'bg-yellow-100 text-yellow-800',
  revision: 'bg-blue-100 text-blue-800',
  completada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800'
};

const priorityColors = {
  baja: 'bg-green-100 text-green-800',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-orange-100 text-orange-800',
  urgente: 'bg-red-100 text-red-800'
};

const typeLabels = {
  desarrollo: 'Desarrollo',
  agente: 'Agente IA',
  soporte: 'Soporte',
  pqr: 'PQR',
  consultoria: 'Consultoría',
  capacitacion: 'Capacitación'
};

export const Tasks = () => {
  const { getFilteredTasks, filters, setFilters } = useTaskStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = getFilteredTasks();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente': return <Clock className="h-4 w-4" />;
      case 'en_progreso': return <AlertCircle className="h-4 w-4" />;
      case 'completada': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Tareas</h1>
          <p className="text-gray-600">Administra y da seguimiento a todas las tareas</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <Button onClick={handleCreateTask} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar tareas..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters({ status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En Progreso</option>
              <option value="revision">En Revisión</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ type: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="desarrollo">Desarrollo</option>
              <option value="agente">Agente IA</option>
              <option value="soporte">Soporte</option>
              <option value="pqr">PQR</option>
              <option value="consultoria">Consultoría</option>
              <option value="capacitacion">Capacitación</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => setFilters({ priority: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las prioridades</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {task.title}
                </CardTitle>
                <div className="flex items-center gap-1 ml-2">
                  {getStatusIcon(task.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm line-clamp-2">
                {task.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <Badge className={statusColors[task.status]}>
                  {task.status.replace('_', ' ')}
                </Badge>
                <Badge className={priorityColors[task.priority]}>
                  {task.priority}
                </Badge>
                <Badge variant="outline">
                  {typeLabels[task.type]}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Asignado a: Usuario {task.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Vence: {new Date(task.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{task.actualHours}h / {task.estimatedHours}h</span>
                </div>
              </div>

              {task.client && (
                <div className="bg-gray-50 p-2 rounded text-sm">
                  <span className="font-medium">Cliente:</span> {task.client}
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex flex-wrap gap-1">
                  {task.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {task.tags.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{task.tags.length - 2} más
                    </span>
                  )}
                </div>
                
                {(user?.role === 'admin' || user?.role === 'manager' || task.assignedTo === user?.id) && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditTask(task)}
                  >
                    Editar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron tareas
            </h3>
            <p className="text-gray-500 mb-4">
              {filters.search || filters.status || filters.type || filters.priority
                ? 'Intenta ajustar los filtros'
                : 'Comienza creando tu primera tarea'}
            </p>
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <Button onClick={handleCreateTask}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Tarea
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};
