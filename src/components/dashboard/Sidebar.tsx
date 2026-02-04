
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

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
    <div className="w-72 bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 flex flex-col h-screen relative z-50 overflow-hidden">
      {/* Decorative vertical gradient */}
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />

      {/* Logo Section */}
      <div className="p-8 mb-4">
        <div className="flex flex-col space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-white/10"
          >
            <img
              src="/logoTaks.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
          </motion.div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tighter">
              Task<span className="text-blue-500">Master</span>
            </h1>
            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              <Shield size={10} className="text-emerald-500" />
              <span>Security Node Active</span>
            </div>
          </div>
        </div>
      </div>

      <p className="px-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Navigation</p>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pb-8">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="relative group block"
            >
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center px-4 py-3.5 rounded-2xl text-[13px] font-black transition-all duration-300 ${isActive
                  ? 'bg-blue-600/10 text-white border border-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                  }`}
              >
                <item.icon size={18} className={`mr-4 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="flex-1 tracking-tight">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  />
                )}
                {!isActive && (
                  <ChevronRight size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Segment */}
      <div className="p-6 mt-auto">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user?.avatar || '/api/placeholder/40/40'}
                alt={user?.name}
                className="w-12 h-12 rounded-2xl border border-white/10 p-0.5"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white truncate tracking-tight uppercase">
                {user?.name?.split(' ')[0]}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {user?.role}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full h-12 justify-center rounded-xl text-slate-500 hover:text-white hover:bg-rose-600/10 hover:border-rose-600/20 border border-transparent font-black text-xs uppercase tracking-widest transition-all"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
