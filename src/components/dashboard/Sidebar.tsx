
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
    name: 'Todas las Tareas',
    href: '/all-tasks',
    icon: CheckSquare,
    roles: ['admin']
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

const getDashboardPath = (role: string | undefined) => {
  if (!role) return '/dashboard';
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'manager':
      return '/manager/dashboard';
    case 'collaborator':
      return '/collaborator/dashboard';
    case 'client':
      return '/client/dashboard';
    default:
      return '/dashboard';
  }
};

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const dashboardPath = getDashboardPath(user?.role);

  const filteredItems = navigationItems.map(item => {
    if (item.name === 'Dashboard') {
      return { ...item, href: dashboardPath };
    }
    return item;
  }).filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
         
           <img
              src="/logoDash.png"
              alt="Logo"
              className="w-16 h-16 rounded-full"
            />
         
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">TaskMaster IA</h1>
            <p className="text-sm text-muted-foreground">Tu Profe de IA</p>
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
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user?.avatar || '/api/placeholder/40/40'}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};
