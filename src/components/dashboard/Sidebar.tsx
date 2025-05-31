
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/button';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'manager', 'collaborator', 'client']
  },
  {
    name: 'Tareas',
    href: '/tasks',
    icon: CheckSquare,
    roles: ['admin', 'manager', 'collaborator', 'client']
  },
  {
    name: 'Kanban',
    href: '/kanban',
    icon: LayoutDashboard,
    roles: ['admin', 'manager', 'collaborator']
  },
  {
    name: 'Calendario',
    href: '/calendar',
    icon: Calendar,
    roles: ['admin', 'manager', 'collaborator']
  },
  {
    name: 'Reportes',
    href: '/reports',
    icon: BarChart,
    roles: ['admin', 'manager']
  },
  {
    name: 'Usuarios',
    href: '/users',
    icon: Users,
    roles: ['admin']
  },
  {
    name: 'Configuración',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'manager', 'collaborator', 'client']
  }
];

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TaskMaster IA</h1>
            <p className="text-sm text-gray-500">Tu Profe de IA</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user?.avatar || '/api/placeholder/40/40'}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};
