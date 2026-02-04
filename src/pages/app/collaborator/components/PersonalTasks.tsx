import { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, Eye, Filter, Zap, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../../components/ui/button';
import { Task } from '../../../../types';

interface PersonalTasksProps {
    tasks: Task[];
}

const statusLabels = {
    pendiente: 'PENDIENTE',
    en_progreso: 'EN PROCESO',
    revision: 'REVISIÓN',
    completada: 'COMPLETADA',
    cancelada: 'CANCELADA'
};

const statusGradients = {
    pendiente: 'from-slate-500 to-slate-600',
    en_progreso: 'from-blue-500 to-indigo-600',
    revision: 'from-purple-500 to-pink-600',
    completada: 'from-emerald-500 to-teal-600',
    cancelada: 'from-rose-500 to-red-600'
};

export const PersonalTasks = ({ tasks }: PersonalTasksProps) => {
    const [filter, setFilter] = useState<string>('all');
    const [view, setView] = useState<'grid' | 'list'>('list');

    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(task => task.status === filter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 lg:p-10"
        >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-6">
                <div className="flex items-center space-x-5">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-[1.5rem] shadow-2xl shadow-emerald-500/5">
                        <CheckSquare className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Queue Operativo</h3>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Gestión de flujo de trabajo personal</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-white/5 p-1 rounded-2xl border border-white/5 flex space-x-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setView('list')}
                            className={`h-10 px-4 rounded-xl transition-all ${view === 'list' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            <List size={16} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setView('grid')}
                            className={`h-10 px-4 rounded-xl transition-all ${view === 'grid' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            <LayoutGrid size={16} />
                        </Button>
                    </div>

                    <div className="h-10 w-[1px] bg-white/10 mx-2 hidden lg:block" />

                    <div className="flex flex-wrap gap-2">
                        {['all', 'en_progreso', 'revision', 'completada'].map((status) => (
                            <Button
                                key={status}
                                variant="ghost"
                                size="sm"
                                onClick={() => setFilter(status)}
                                className={`h-10 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${filter === status ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-white border border-transparent'}`}
                            >
                                {status === 'all' ? 'Ver Todos' : statusLabels[status as keyof typeof statusLabels]}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                <AnimatePresence mode="popLayout">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all group relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${statusGradients[task.status as keyof typeof statusGradients]} flex items-center justify-center text-white shadow-lg`}>
                                                <Zap size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white tracking-tight uppercase group-hover:text-emerald-400 transition-colors">{task.title}</h4>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID: {String(task.id).slice(0, 8)}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 hover:bg-emerald-600 hover:text-white transition-all">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors">
                                        {task.description}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                                        <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <div className="flex items-center">
                                                <Clock className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                                                {new Date(task.endDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                <Zap className="h-3.5 w-3.5 mr-2 text-blue-500" />
                                                {task.estimatedHours}H Ciclos
                                            </div>
                                        </div>

                                        <div className={`text-[10px] font-black px-3 py-1 rounded-xl bg-gradient-to-r ${statusGradients[task.status as keyof typeof statusGradients]} text-white shadow-lg`}>
                                            {statusLabels[task.status as keyof typeof statusLabels]}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-24 text-center space-y-6"
                        >
                            <div className="inline-flex p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                                <CheckSquare className="h-16 w-16 text-slate-700" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Fila Vaciada</h3>
                                <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.3em]">No hay protocolos de tarea pendientes en este nodo.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
