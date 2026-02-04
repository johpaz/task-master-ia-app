
import { useEffect } from 'react';
import { Bell, ShieldCheck, Activity, UserCircle } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { motion } from 'framer-motion';

export const TopBar = () => {
  const { user } = useAuthStore();
  const { notifications, unreadCount, fetchNotifications, markAsRead } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buen día';
    if (hour < 18) return 'Hola';
    return 'Buenas noches';
  };

  return (
    <header className="bg-white/[0.01] backdrop-blur-3xl border-b border-white/5 px-8 py-6 relative z-40">
      <div className="flex items-center justify-between">
        {/* User Context */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          <div className="hidden md:flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 shadow-xl">
            <Activity size={18} className="text-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Online</span>
          </div>

          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter leading-none mb-1">
              {getGreeting()}, <span className="text-blue-500">{user?.name?.split(' ')[0]}</span>
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Authorized Session: <span className="text-slate-300">Level 01</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Global Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-slate-300">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black rounded-lg w-5 h-5 flex items-center justify-center shadow-lg shadow-red-500/20 border-2 border-slate-950">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-slate-900/90 backdrop-blur-2xl border-white/10 p-4 rounded-[2rem] shadow-2xl">
              <DropdownMenuLabel className="text-sm font-black text-white px-2 mb-2 uppercase tracking-widest">Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <div className="space-y-1 max-h-[300px] overflow-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      onSelect={() => markAsRead(notification.id)}
                      className={`group flex items-start gap-4 p-4 rounded-xl transition-all ${notification.isRead === "0" ? 'bg-white/5' : 'bg-transparent'} hover:bg-white/10 focus:bg-white/10 cursor-pointer`}
                    >
                      <div className="flex-shrink-0 pt-1">
                        <div className={`h-2 w-2 rounded-full ${notification.isRead === "0" ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-slate-700'}`}></div>
                      </div>
                      <div className="flex-grow space-y-1">
                        <p className="text-[13px] font-bold text-slate-200 leading-snug">{notification.message}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-slate-600 font-black text-xs uppercase tracking-widest">Sin alertas</p>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
