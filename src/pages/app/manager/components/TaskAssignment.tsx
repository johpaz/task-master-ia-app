import { Plus, User, Calendar, Cpu, Zap, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button';

export const TaskAssignment = () => {
    const pendingAssignments = [
        {
            id: '1',
            title: 'Implementar autenticación',
            priority: 'alta',
            estimatedHours: 8,
            deadline: '2024-01-10',
            difficulty: 4
        },
        {
            id: '2',
            title: 'Diseñar interfaz de usuario',
            priority: 'media',
            estimatedHours: 12,
            deadline: '2024-01-12',
            difficulty: 3
        },
        {
            id: '3',
            title: 'Configurar base de datos',
            priority: 'urgente',
            estimatedHours: 6,
            deadline: '2024-01-08',
            difficulty: 5
        }
    ];

    const getPriorityData = (priority: string) => {
        switch (priority) {
            case 'urgente': return { label: 'CRÍTICO', color: 'from-rose-500 to-red-600', ring: 'ring-rose-500/30' };
            case 'alta': return { label: 'ALTA PRIO', color: 'from-amber-500 to-orange-600', ring: 'ring-amber-500/30' };
            case 'media': return { label: 'ESTÁNDAR', color: 'from-blue-500 to-indigo-600', ring: 'ring-blue-500/30' };
            default: return { label: 'SOLICITUD', color: 'from-slate-500 to-slate-600', ring: 'ring-slate-500/30' };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 h-full"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/20">
                        <Cpu className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Protocolos de Tarea</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Distribución de carga de trabajo</p>
                    </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                    <Plus className="h-3 w-3 mr-2" />
                    Nueva Asignación
                </Button>
            </div>

            <div className="space-y-4">
                {pendingAssignments.map((task, index) => {
                    const prio = getPriorityData(task.priority);
                    return (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/[0.03] border border-white/5 rounded-3xl p-5 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg bg-gradient-to-r ${prio.color} text-white shadow-lg`}>
                                            {prio.label}
                                        </span>
                                        <div className="flex space-x-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-1 h-3 rounded-full ${i < task.difficulty ? 'bg-blue-500' : 'bg-white/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <h4 className="font-black text-white tracking-tight uppercase text-sm group-hover:text-blue-400 transition-colors">{task.title}</h4>
                                </div>
                                <Zap size={16} className="text-blue-500/30 group-hover:text-blue-500 transition-colors" />
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <div className="flex items-center">
                                        <Activity className="h-3 w-3 mr-1.5 text-blue-500" />
                                        {task.estimatedHours}H Ciclos
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-3 w-3 mr-1.5 text-indigo-500" />
                                        {new Date(task.deadline).toLocaleDateString()}
                                    </div>
                                </div>

                                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-slate-400 hover:text-white hover:bg-blue-600 group-hover:bg-blue-600 transition-all font-black text-[9px] uppercase tracking-[0.2em]">
                                    <ArrowUpRight size={12} className="mr-1" />
                                    Asignar
                                </Button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};
