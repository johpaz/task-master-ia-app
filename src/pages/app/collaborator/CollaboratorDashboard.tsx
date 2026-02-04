import { motion } from 'framer-motion';
import { useAuthStore } from '../../../stores/authStore';
import { useTaskStore } from '../../../stores/taskStore';
import { PersonalMetrics } from './components/PersonalMetrics';
import { PersonalTasks } from './components/PersonalTasks';
import { TimeTracking } from './components/TimeTracking';
import { PersonalCalendar } from './components/PersonalCalendar';
import { Cpu, Zap, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export const CollaboratorDashboard = () => {
    const { user } = useAuthStore();
    const { tasks } = useTaskStore();

    // In a real app, you'd filter for specifically the current user's tasks
    const myTasks = tasks.filter(t => t.collaboratorId === user?.id || !t.collaboratorId);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10 pb-12"
        >
            {/* Focus Node Header */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 border border-white/5 p-10 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-50%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Active Developer Protocol</span>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
                                Focus <span className="text-emerald-500">Node</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium tracking-tight">
                                Bienvenido, <span className="text-white font-black">{user?.name?.split(' ')[0]}</span>. Enfoque optimizado detectado.
                            </p>
                        </div>

                        <div className="flex items-center space-x-6 pt-2">
                            <div className="flex items-center space-x-2 text-emerald-500/60 uppercase text-[10px] font-black tracking-widest">
                                <Terminal size={14} />
                                <span>Latencia: 14ms</span>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-500/60 uppercase text-[10px] font-black tracking-widest">
                                <Zap size={14} />
                                <span>Uptime: 99.9%</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 hover:border-emerald-500/30 group">
                            <Cpu size={80} className="text-emerald-500 opacity-20 absolute -top-4 -right-4 group-hover:rotate-12 transition-transform" />
                            <div className="relative z-10 space-y-4">
                                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
                                    <Sparkles className="text-white h-8 w-8" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Deep Work State</p>
                                    <p className="text-xl font-black text-white tracking-tight uppercase">Sincronización OK</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Core */}
            <PersonalMetrics tasks={myTasks} />

            {/* Operations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <PersonalTasks tasks={myTasks} />
                </div>
                <div className="space-y-10">
                    <TimeTracking />
                    <PersonalCalendar />
                </div>
            </div>
        </motion.div>
    );
};
