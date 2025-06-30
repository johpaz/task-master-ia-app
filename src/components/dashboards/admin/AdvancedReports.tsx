import { useMemo, useState } from 'react';
import { BarChart, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart as ReBarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchDashboardStats = async (token: string | null) => {
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const CHART_CONFIGS = {
  tasksByStatus: { label: 'Tareas por Estado', colors: { "por hacer": "#3B82F6", "en progreso": "#FBBF24", "en revisión": "#A855F7", "completada": "#10B981", "cancelada": "#EF4444" } },
  tasksByPriority: { label: 'Tareas por Prioridad', colors: { "baja": "#22C55E", "media": "#F59E0B", "alta": "#EAB308", "urgente": "#DC2626" } },
  usersByRole: { label: 'Usuarios por Rol', colors: { "admin": "#8B5CF6", "manager": "#3B82F6", "colaborador": "#10B981", "cliente": "#F59E0B" } }
};

export const AdvancedReports = () => {
  const { token } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => fetchDashboardStats(token),
    enabled: !!token,
  });

  const [chartType, setChartType] = useState<keyof typeof CHART_CONFIGS>('tasksByStatus');

  const chartData = useMemo(() => {
    if (!data || !data[chartType]) return [];
    const sourceData = data[chartType];
    return Object.entries(sourceData).map(([name, value]) => ({
      name,
      value: value as number,
      fill: CHART_CONFIGS[chartType].colors[name] || '#8884d8',
    }));
  }, [data, chartType]);

  const handleExport = () => {
    const doc = new jsPDF();
    const chartTitle = CHART_CONFIGS[chartType].label;
    
    doc.text(chartTitle, 14, 16);
    
    autoTable(doc, {
      startY: 22,
      head: [['Categoría', 'Valor']],
      body: chartData.map(d => [d.name, d.value]),
    });

    doc.save(`reporte_${chartType}.pdf`);
  };

  if (error) return <div>Error al cargar los datos del gráfico.</div>;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-red-600" />
          Reportes Avanzados
        </CardTitle>
        <div className="flex gap-2">
          <Select value={chartType} onValueChange={(value) => setChartType(value as keyof typeof CHART_CONFIGS)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar reporte" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CHART_CONFIGS).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isLoading || chartData.length === 0}>
            <Download className="h-4 w-4 mr-1" />
            Exportar PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center py-6">
        {isLoading ? (
          <div>Cargando...</div>
        ) : (
          <ChartContainer config={{}} className="w-full h-full">
            <ReBarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ left: 10, top: 10, right: 50, bottom: 10 }} // Añadir margen superior e inferior
              barCategoryGap="20%" // Espacio entre categorías de barras
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                hide // Ocultamos el eje Y, las etiquetas estarán en las barras
              />
              <XAxis type="number" hide />
              <Bar dataKey="value" layout="vertical" radius={5} fill="var(--color-desktop)">
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-background"
                  fontSize={12}
                />
                <LabelList
                  dataKey="value"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </ReBarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};