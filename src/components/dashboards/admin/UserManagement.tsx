
import { useState } from 'react';
import { Users, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for recent users
  const recentUsers = [
    { id: '1', name: 'Ana García', role: 'Manager', status: 'active', lastLogin: '2 min ago' },
    { id: '2', name: 'Carlos López', role: 'Collaborator', status: 'active', lastLogin: '1 hour ago' },
    { id: '3', name: 'María Rodríguez', role: 'Client', status: 'inactive', lastLogin: '2 days ago' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-red-600" />
          Gestión de Usuarios
        </CardTitle>
        <Button size="sm" className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-1" />
          Nuevo
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Buscar usuarios..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Recent Users */}
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  <span className="text-xs text-gray-500">{user.lastLogin}</span>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            Ver Todos los Usuarios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
