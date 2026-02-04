import {
    Users,
    UserCog,
    UserRound,
    Building,
    ClipboardList,
    Activity,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchDashboardStats = async (token: string | null) => {
    if (!token) throw new Error('No authentication token found');
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const SystemMetrics = () => {
    const { token } = useAuthStore();
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => fetchDashboardStats(token),
        enabled: !!token,
        refetchInterval: 30000, // Sync every 30 seconds
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-32 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) return <div className="text-red-400 font-bold p-4 bg-red-400/10 rounded-2xl border border-red-400/20">Error al cargar métricas de ingeniería.</div>;

    const statCards = [
        {
            title: 'Total Tareas',
            value: data?.totalTasks ?? 0,
            icon: ClipboardList,
            gradient: 'from-blue-600 to-indigo-600',
            shadow: 'shadow-blue-500/20'
        },
        {
            title: 'Administradores',
            value: data?.usersByRole?.admin ?? 0,
            icon: ShieldCheck,
            gradient: 'from-purple-600 to-violet-600',
            shadow: 'shadow-purple-500/20'
        },
        {
            title: 'Colaboradores',
            value: data?.usersByRole?.collaborator ?? 0,
            icon: UserRound,
            gradient: 'from-amber-500 to-orange-600',
            shadow: 'shadow-amber-500/20'
        },
        {
            title: 'Clientes Activos',
            value: data?.usersByRole?.client ?? 0,
            icon: Building,
            gradient: 'from-emerald-500 to-teal-600',
            shadow: 'shadow-emerald-500/20'
        },
        {
            title: 'Total Usuarios',
            value: data?.totalUsers ?? 0,
            icon: Users,
            gradient: 'from-rose-500 to-pink-600',
            shadow: 'shadow-rose-500/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {statCards.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-6 rounded-[2rem] relative overflow-hidden group transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
                >
                    {/* Subtle background glow */}
                    <div className={`absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} ${stat.shadow} shadow-lg text-white transform group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={20} className="font-bold" />
                            </div>
                            <div className="flex items-center space-x-1 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <TrendingUp size={14} />
                                <span className="text-[10px] font-black uppercase tracking-tighter">Live</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 group-hover:text-slate-400 transition-colors">
                                {stat.title}
                            </p>
                            <div className="flex items-baseline space-x-2">
                                <h3 className="text-3xl font-black text-white tracking-tighter">
                                    {stat.value}
                                </h3>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Internal replacement for missing icon during generation
const ShieldCheck = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
);
