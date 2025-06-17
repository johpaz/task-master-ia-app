
import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, CheckSquare as CheckSquareIcon } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { TaskModal } from '../../components/tasks/TaskModal';
import { Task } from '../../types';

const priorityColors = {
  baja: 'bg-green-100 text-green-800',
  media: 'bg-yellow-100 text-yellow-800', 
  alta: 'bg-orange-100 text-orange-800',
  urgente: 'bg-red-100 text-red-800'
};

const statusColors = {
  pendiente: 'bg-gray-100 text-gray-800',
  en_progreso: 'bg-yellow-100 text-yellow-800',
  revision: 'bg-blue-100 text-blue-800',
  completada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800'
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
  const { tasks, deleteTask } = useTaskStore();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filter tasks based on user role and search criteria
  const filteredTasks = tasks.filter(task => {
    // Role-based filtering
    if (user?.role === 'client' && task.assignedBy !== user.id) {
      return false;
    }
    if (user?.role === 'collaborator' && task.assignedTo !== user.id) {
      return false;
    }

    // Search filtering
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    const matchesType = !selectedType || task.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      deleteTask(taskId);
    }
  };

  const canEditTask = (task: Task) => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'manager') return true;
    if (user?.role === 'collaborator' && task.assignedTo === user.id) return true;
    return false;
  };

  const canDeleteTask = (task: Task) => {
    return user?.role === 'admin' || (user?.role === 'manager');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Tareas</h1>
          <p className="text-gray-600">Administra y da seguimiento a todas las tareas</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'manager' || user?.role === 'client') && (
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
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

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckSquareIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedStatus || selectedType 
                  ? 'No se encontraron tareas con los filtros aplicados' 
                  : 'Aún no tienes tareas asignadas'}
              </p>
              {(user?.role === 'admin' || user?.role === 'manager' || user?.role === 'client') && (
                <Button onClick={handleCreateTask}>
                  Crear primera tarea
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 ml-4">
                        {canEditTask(task) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTask(task)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {canDeleteTask(task) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600">{task.description}</p>

                    <div className="flex flex-wrap gap-2">
                      <Badge className={statusColors[task.status]} variant="secondary">
                        {task.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={priorityColors[task.priority]} variant="secondary">
                        {task.priority}
                      </Badge>
                      <Badge variant="outline">
                        {typeLabels[task.type]}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Asignado a:</span> Usuario {task.assignedTo}
                      </div>
                      <div>
                        <span className="font-medium">Tiempo:</span> {task.actualHours}h / {task.estimatedHours}h
                      </div>
                      <div>
                        <span className="font-medium">Vence:</span> {new Date(task.endDate).toLocaleDateString()}
                      </div>
                    </div>

                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task && task.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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
