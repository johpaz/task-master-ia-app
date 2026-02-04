import { Play, Pause, Clock, Activity, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button';

export const TimeTracking = () => {
    const todayHours = 6.5;
    const weekHours = 32;
    const isTracking = true;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 h-full relative overflow-hidden group"
        >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] transition-colors duration-1000 ${isTracking ? 'bg-emerald-500/10' : 'bg-rose-500/5'}`} />

            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl border transition-colors ${isTracking ? 'bg-emerald-500/20 border-emerald-500/20' : 'bg-slate-500/20 border-slate-500/20'}`}>
                        <Clock className={`h-6 w-6 ${isTracking ? 'text-emerald-500' : 'text-slate-500'}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Cronógrafo</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sincronización de ciclos</p>
                    </div>
                </div>
                {isTracking && (
                    <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.2 rounded-full border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Tracking Live</span>
                    </div>
                )}
            </div>

            <div className="space-y-10">
                {/* Timer Display */}
                <div className="text-center py-12 bg-white/[0.02] border border-white/5 rounded-[2rem] relative group">
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                    <motion.div
                        animate={isTracking ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`text-6xl font-black font-mono tracking-tighter mb-2 ${isTracking ? 'text-white' : 'text-slate-600'}`}
                    >
                        02:30:45
                    </motion.div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Ciclo de Sesión Actual</p>
                </div>

                {/* Timer Controls */}
                <div className="flex gap-4">
                    <Button
                        className={`flex-1 h-16 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isTracking
                                ? 'bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/20 shadow-rose-500/5'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                            }`}
                    >
                        {isTracking ? (
                            <>
                                <Pause className="h-5 w-5 mr-3 fill-current" />
                                Pausar Ciclo
                            </>
                        ) : (
                            <>
                                <Play className="h-5 w-5 mr-3 fill-current" />
                                Iniciar Ciclo
                            </>
                        )}
                    </Button>
                </div>

                {/* Time Summary Cluster */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Hoy</p>
                        <div className="flex items-end space-x-2">
                            <span className="text-2xl font-black text-white">{todayHours}H</span>
                            <Activity size={14} className="text-emerald-500 mb-2" />
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Semana</p>
                        <div className="flex items-end space-x-2">
                            <span className="text-2xl font-black text-white">{weekHours}H</span>
                            <Target size={14} className="text-blue-500 mb-2" />
                        </div>
                    </div>
                </div>

                {/* Weekly Progress */}
                <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem] space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Objetivo Semanal</span>
                        <span className="text-white">40H / <span className="text-emerald-500">80%</span></span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(weekHours / 40) * 100}%` }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        />
                    </div>
                    <div className="flex items-center space-x-2 text-[9px] font-bold text-slate-500 uppercase italic">
                        <Zap size={10} className="text-amber-500" />
                        <span>Rendimiento óptimo detectado en este nodo</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
