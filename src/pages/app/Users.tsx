
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'collaborator' | 'client';
  department?: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
  tasksAssigned: number;
  createdAt: Date;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    email: 'admin@tuprofedeai.com',
    role: 'admin',
    department: 'Dirección General',
    status: 'active',
    lastLogin: new Date('2024-05-30'),
    tasksAssigned: 5,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Ana García',
    email: 'manager@tuprofedeai.com',
    role: 'manager',
    department: 'Desarrollo',
    status: 'active',
    lastLogin: new Date('2024-05-30'),
    tasksAssigned: 12,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Miguel Santos',
    email: 'dev@tuprofedeai.com',
    role: 'collaborator',
    department: 'Desarrollo',
    status: 'active',
    lastLogin: new Date('2024-05-29'),
    tasksAssigned: 8,
    createdAt: new Date('2024-02-15')
  },
  {
    id: '4',
    name: 'Laura Martínez',
    email: 'cliente@empresa.com',
    role: 'client',
    status: 'active',
    lastLogin: new Date('2024-05-28'),
    tasksAssigned: 3,
    createdAt: new Date('2024-03-01')
  },
  {
    id: '5',
    name: 'Pedro González',
    email: 'pedro@tuprofedeai.com',
    role: 'collaborator',
    department: 'Soporte',
    status: 'inactive',
    lastLogin: new Date('2024-05-20'),
    tasksAssigned: 0,
    createdAt: new Date('2024-01-20')
  }
];

const roleColors = {
  admin: 'bg-purple-100 text-purple-800',
  manager: 'bg-blue-100 text-blue-800',
  collaborator: 'bg-green-100 text-green-800',
  client: 'bg-orange-100 text-orange-800'
};

const roleLabels = {
  admin: 'Administrador',
  manager: 'Manager',
  collaborator: 'Colaborador',
  client: 'Cliente'
};

export const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = !selectedStatus || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = (userId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios y sus permisos en el sistema</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Administradores</p>
                <p className="text-3xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-3xl font-bold text-orange-600">
                  {users.filter(u => u.role === 'client').length}
                </p>
              </div>
              <UserPlus className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="manager">Manager</option>
              <option value="collaborator">Colaborador</option>
              <option value="client">Cliente</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>

            <Button variant="outline">
              Exportar Lista
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Usuario</th>
                  <th className="text-left py-3 px-4">Rol</th>
                  <th className="text-left py-3 px-4">Departamento</th>
                  <th className="text-center py-3 px-4">Estado</th>
                  <th className="text-center py-3 px-4">Tareas</th>
                  <th className="text-center py-3 px-4">Último Acceso</th>
                  <th className="text-center py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={roleColors[user.role]} variant="secondary">
                        {roleLabels[user.role]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {user.department || '-'}
                    </td>
                    <td className="text-center py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`px-2 py-1 rounded text-sm ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="text-center py-3 px-4">{user.tasksAssigned}</td>
                    <td className="text-center py-3 px-4 text-sm text-gray-600">
                      {user.lastLogin.toLocaleDateString()}
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron usuarios</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
