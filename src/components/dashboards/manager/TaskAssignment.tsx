import { Plus, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

export const TaskAssignment = () => {
  const pendingAssignments = [
    {
      id: '1',
      title: 'Implementar autenticación',
      priority: 'alta',
      estimatedHours: 8,
      deadline: '2024-01-10'
    },
    {
      id: '2',
      title: 'Diseñar interfaz de usuario',
      priority: 'media',
      estimatedHours: 12,
      deadline: '2024-01-12'
    },
    {
      id: '3',
      title: 'Configurar base de datos',
      priority: 'urgente',
      estimatedHours: 6,
      deadline: '2024-01-08'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-teal-100 text-teal-800';
      case 'media': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5 text-purple-600" />
          Asignación de Tareas
        </CardTitle>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-1" />
          Asignar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingAssignments.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>{task.estimatedHours}h estimadas</span>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(task.deadline).toLocaleDateString()}
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                Asignar a colaborador
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};