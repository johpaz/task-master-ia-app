import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

export const PersonalCalendar = () => {
  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Entrega módulo de pagos',
      date: '2024-01-08',
      time: '17:00',
      priority: 'alta'
    },
    {
      id: '2',
      title: 'Revisión de código',
      date: '2024-01-10',
      time: '10:00',
      priority: 'media'
    },
    {
      id: '3',
      title: 'Reunión de equipo',
      date: '2024-01-12',
      time: '14:00',
      priority: 'baja'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'text-red-600 bg-red-50';
      case 'media': return 'text-slate-600 bg-slate-50';
      case 'baja': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-green-600" />
          Próximas Fechas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline) => (
            <div key={deadline.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm">
                  {deadline.title}
                </h4>
                <div className={`p-1 rounded ${getPriorityColor(deadline.priority)}`}>
                  <AlertCircle className="h-3 w-3" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(deadline.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {deadline.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};