import { CheckSquare, Clock, Target, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Task } from '../../../../types';

interface PersonalMetricsProps {
    tasks: Task[];
}

export const PersonalMetrics = ({ tasks }: PersonalMetricsProps) => {
    const completedTasks = tasks.filter(t => t.status === 'completada').length;
    const inProgressTasks = tasks.filter(t => t.status === 'en progreso').length;
    const totalHours = tasks.reduce((sum, task) => sum + (task.actualHours || 0), 0);
    const efficiency = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    const metrics = [
        {
            title: 'Completadas',
            value: completedTasks,
            description: 'Nivel de Proceso',
            icon: CheckSquare,
            color: 'from-emerald-500 to-teal-500',
            shadow: 'shadow-emerald-500/20'
        },
        {
            title: 'En Operación',
            value: inProgressTasks,
            description: 'Estado Activo',
            icon: Clock,
            color: 'from-purple-500 to-indigo-500',
            shadow: 'shadow-purple-500/20'
        },
        {
            title: 'Fuerza Laboral',
            value: `${totalHours}H`,
            description: 'Acumulado Ciclo',
            icon: TrendingUp,
            color: 'from-blue-500 to-cyan-500',
            shadow: 'shadow-blue-500/20'
        },
        {
            title: 'Output Core',
            value: `${efficiency}%`,
            description: 'Throughput',
            icon: Target,
            color: 'from-rose-500 to-pink-500',
            shadow: 'shadow-rose-500/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="relative group h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 bg-emerald-500/10" />

                    <div className="h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />

                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${metric.color} ${metric.shadow} text-white`}>
                                <metric.icon size={24} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-3xl font-black text-white tracking-tighter">{metric.value}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{metric.description}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{metric.title}</p>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: typeof metric.value === 'number' ? '65%' : metric.value }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                    className={`h-full bg-gradient-to-r ${metric.color}`}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
