
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, CheckSquare as CheckSquareIcon } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { TaskModal } from '../../components/tasks/TaskModal';
import { Task } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { taskService, CreateTaskRequest, UpdateTaskRequest } from '../../services/taskService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const priorityColors = {
  baja: 'bg-green-100 text-green-800',
  media: 'bg-slate-100 text-slate-800', 
  alta: 'bg-teal-100 text-teal-800',
  urgente: 'bg-red-100 text-red-800'
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
  soporte: 'Soporte',
  pqr: 'PQR',
  consultoria: 'Consultoría',
  capacitacion: 'Capacitación'
};

export const AllTasks = () => {
  const { user, token } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const { data: tasksData, isLoading, error, refetch } = useQuery({
    queryKey: ['allTasks', token],
    queryFn: () => taskService.getTasks(token),
    enabled: !!token,
  });

  const allTasks = tasksData?.data || [];
  
  const filteredTasks = allTasks.filter(task => {
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

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await taskService.deleteTask(taskId);
        toast({ title: "Tarea eliminada" });
        refetch();
      } catch (error) {
        toast({ title: "Error al eliminar la tarea", variant: "destructive" });
      }
    }
  };

  const handleSaveTask = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
    try {
      if (selectedTask) {
        await taskService.updateTask(selectedTask.id, taskData as UpdateTaskRequest);
        toast({ title: "Tarea actualizada" });
      } else {
        await taskService.createTask(taskData as CreateTaskRequest);
        toast({ title: "Tarea creada" });
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast({ title: "Error al guardar la tarea", variant: "destructive" });
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

  if (error) return <div>Error al cargar las tareas.</div>;

  const getDeadlineDate = (
        startDate: string | Date,
        endDate: string | Date | null,
        estimatedHours: number
      ): string => {
  if (endDate) return new Date(endDate).toLocaleDateString();

  const start = new Date(startDate);
  const workingHoursPerDay = 5;
  const estimatedDays = Math.ceil(estimatedHours / workingHoursPerDay);
  
  const result = new Date(start);
  
  let addedDays = 0;

  while (addedDays < estimatedDays) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      addedDays++;
    }
  }

  return result.toLocaleDateString();
};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Todas las Tareas</h1>
          <p className="text-gray-600">Administra y da seguimiento a todas las tareas del sistema</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'manager' || user?.role === 'client') && (
          <Button onClick={handleCreateTask} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        )}
      </div>

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
              className="px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-3 py-2 border  bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[task.status]} variant="secondary">
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[task.priority]} variant="secondary">
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {canEditTask(task) && (
                        <Link to={`/tasks/${task.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
      />
    </div>
  );
};
