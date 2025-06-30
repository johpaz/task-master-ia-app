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

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchTasks = async (token: string | null) => {
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

import { useNavigate } from 'react-router-dom';

// ...

import { Task } from '../../types';

// ...

export const TaskTable: React.FC = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { data: tasks, isLoading, error } = useQuery<{ data: Task[] }>({
    queryKey: ['tasks'],
    queryFn: () => fetchTasks(token),
    enabled: !!token,
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error fetching tasks</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.data.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/tasks/${task.id}`)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
