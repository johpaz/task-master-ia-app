
import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { TaskModal } from '../../components/tasks/TaskModal';

const columns = [
  { id: 'pendiente', title: 'Pendiente', color: 'bg-gray-50 border-gray-200' },
  { id: 'en_progreso', title: 'En Progreso', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'revision', title: 'En Revisión', color: 'bg-blue-50 border-blue-200' },
  { id: 'completada', title: 'Completada', color: 'bg-green-50 border-green-200' }
];

const priorityColors = {
  baja: 'bg-green-100 text-green-800',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-orange-100 text-orange-800',
  urgente: 'bg-red-100 text-red-800'
};

export const Kanban = () => {
  const { tasks, updateTask } = useTaskStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, task: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (task.status !== newStatus) {
      updateTask(task.id, { status: newStatus });
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
          <h1 className="text-2xl font-bold text-gray-900">Tablero Kanban</h1>
          <p className="text-gray-600">Visualiza y gestiona el flujo de trabajo</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <Button onClick={handleCreateTask} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        )}
      </div>

      {/* Kanban Board */}
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
              <Badge variant="secondary">
                {getTasksByStatus(column.id).length}
              </Badge>
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

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{task.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-gray-400">
                        Vence: {new Date(task.endDate).toLocaleDateString()}
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

      {/* Instructions */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Arrastra las tarjetas entre columnas para cambiar su estado. 
            Haz clic en una tarea para editarla o ver más detalles.
          </p>
        </CardContent>
      </Card>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};
