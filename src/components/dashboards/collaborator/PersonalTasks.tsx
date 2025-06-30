import { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Task } from '../../../types';

interface PersonalTasksProps {
  tasks: Task[];
}

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

export const PersonalTasks = ({ tasks }: PersonalTasksProps) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  const getIcon = (status: string) => {
    switch (status) {
      case 'completada': return CheckSquare;
      case 'en_progreso': return Clock;
      default: return AlertTriangle;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckSquare className="mr-2 h-5 w-5 text-green-600" />
          Mis Tareas
        </CardTitle>
        
        {/* Filters */}
        <div className="flex gap-2 mt-4">
          {['all', 'en_progreso', 'revision', 'completada'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className="text-xs"
            >
              {status === 'all' ? 'Todas' : statusLabels[status as keyof typeof statusLabels]}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              const Icon = getIcon(task.status);
              return (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {task.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={statusColors[task.status]}>
                          {statusLabels[task.status]}
                        </Badge>
                        <Badge variant="outline">{task.priority}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Entrega: {new Date(task.endDate).toLocaleDateString()}</span>
                        <span>{task.estimatedHours}h estimadas</span>
                        {task.actualHours > 0 && (
                          <span>{task.actualHours}h trabajadas</span>
                        )}
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay tareas
              </h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'No tienes tareas asignadas'
                  : `No tienes tareas con estado "${statusLabels[filter as keyof typeof statusLabels]}"`
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};