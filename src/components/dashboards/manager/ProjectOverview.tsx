import { Folder, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

export const ProjectOverview = () => {
  const projects = [
    {
      id: '1',
      name: 'Sistema E-commerce',
      status: 'en_progreso',
      progress: 75,
      team: 5,
      deadline: '2024-01-15'
    },
    {
      id: '2',
      name: 'App Móvil IA',
      status: 'revision',
      progress: 90,
      team: 3,
      deadline: '2024-01-20'
    },
    {
      id: '3',
      name: 'Dashboard Analytics',
      status: 'pendiente',
      progress: 25,
      team: 4,
      deadline: '2024-02-01'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_progreso': return 'bg-purple-100 text-purple-800';
      case 'revision': return 'bg-blue-100 text-blue-800';
      case 'pendiente': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Folder className="mr-2 h-5 w-5 text-purple-600" />
          Proyectos Activos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {project.team} miembros
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace('_', ' ')}
                </Badge>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{project.progress}% completado</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};