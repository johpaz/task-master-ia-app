import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { Badge } from '../../../../components/ui/badge';
import { Skeleton } from '../../../../components/ui/skeleton';
import { Task } from '../../../../types';
import { motion } from 'framer-motion';
import { ExternalLink, Database, Activity, Calendar } from 'lucide-react';

interface RecentRequestsProps {
    tasks: Task[];
    isLoading: boolean;
}

const statusThemes: Record<string, string> = {
    completada: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
    en_progreso: 'text-blue-400 bg-blue-400/10 border-blue-500/20',
    'en revisión': 'text-purple-400 bg-purple-400/10 border-purple-500/20',
    pendiente: 'text-slate-400 bg-slate-400/10 border-white/5',
    cancelada: 'text-rose-400 bg-rose-400/10 border-rose-500/20'
};

export const RecentRequests = ({ tasks, isLoading }: RecentRequestsProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 overflow-hidden relative"
        >
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-5">
                    <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                        <Database className="h-7 w-7 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Historial de Protocolos</h3>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Sincronización de solicitudes recientes</p>
                    </div>
                </div>
                <Activity className="text-blue-500/30 animate-pulse" />
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-slate-500 font-bold uppercase tracking-widest text-[10px] pb-6">Protocolo / Título</TableHead>
                            <TableHead className="text-slate-500 font-bold uppercase tracking-widest text-[10px] pb-6">Estado Activo</TableHead>
                            <TableHead className="text-slate-500 font-bold uppercase tracking-widest text-[10px] pb-6">Prioridad</TableHead>
                            <TableHead className="text-slate-500 font-bold uppercase tracking-widest text-[10px] pb-6">Registro</TableHead>
                            <TableHead className="text-right text-slate-500 font-bold uppercase tracking-widest text-[10px] pb-6">Acción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i} className="border-white/5">
                                    <TableCell><Skeleton className="h-6 w-48 bg-white/5" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 bg-white/5" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20 bg-white/5" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-28 bg-white/5" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto bg-white/5 rounded-lg" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            tasks.map((task: Task) => (
                                <TableRow key={task.id} className="border-white/5 hover:bg-white/[0.02] group transition-colors">
                                    <TableCell className="py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{task.title}</span>
                                            <span className="text-[10px] text-slate-600 font-mono mt-0.5">#{String(task.id).slice(0, 12)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`inline-flex px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusThemes[task.status] || statusThemes.pendiente}`}>
                                            {task.status}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`text-[10px] font-bold uppercase tracking-widest ${task.priority === 'alta' || task.priority === 'urgente' ? 'text-rose-500' : 'text-slate-500'}`}>
                                            {task.priority}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                                            <Calendar size={12} className="mr-2 text-blue-500/50" />
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
                                            <ExternalLink size={16} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};
