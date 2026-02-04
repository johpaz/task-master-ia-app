import {
    Users,
    TrendingUp,
    Clock,
    Target,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardMetrics } from '../../../../types';

interface TeamMetricsProps {
    metrics: DashboardMetrics;
}

export const TeamMetrics = ({ metrics }: TeamMetricsProps) => {
    const teamStats = [
        {
            title: 'Miembros Equipo',
            value: 8,
            description: 'Activos en el nodo',
            icon: Users,
            color: 'from-purple-500 to-indigo-500',
            shadow: 'shadow-purple-500/20'
        },
        {
            title: 'Tareas Completadas',
            value: metrics.completedTasks,
            description: 'Ciclo actual',
            icon: TrendingUp,
            color: 'from-emerald-500 to-teal-500',
            shadow: 'shadow-emerald-500/20'
        },
        {
            title: 'En Operación',
            value: metrics.inProgressTasks,
            description: 'Sincronización activa',
            icon: Clock,
            color: 'from-blue-500 to-indigo-500',
            shadow: 'shadow-blue-500/20'
        },
        {
            title: 'Rendimiento Global',
            value: '87%',
            description: 'Eficiencia de red',
            icon: Zap,
            color: 'from-amber-500 to-orange-500',
            shadow: 'shadow-amber-500/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamStats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="relative group h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 bg-purple-500/10" />

                    <div className="h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden relative">
                        {/* Top glass reflection */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />

                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} ${stat.shadow} text-white`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.description}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '70%' }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                    className={`h-full bg-gradient-to-r ${stat.color}`}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
