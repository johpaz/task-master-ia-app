// src/components/dashboard/TaskTable.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

type TasksResponse = {
  data: Task[];
  total: number;
  page: number;
  pageSize: number;
};

const fetchTasks = async (token: string | null, status: string): Promise<TasksResponse> => {
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_BASE_URL}/tasks?status=${status}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const TaskTable: React.FC = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<TasksResponse>({
    queryKey: ['tasks', 'non-completed'],
    queryFn: () => fetchTasks(token, 'non-completed'),
    enabled: !!token,
  });

  if (isLoading) return <div className="p-4">Cargando tareas...</div>;
  if (error) return <div className="p-4 text-red-500">Error al obtener las tareas</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data?.data.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No hay tareas pendientes.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
