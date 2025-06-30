// src/components/dashboard/UserTable.tsx
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

const fetchUsers = async (token: string | null) => {
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_BASE_URL}/users`, {
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

import { User } from '../../types';

// ...

export const UserTable: React.FC = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetchUsers(token),
    enabled: !!token,
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/users/${user.id}`)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
