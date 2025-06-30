
import { 
  Settings, 
  Database, 
  Shield, 
  FileText,
  Users,
  BarChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

export const QuickActions = () => {
  const navigate = useNavigate();

  const handleDatabaseClick = () => {
    alert("Para ver la base de datos, ejecuta 'npm run db:studio' en la terminal del backend (directorio 'IssuesApi') y abre tu navegador en http://localhost:5555");
  };

  const actions = [
    { icon: Users, label: 'Gestionar Usuarios', color: 'text-blue-600', path: '/users', action: () => navigate('/users') },
    { icon: Settings, label: 'Configuración', color: 'text-gray-600', path: '/settings', action: () => navigate('/settings') },
    { icon: Database, label: 'Base de Datos', color: 'text-green-600', path: '#', action: handleDatabaseClick },
    { icon: Shield, label: 'Seguridad', color: 'text-red-600', path: '/settings?tab=security', action: () => navigate('/settings?tab=security') },
    { icon: FileText, label: 'Logs del Sistema', color: 'text-yellow-600', path: '/logs', action: () => navigate('/logs') },
    { icon: BarChart, label: 'Analytics', color: 'text-purple-600', path: '/reports', action: () => navigate('/reports') },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={action.action}
              disabled={!action.action}
            >
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <span className="text-xs text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
