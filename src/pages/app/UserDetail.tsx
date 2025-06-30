// src/pages/app/UserDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchUser = async (id: string, token: string | null) => {
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id!, token),
    enabled: !!id && !!token,
  });

  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div>Error fetching user</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>{user?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <p>Department: {user?.department}</p>
          <p>Company: {user?.company}</p>
        </CardContent>
      </Card>
    </div>
  );
};
