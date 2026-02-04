
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, CheckSquare as CheckSquareIcon } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
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

export const Tasks = () => {
  // No usar más useTaskStore para la lista principal
  const { user, token } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const { data: tasksData, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks', location.pathname],
    queryFn: () => {
      if (location.pathname === '/all-tasks') {
        return taskService.getTasks();
      }
      return taskService.getMyTasks();
    },
    enabled: !!token,
  });

  // Los datos vienen directamente de la consulta
  const allTasks = tasksData?.tasks || [];


  // Filter tasks based on user role and search criteria
  const filteredTasks = allTasks.filter(task => {
    // Filtro por rol
    if (user?.role === 'client' && task.assignedBy !== user.id) {
      return false;
    }
    if (user?.role === 'collaborator' && task.assignedTo !== user.id) {
      return false;
    }


    // Filtro por búsqueda
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtros por estado y tipo
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
        refetch(); // Recargar la lista de tareas
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
      refetch(); // Recargar la lista de tareas
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
        // Solo contar días hábiles (lunes a viernes)
        addedDays++;
      }
    }

    return result.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Gestión de Tareas</h1>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Administra y da seguimiento a todas las tareas</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'manager' || user?.role === 'client') && (
          <Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Tarea
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 rounded-[2rem] overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <Input
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white focus:ring-blue-500/50"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-white/10 bg-white/5 text-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            >
              <option value="" className="bg-slate-900">Todos los estados</option>
              <option value="pendiente" className="bg-slate-900">Pendiente</option>
              <option value="en_progreso" className="bg-slate-900">En Progreso</option>
              <option value="revision" className="bg-slate-900">En Revisión</option>
              <option value="completada" className="bg-slate-900">Completada</option>
              <option value="cancelada" className="bg-slate-900">Cancelada</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-white/10 bg-white/5 text-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            >
              <option value="" className="bg-slate-900">Todos los tipos</option>
              <option value="desarrollo" className="bg-slate-900">Desarrollo</option>
              <option value="agente" className="bg-slate-900">Agente IA</option>
              <option value="soporte" className="bg-slate-900">Soporte</option>
              <option value="pqr" className="bg-slate-900">PQR</option>
              <option value="consultoria" className="bg-slate-900">Consultoría</option>
              <option value="capacitacion" className="bg-slate-900">Capacitación</option>
            </select>

            <Button variant="outline" className="border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 rounded-[2rem] overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-500 font-bold uppercase tracking-widest text-[10px] py-6 px-6">Título</TableHead>
                <TableHead className="text-slate-500 font-bold uppercase tracking-widest text-[10px] py-6">Estado</TableHead>
                <TableHead className="text-slate-500 font-bold uppercase tracking-widest text-[10px] py-6">Prioridad</TableHead>
                <TableHead className="text-right text-slate-500 font-bold uppercase tracking-widest text-[10px] py-6 px-6">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className="border-white/5 hover:bg-white/[0.02] group transition-colors">
                  <TableCell className="py-6 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{task.title}</span>
                      <span className="text-[10px] text-slate-600 font-mono mt-0.5">#{String(task.id).slice(0, 12)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusColors[task.status] || 'text-slate-400 bg-slate-400/10 border-white/5'}`}>
                      {task.status.replace('_', ' ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${task.priority === 'alta' || task.priority === 'urgente' ? 'text-rose-500' : 'text-slate-500'}`}>
                      {task.priority}
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center gap-2">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
      />
    </div>
  );
};