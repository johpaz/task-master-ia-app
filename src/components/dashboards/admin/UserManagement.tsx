
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Skeleton } from '../../ui/skeleton';
import { useUserModalStore } from '../../../stores/userModalStore';
import { userService } from '../../../services/userService';
import { User } from '../../../types';

export const UserManagement = () => {
  const navigate = useNavigate();
  const { openModal } = useUserModalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getUsers();
        const sortedUsers = response.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentUsers(sortedUsers.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch recent users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUsers();
  }, []);

  const filteredUsers = recentUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-red-600" />
          Gestión de Usuarios
        </CardTitle>
        <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => openModal()}>
          <Plus className="h-4 w-4 mr-1" />
          Nuevo
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Buscar usuarios recientes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <Button variant="outline" className="w-full" onClick={() => navigate('/users')}>
            Ver Todos los Usuarios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
