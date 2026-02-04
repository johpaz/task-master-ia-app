import { ListTodo, CheckCircle, Clock, Zap, Activity, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '../../../../components/ui/skeleton';

interface ClientStatsProps {
    stats: any;
    isLoading: boolean;
}

export const ClientStats = ({ stats, isLoading }: ClientStatsProps) => {
    const meta = [
        {
            title: 'Total Solicitudes',
            value: stats?.totalTasks,
            icon: ListTodo,
            color: 'from-blue-500 to-indigo-500',
            description: 'Histórico global',
            shadow: 'shadow-blue-500/20'
        },
        {
            title: 'Implementadas',
            value: stats?.completedTasks,
            icon: CheckCircle,
            color: 'from-emerald-500 to-teal-500',
            description: 'Protocolos finalizados',
            shadow: 'shadow-emerald-500/20'
        },
        {
            title: 'En Proceso',
            value: stats?.pendingTasks,
            icon: Clock,
            color: 'from-amber-500 to-orange-500',
            description: 'En cola de ejecución',
            shadow: 'shadow-amber-500/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-40 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6">
                        <Skeleton className="h-full w-full bg-white/5 rounded-2xl" />
                    </div>
                ))
            ) : (
                meta.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group relative h-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 bg-blue-500/10" />

                        <div className="h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden relative">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />

                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-4 rounded-[1.5rem] bg-gradient-to-br ${item.color} ${item.shadow} text-white`}>
                                    <item.icon size={28} />
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-4xl font-black text-white tracking-tighter">{item.value || 0}</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{item.description}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '75%' }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                        className={`h-full bg-gradient-to-r ${item.color}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    );
};
