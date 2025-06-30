import { useQuery } from '@tanstack/react-query';
import { Plus, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '../../stores/authStore';
import { dashboardService } from '../../services/dashboardService';
import { taskService } from '../../services/taskService';
import { useTaskModalStore } from '../../stores/taskModalStore';
import { Task } from '../../types';

export const ClientDashboard: React.FC = () => {
  const { openModal } = useTaskModalStore();
  const { token } = useAuthStore();

  // Consulta para las estadísticas
  const { data: statsData, isLoading: isLoadingStats, error: statsError } = useQuery({
    queryKey: ['clientDashboardStats', token],
    queryFn: () => dashboardService.getClientDashboardStats(token),
    enabled: !!token,
  });

  // Nueva consulta para la lista de tareas
  const { data: tasksData, isLoading: isLoadingTasks, error: tasksError } = useQuery({
    queryKey: ['myTasks', token],
    queryFn: () => taskService.getMyTasks(token),
    enabled: !!token,
  });

  if (statsError || tasksError) return <div>Error al cargar el dashboard.</div>;

  const recentTasks = tasksData?.tasks?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mis Solicitudes</h1>
        <Button onClick={() => openModal()}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {isLoadingStats ? (
          <>
            <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
            <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
            <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Tareas</CardTitle>
                <ListTodo className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData?.totalTasks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData?.completedTasks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData?.pendingTasks}</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tareas Solicitadas Recientemente</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Fecha de Solicitud</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingTasks ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                  </TableRow>
                ))
              ) : (
                recentTasks.map((task: Task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell><Badge variant="outline">{task.status.replace(/_/g, ' ')}</Badge></TableCell>
                    <TableCell><Badge variant={task.priority === 'alta' || task.priority === 'urgente' ? 'destructive' : 'secondary'}>{task.priority}</Badge></TableCell>
                    <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};