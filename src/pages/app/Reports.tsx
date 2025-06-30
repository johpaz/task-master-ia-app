
import { BarChart, LineChart, PieChart, TrendingUp, Download, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Metrics } from '@/types';

export const Reports = () => {
  const { fetchTasks } = useTaskStore();
  const tasks = useTaskStore(state => state.tasks);

  useEffect(() => {
    const loadTasksAndMetrics = async () => {
      await fetchTasks();
    };
    loadTasksAndMetrics();
  }, [fetchTasks]);

  

  

  const monthlyData = tasks.reduce((acc, task) => {
    const month = new Date(task.createdAt).toLocaleString('default', { month: 'short' });
    const year = new Date(task.createdAt).getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) {
      acc[key] = { month: key, completed: 0, created: 0 };
    }
    acc[key].created++;
    if (task.status === 'completada') {
      acc[key].completed++;
    }
    return acc;
  }, {} as Record<string, { month: string; completed: number; created: number }>);

  const teamPerformance = tasks.reduce((acc, task) => {
    const member = task.assignedTo;
    if (!acc[member]) {
      acc[member] = { name: member, completed: 0, hours: 0 };
    }
    if (task.status === 'completada') {
      acc[member].completed++;
    }
    acc[member].hours += task.actualHours;
    return acc;
  }, {} as Record<string, { name: string; completed: number; hours: number }>);

  const tasksByType = tasks.reduce((acc, task) => {
    acc[task.type] = (acc[task.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes y Analíticas</h1>
          <p className="text-gray-600">Insights y métricas de productividad del equipo</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Filtrar Período
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productividad</p>
                <p className="text-3xl font-bold text-green-600">94%</p>
                <p className="text-xs text-gray-500">+5% vs mes anterior</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                <p className="text-3xl font-bold text-blue-600">
                  {tasks.length > 0 ? (tasks.reduce((acc, task) => acc + task.actualHours, 0) / tasks.length).toFixed(1) : '0'}h
                </p>
                <p className="text-xs text-gray-500">-2.5h vs meta</p>
              </div>
              <BarChart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tareas Completadas</p>
                <p className="text-3xl font-bold text-purple-600">{tasks.filter(task => task.status === 'completada').length || '0'}</p>
                <p className="text-xs text-gray-500">Este mes</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eficiencia</p>
                <p className="text-3xl font-bold text-orange-600">89%</p>
                <p className="text-xs text-gray-500">Tiempo estimado vs real</p>
              </div>
              <LineChart className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Tareas por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(tasksByType).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="capitalize font-medium">{type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${tasks.length > 0 ? (count / tasks.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.values(monthlyData).map((data) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="font-medium w-12">{data.month}</span>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${data.created > 0 ? (data.completed / data.created) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{data.completed}/{data.created}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento del Equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Miembro del Equipo</th>
                  <th className="text-center py-3 px-4">Tareas Completadas</th>
                  <th className="text-center py-3 px-4">Horas Trabajadas</th>
                  <th className="text-center py-3 px-4">Promedio por Tarea</th>
                  <th className="text-center py-3 px-4">Eficiencia</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(teamPerformance).map((member) => (
                  <tr key={member.name} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{member.name}</td>
                    <td className="text-center py-3 px-4">{member.completed}</td>
                    <td className="text-center py-3 px-4">{member.hours}h</td>
                    <td className="text-center py-3 px-4">
                      {member.completed > 0 ? `${(member.hours / member.completed).toFixed(1)}h` : '0.0h'}
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {Math.floor(Math.random() * 20) + 80}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Opciones de Exportación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar como PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar como Excel
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Programar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
