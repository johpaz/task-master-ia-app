import { Folder, Calendar, Users, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectOverview = () => {
    const projects = [
        {
            id: '1',
            name: 'Sistema E-commerce',
            status: 'en_progreso',
            progress: 75,
            team: 5,
            deadline: '2024-01-15',
            color: 'from-purple-500 to-indigo-600'
        },
        {
            id: '2',
            name: 'App Móvil IA',
            status: 'revision',
            progress: 90,
            team: 3,
            deadline: '2024-01-20',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            id: '3',
            name: 'Dashboard Analytics',
            status: 'pendiente',
            progress: 25,
            team: 4,
            deadline: '2024-02-01',
            color: 'from-amber-500 to-orange-600'
        }
    ];

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'en_progreso': return { label: 'PROCESANDO', color: 'text-purple-400 bg-purple-400/10' };
            case 'revision': return { label: 'VALIDACIÓN', color: 'text-blue-400 bg-blue-400/10' };
            case 'pendiente': return { label: 'BUFFER', color: 'text-slate-400 bg-slate-400/10' };
            default: return { label: 'DESCONOCIDO', color: 'text-slate-400 bg-slate-400/10' };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 h-full"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-600/20 rounded-2xl border border-purple-500/20">
                        <Folder className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Células de Proyecto</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monitoreo de clusters operativos</p>
                    </div>
                </div>
                <Activity className="text-purple-500/50 animate-pulse" />
            </div>

            <div className="space-y-4">
                {projects.map((project, index) => {
                    const status = getStatusDisplay(project.status);
                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/5 rounded-3xl p-5 hover:bg-white/[0.08] transition-all group cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-lg`}>
                                        <span className="font-black text-lg">{project.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white tracking-tight uppercase group-hover:text-purple-400 transition-colors">{project.name}</h4>
                                        <div className="flex items-center space-x-3 mt-1">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border border-white/5 ${status.color}`}>
                                                {status.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-black text-white">{project.progress}%</span>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Sincronización</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.progress}%` }}
                                        className={`h-full bg-gradient-to-r ${project.color}`}
                                    />
                                </div>

                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <Users className="h-3 w-3 mr-1 text-purple-500" />
                                            {project.team} Operadores
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1 text-blue-500" />
                                            {new Date(project.deadline).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};
