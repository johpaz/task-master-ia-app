import {
    Settings,
    Database,
    Shield,
    FileText,
    Users,
    BarChart,
    Zap,
    Terminal,
    Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const QuickActions = () => {
    const navigate = useNavigate();

    const handleDatabaseClick = () => {
        alert("Para ver la base de datos, ejecuta 'bun run db:studio' en la terminal del backend y abre tu navegador en http://localhost:5555");
    };

    const actions = [
        {
            icon: Users,
            label: 'Staff Core',
            desc: 'Usuarios & Permisos',
            color: 'text-blue-400',
            gradient: 'from-blue-600/10 to-blue-400/5',
            action: () => navigate('/users')
        },
        {
            icon: Activity,
            label: 'Logs',
            desc: 'Actividad de Red',
            color: 'text-amber-400',
            gradient: 'from-amber-600/10 to-amber-400/5',
            action: () => navigate('/logs')
        },
        {
            icon: Database,
            label: 'Storage',
            desc: 'Prisma Studio',
            color: 'text-emerald-400',
            gradient: 'from-emerald-600/10 to-emerald-400/5',
            action: handleDatabaseClick
        },
        {
            icon: Shield,
            label: 'Seguridad',
            desc: 'Protocolos SSL',
            color: 'text-rose-400',
            gradient: 'from-rose-600/10 to-rose-400/5',
            action: () => navigate('/settings?tab=security')
        },
        {
            icon: Terminal,
            label: 'Engine',
            desc: 'Configuración',
            color: 'text-slate-400',
            gradient: 'from-slate-600/10 to-slate-400/5',
            action: () => navigate('/settings')
        },
        {
            icon: BarChart,
            label: 'Analytics',
            desc: 'Performance',
            color: 'text-violet-400',
            gradient: 'from-violet-600/10 to-violet-400/5',
            action: () => navigate('/reports')
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 h-full relative overflow-hidden"
        >
            <div className="relative z-10 mb-8 flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center space-x-3 text-amber-400 mb-1">
                        <Zap size={18} className="fill-amber-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Fast Access</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">Acciones Rápidas</h3>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {actions.map((action, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={action.action}
                        className={`group relative overflow-hidden bg-gradient-to-br ${action.gradient} border border-white/5 p-5 rounded-2xl flex flex-col items-start gap-4 transition-all duration-300 hover:border-white/20`}
                    >
                        <div className={`p-2.5 rounded-xl bg-slate-900 group-hover:scale-110 transition-transform duration-500`}>
                            <action.icon className={`h-5 w-5 ${action.color}`} />
                        </div>
                        <div className="text-left space-y-0.5">
                            <span className="text-xs font-black text-white block tracking-tight uppercase">{action.label}</span>
                            <span className="text-[10px] font-bold text-slate-500 block truncate">{action.desc}</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};
