import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { useNotificationStore } from '@/stores/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const AdminAlerts: React.FC = () => {
    const { notifications, unreadCount, fetchNotifications, markAsRead, isLoading } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(() => {
            fetchNotifications();
        }, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const handleMarkAsRead = async (id: string) => {
        await markAsRead(id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 h-full relative overflow-hidden flex flex-col"
        >
            <div className="relative z-10 mb-6 flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center space-x-3 text-blue-400 mb-1">
                        <Bell size={18} className={unreadCount > 0 ? "animate-bounce" : ""} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Alerts</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">Alertas de Operación</h3>
                </div>
                {unreadCount > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-full">
                        {unreadCount} NUEVAS
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 max-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-500 space-y-3">
                            <CheckCircle2 size={40} className="opacity-20" />
                            <p className="text-sm font-semibold italic">Todos los sistemas nominales</p>
                        </div>
                    ) : (
                        notifications.map((notif) => (
                            <motion.div
                                key={notif.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={`group relative p-4 rounded-2xl border transition-all duration-300 ${notif.isRead === "0"
                                        ? "bg-blue-600/10 border-blue-500/20"
                                        : "bg-white/[0.02] border-white/5 opacity-60"
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`mt-1 p-2 rounded-lg ${notif.isRead === "0" ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-500"
                                        }`}>
                                        {notif.type.includes('task') ? <AlertCircle size={16} /> : <Clock size={16} />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-bold text-white leading-snug">
                                            {notif.message}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                                                {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: es })}
                                            </span>
                                            {notif.isRead === "0" && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notif.id)}
                                                    className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors"
                                                >
                                                    Marcar como leído
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
