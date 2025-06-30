// src/pages/app/TaskDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchTask = async (id: string, token: string | null) => {
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => fetchTask(id!, token),
    enabled: !!id && !!token,
  });

  if (isLoading) return <div>Loading task...</div>;
  if (error) return <div>Error fetching task</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>{task?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Description: {task?.description}</p>
          <p>Status: {task?.status}</p>
          <p>Priority: {task?.priority}</p>
        </CardContent>
      </Card>
    </div>
  );
};
