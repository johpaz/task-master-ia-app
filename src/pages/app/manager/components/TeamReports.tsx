import { BarChart as BarChartIcon, Download, TrendingUp, Users, Activity, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button';

export const TeamReports = () => {
    const teamPerformance = [
        { name: 'Ana García', tasksCompleted: 12, efficiency: 95, hours: 38, progress: 95 },
        { name: 'Carlos López', tasksCompleted: 8, efficiency: 88, hours: 42, progress: 85 },
        { name: 'María Rodríguez', tasksCompleted: 15, efficiency: 92, hours: 40, progress: 92 },
        { name: 'Pedro Martín', tasksCompleted: 10, efficiency: 85, hours: 35, progress: 80 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 mt-8"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                <div className="flex items-center space-x-6">
                    <div className="p-4 bg-indigo-600/20 rounded-[1.5rem] border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
                        <BarChartIcon className="h-8 w-8 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Telemetría de Equipo</h3>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Análisis de eficiencia y throughput global</p>
                    </div>
                </div>
                <div className="flex space-x-3 w-full md:w-auto">
                    <Button variant="ghost" className="flex-1 md:flex-none h-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 font-black text-xs uppercase tracking-widest transition-all">
                        <TrendingUp size={16} className="mr-2 text-indigo-500" />
                        Live Feed
                    </Button>
                    <Button className="flex-1 md:flex-none h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                        <Download size={16} className="mr-2" />
                        Reporte de Carga
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Performance Visualization Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity size={100} className="text-indigo-500" />
                        </div>

                        <div className="relative space-y-8">
                            {teamPerformance.map((member, index) => (
                                <div key={index} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-indigo-400 border border-white/5">
                                                {member.name.charAt(0)}
                                            </div>
                                            <span className="font-black text-white text-sm uppercase tracking-tight">{member.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{member.tasksCompleted} Tareas / {member.hours}H</span>
                                            <span className={`text-xs font-black ${member.efficiency >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {member.efficiency}% EFIC
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${member.progress}%` }}
                                            transition={{ duration: 1.5, delay: index * 0.2 }}
                                            className={`h-full bg-gradient-to-r ${member.efficiency >= 90 ? 'from-indigo-500 to-purple-600' : 'from-amber-500 to-orange-600'}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Global Stats Panel */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-60">Status de Operación</h4>

                        <div className="space-y-8 relative">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter">94.2%</p>
                                    <p className="text-[10px] font-bold uppercase opacity-60 mt-1 uppercase tracking-widest">SLA Cumplimiento</p>
                                </div>
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <TrendingUp size={24} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter">128H</p>
                                    <p className="text-[10px] font-bold uppercase opacity-60 mt-1 uppercase tracking-widest">Esfuerzo Mensual</p>
                                </div>
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <Clock size={24} />
                                </div>
                            </div>

                            <Button variant="ghost" className="w-full h-14 bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest mt-4">
                                Ver Detalles
                                <ExternalLink size={16} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Clock = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);
