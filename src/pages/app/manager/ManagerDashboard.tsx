import { motion } from 'framer-motion';
import { useAuthStore } from '../../../stores/authStore';
import { useTaskStore } from '../../../stores/taskStore';
import { TeamMetrics } from './components/TeamMetrics';
import { ProjectOverview } from './components/ProjectOverview';
import { TaskAssignment } from './components/TaskAssignment';
import { TeamReports } from './components/TeamReports';
import { Briefcase, Activity, ShieldCheck, Sparkles } from 'lucide-react';

export const ManagerDashboard = () => {
    const { user } = useAuthStore();
    const { getDashboardMetrics } = useTaskStore();
    const metrics = getDashboardMetrics();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10 pb-12"
        >
            {/* Immersive Header */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-white/5 p-10 shadow-2xl">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full">
                            <ShieldCheck size={14} className="text-indigo-500" />
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Management Protocol Active</span>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
                                Manager <span className="text-indigo-500">Node</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium tracking-tight">
                                Bienvenido, <span className="text-white font-black">{user?.name?.split(' ')[0]}</span>. El sistema está operando al 98% de capacidad.
                            </p>
                        </div>

                        <div className="flex items-center space-x-6 pt-2">
                            <div className="flex items-center space-x-2">
                                <Activity size={16} className="text-emerald-500" />
                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Equipo Sincronizado</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Sparkles size={16} className="text-amber-500" />
                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">3 Objetivos Próximos</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Briefcase size={80} className="text-indigo-500 opacity-20 absolute -top-4 -right-4" />
                            <div className="relative z-10 space-y-4">
                                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
                                    <Activity className="text-white h-8 w-8" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Status de Red</p>
                                    <p className="text-xl font-black text-white tracking-tight uppercase">Operación Estable</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Primary Metrics Cluster */}
            <TeamMetrics metrics={metrics} />

            {/* Strategic Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ProjectOverview />
                <TaskAssignment />
            </div>

            {/* Analytical Deep Dive */}
            <TeamReports />
        </motion.div>
    );
};
