import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { motion } from 'framer-motion';
import { SystemMetrics } from './components/SystemMetrics';
import { AdvancedReports } from './components/AdvancedReports';
import { QuickActions } from './components/QuickActions';
import { UserManagement as UserList } from './components/UserManagement';
import { TaskTable } from '@/components/dashboard/TaskTable';
import { AdminAlerts } from './components/AdminAlerts';
import { Terminal, Shield, Activity, Monitor } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const { user } = useAuthStore();

    return (
        <div className="min-h-screen bg-slate-950/20 p-4 sm:p-6 lg:p-10 space-y-10 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header / Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-blue-500 font-black text-xs tracking-[0.4em] uppercase">
                        <Shield size={16} />
                        <span>Root Access Protocol v4.0</span>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            Admin <span className="text-slate-500">Dashboard</span>
                        </h1>
                        <p className="text-slate-400 font-semibold tracking-tight text-lg">
                            Bienvenido a la consola central, <span className="text-blue-400">{user?.name}</span>. Todos los sistemas nominales.
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/[0.03] backdrop-blur-xl border border-white/5 p-4 rounded-[1.5rem] shadow-xl">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Activity size={24} className="animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Status Global</p>
                        <p className="text-sm font-black text-white leading-none">99.9% Up-time</p>
                    </div>
                </div>
            </motion.div>

            {/* Top Layer: Global Metrics */}
            <div className="relative z-10">
                <SystemMetrics />
            </div>

            {/* Mid Layer: Main Operations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Reports Section (Large) */}
                <div className="lg:col-span-2">
                    <AdvancedReports />
                </div>

                {/* Side Actions (Compact) */}
                <div className="flex flex-col gap-8">
                    <AdminAlerts />
                    <QuickActions />
                    <UserList />
                </div>
            </div>

            {/* Bottom Layer: Live Execution Feed (Tasks) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10 bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 overflow-hidden hover:bg-white/[0.03] transition-all duration-700 hover:border-white/10"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <div className="flex items-center space-x-3 text-blue-400 mb-1">
                            <Monitor size={18} className="font-bold" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Execution Feed</span>
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">Registro de Operaciones Globales</h3>
                    </div>
                    <button className="text-xs font-black text-slate-500 hover:text-white transition-colors tracking-widest uppercase bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        Ver Historial Completo
                    </button>
                </div>

                <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-slate-950/40">
                    <TaskTable />
                </div>
            </motion.div>
        </div>
    );
};
