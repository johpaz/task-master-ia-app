
import { 
  Settings, 
  Database, 
  Shield, 
  FileText,
  Users,
  BarChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

export const QuickActions = () => {
  const actions = [
    { icon: Users, label: 'Gestionar Usuarios', color: 'text-blue-600' },
    { icon: Settings, label: 'Configuración', color: 'text-gray-600' },
    { icon: Database, label: 'Base de Datos', color: 'text-green-600' },
    { icon: Shield, label: 'Seguridad', color: 'text-red-600' },
    { icon: FileText, label: 'Logs del Sistema', color: 'text-yellow-600' },
    { icon: BarChart, label: 'Analytics', color: 'text-purple-600' },
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
