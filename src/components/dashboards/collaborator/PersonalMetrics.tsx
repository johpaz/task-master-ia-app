import { CheckSquare, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Task } from '../../../types';

interface PersonalMetricsProps {
  tasks: Task[];
}

export const PersonalMetrics = ({ tasks }: PersonalMetricsProps) => {
  const completedTasks = tasks.filter(t => t.status === 'completada').length;
  const inProgressTasks = tasks.filter(t => t.status === 'en_progreso').length;
  const totalHours = tasks.reduce((sum, task) => sum + task.actualHours, 0);
  const efficiency = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const metrics = [
    {
      title: 'Tareas Completadas',
      value: completedTasks,
      icon: CheckSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'En Progreso',
      value: inProgressTasks,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Horas Trabajadas',
      value: totalHours,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Eficiencia',
      value: `${efficiency}%`,
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {metric.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};