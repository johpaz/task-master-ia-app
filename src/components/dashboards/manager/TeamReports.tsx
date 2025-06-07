
import { BarChart, TrendingUp, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

export const TeamReports = () => {
  const teamPerformance = [
    { name: 'Ana García', tasksCompleted: 12, efficiency: 95, hours: 38 },
    { name: 'Carlos López', tasksCompleted: 8, efficiency: 88, hours: 42 },
    { name: 'María Rodríguez', tasksCompleted: 15, efficiency: 92, hours: 40 },
    { name: 'Pedro Martín', tasksCompleted: 10, efficiency: 85, hours: 35 }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-purple-600" />
          Rendimiento del Equipo
        </CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Exportar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Placeholder */}
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Gráfico de Rendimiento Semanal</p>
            </div>
          </div>

          {/* Team Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Colaborador</th>
                  <th className="text-center py-2">Tareas</th>
                  <th className="text-center py-2">Eficiencia</th>
                  <th className="text-center py-2">Horas</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((member, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{member.name}</td>
                    <td className="text-center py-3">{member.tasksCompleted}</td>
                    <td className="text-center py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        member.efficiency >= 90 ? 'bg-green-100 text-green-800' : 
                        member.efficiency >= 85 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {member.efficiency}%
                      </span>
                    </td>
                    <td className="text-center py-3">{member.hours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
