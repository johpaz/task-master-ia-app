
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { TaskModal } from '../../components/tasks/TaskModal';
import { Task } from '../../types';

import { useToast } from '../../hooks/use-toast';
import { taskService, CreateTaskRequest, UpdateTaskRequest } from '../../services/taskService';

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

import { useQuery } from '@tanstack/react-query';
// ...
export const Calendar = () => {
  const { user, token } = useAuthStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const { data: tasksData, isLoading, error, refetch } = useQuery({
    queryKey: ['allTasks', token],
    queryFn: () => taskService.getTasks(token),
    enabled: !!token,
  });

  const tasks = tasksData?.data || [];

  const { updateTask } = useTaskStore();


  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];
  
  // Días vacíos del mes anterior
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getTasksForDate = (day: number) => {
    if (!day) return [];
    
    const dateStr = new Date(year, month, day).toDateString();
    return tasks.filter(task => {
      const startDate = task.startDate ? new Date(task.startDate).toDateString() : null;
      const endDate = task.endDate ? new Date(task.endDate).toDateString() : null;
      return startDate === dateStr || endDate === dateStr;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, taskData as Partial<Task>);
        toast({ title: "Tarea actualizada" });
      } else {
        // Handle create task logic here
        toast({ title: "Tarea creada" });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({ title: "Error al guardar la tarea", variant: "destructive" });
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Tareas</h1>
          <p className="text-gray-600">Visualiza fechas de inicio y entrega</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={goToToday}>
            Hoy
          </Button>
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <Button onClick={handleCreateTask} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Tarea
            </Button>
          )}
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <CardTitle className="text-xl">
              {months[month]} {year}
            </CardTitle>
            
            <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div 
                key={index}
                className={`min-h-24 p-2 border border-gray-200 rounded-lg ${
                  !day ? 'bg-gray-50' : isToday(day) ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                }`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(day) ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {day}
                    </div>
                    
                    <div className="space-y-1">
                      {getTasksForDate(day).slice(0, 2).map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => handleTaskClick(task)}
                          className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                          style={{
                            backgroundColor: 
                              task.priority === 'urgente' ? '#FEE2E2' :
                              task.priority === 'alta' ? '#CCFBF1' :
                              task.priority === 'media' ? '#E2E8F0' : '#F0FDF4',
                            color:
                              task.priority === 'urgente' ? '#DC2626' :
                              task.priority === 'alta' ? '#0D9488' :
                              task.priority === 'media' ? '#475569' : '#16A34A'
                          }}
                        >
                          <div className="truncate font-medium">
                            {task.title}
                          </div>
                          <div className="truncate opacity-75">
                            {task.type}
                          </div>
                        </div>
                      ))}
                      
                      {getTasksForDate(day).length > 2 && (
                        <div className="text-xs text-gray-500 px-1">
                          +{getTasksForDate(day).length - 2} más
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Leyenda de Prioridades</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 rounded"></div>
              <span className="text-sm text-gray-600">Baja</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded"></div>
              <span className="text-sm text-gray-600">Media</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-200 rounded"></div>
              <span className="text-sm text-gray-600">Alta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 rounded"></div>
              <span className="text-sm text-gray-600">Urgente</span>
            </div>
          </div>
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
