import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Filter } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { TaskModal } from '../../components/tasks/TaskModal';
import { Task } from '../../types';

// Column definitions must match backend status values
const columns = [
  { id: 'pendiente' as const, title: 'Pendiente', color: 'bg-gray-50 border-gray-200' },
  { id: 'en_progreso' as const, title: 'En Progreso', color: 'bg-purple-50 border-purple-200' },
  { id: 'revision' as const, title: 'En Revisión', color: 'bg-blue-50 border-blue-200' },
  { id: 'completada' as const, title: 'Completada', color: 'bg-green-50 border-green-200' }
];

const priorityColors = {
  baja: 'bg-green-100 text-green-800',
  media: 'bg-slate-100 text-slate-800',
  alta: 'bg-teal-100 text-teal-800',
  urgente: 'bg-red-100 text-red-800'
};

import { useToast } from '../../hooks/use-toast';
import { taskService, CreateTaskRequest, UpdateTaskRequest } from '../../services/taskService';

export const Kanban = () => {
  const { user, token } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const { data: tasksData, isLoading, error, refetch } = useQuery({
    queryKey: ['allTasks', token],
    queryFn: () => taskService.getTasks(token),
    enabled: !!token,
  });

  // Ensure we read the 'data' property returned by the API
  const tasks: Task[] = tasksData?.data || [];

  const { updateTask } = useTaskStore();

  const getTasksByStatus = (status: Task['status']) => tasks.filter(task => task.status === status);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    const task: Task = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (task.status !== newStatus) {
      updateTask(task.id, { status: newStatus });
      refetch();
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, taskData as Partial<Task>);
        toast({ title: 'Tarea actualizada' });
      } else {
        // if creation logic exists in store
        await taskService.createTask(taskData as CreateTaskRequest);
        await refetch();
        toast({ title: 'Tarea creada' });
      }
      setIsModalOpen(false);
    } catch {
      toast({ title: 'Error al guardar la tarea', variant: 'destructive' });
    }
  };

  const calculateEndDate = (startDate: string, estimatedHours: number) => {
    if (!startDate || estimatedHours == null) return null;
    const start = new Date(startDate);
    const workdayHours = 5;
    const daysToAdd = Math.ceil(estimatedHours / workdayHours);
    let added = 0;
    while (added < daysToAdd) {
      start.setDate(start.getDate() + 1);
      const day = start.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    return start.toLocaleDateString();
  };

  if (isLoading) return <div className="p-4">Cargando tareas...</div>;
  if (error) return <div className="p-4 text-red-500">Error al cargar tareas</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tablero Kanban</h1>
          <p className="text-gray-600">Visualiza y gestiona el flujo de trabajo</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <Button onClick={handleCreateTask} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nueva Tarea
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`border-2 border-dashed rounded-lg p-4 ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <Badge variant="secondary">{getTasksByStatus(column.id).length}</Badge>
            </div>

            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task) => (
                <Card
                  key={task.id}
                  className="cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onClick={() => handleEditTask(task)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 line-clamp-2">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={priorityColors[task.priority]} variant="secondary">
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Usuario {task.assignedTo}</span>
                        <span>{task.actualHours}h / {task.estimatedHours}h</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Vence: {task.endDate ? new Date(task.endDate).toLocaleDateString() : calculateEndDate(task.startDate, task.estimatedHours)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No hay tareas</p>
                  <p className="text-xs">Arrastra una tarea aquí</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Arrastra las tarjetas entre columnas para cambiar su estado. Haz clic en una tarea para editarla o ver más detalles.
          </p>
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
