import { Calendar as CalendarIcon, Clock, AlertCircle, ChevronRight, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button';

export const PersonalCalendar = () => {
    const upcomingDeadlines = [
        {
            id: '1',
            title: 'Entrega módulo de pagos',
            date: '2024-01-08',
            time: '17:00',
            priority: 'alta'
        },
        {
            id: '2',
            title: 'Revisión de código',
            date: '2024-01-10',
            time: '10:00',
            priority: 'media'
        },
        {
            id: '3',
            title: 'Reunión de equipo',
            date: '2024-01-12',
            time: '14:00',
            priority: 'baja'
        }
    ];

    const getPriorityTheme = (priority: string) => {
        switch (priority) {
            case 'alta': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
            case 'media': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
            case 'baja': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
            default: return 'text-slate-400 border-white/5 bg-white/5';
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
                    <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <CalendarIcon className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Cronología Core</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hitos y deadlines próximos</p>
                    </div>
                </div>
                <Bell className="text-slate-500 hover:text-emerald-500 transition-colors cursor-pointer" size={20} />
            </div>

            <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => {
                    const theme = getPriorityTheme(deadline.priority);
                    return (
                        <motion.div
                            key={deadline.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-3xl p-5 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <AlertCircle size={40} className={deadline.priority === 'alta' ? 'text-rose-500' : 'text-slate-500'} />
                            </div>

                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="space-y-1">
                                    <div className={`inline-flex px-2 py-0.5 rounded-lg border font-black text-[9px] uppercase tracking-widest ${theme}`}>
                                        Priority: {deadline.priority}
                                    </div>
                                    <h4 className="font-black text-white text-sm uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                                        {deadline.title}
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <div className="flex items-center">
                                        <CalendarIcon className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                                        {new Date(deadline.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-3.5 w-3.5 mr-2 text-blue-500" />
                                        {deadline.time}
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <Button variant="ghost" className="w-full h-12 mt-6 bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all">
                Ver Agenda Completa
            </Button>
        </motion.div>
    );
};
