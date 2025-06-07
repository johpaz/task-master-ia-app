
import { BarChart, TrendingUp, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

export const AdvancedReports = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-red-600" />
          Reportes Avanzados
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Performance Chart Placeholder */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Gráfico de Rendimiento del Sistema</p>
              <p className="text-sm text-gray-400">Datos de los últimos 30 días</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">95%</p>
              <p className="text-sm text-gray-600">Eficiencia Global</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">142</p>
              <p className="text-sm text-gray-600">Tareas Este Mes</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">24h</p>
              <p className="text-sm text-gray-600">Tiempo Promedio</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
