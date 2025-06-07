
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Target
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { DashboardMetrics } from '../../../types';

interface TeamMetricsProps {
  metrics: DashboardMetrics;
}

export const TeamMetrics = ({ metrics }: TeamMetricsProps) => {
  const teamStats = [
    {
      title: 'Miembros del Equipo',
      value: 8,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Tareas Completadas',
      value: metrics.completedTasks,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'En Progreso',
      value: metrics.inProgressTasks,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Objetivos Alcanzados',
      value: '87%',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {teamStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
