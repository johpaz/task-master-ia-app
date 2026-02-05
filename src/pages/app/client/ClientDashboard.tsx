import { motion } from 'framer-motion';
import { Plus, ShieldCheck, Activity, Sparkles, Send, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../../components/ui/button';
import { useAuthStore } from '../../../stores/authStore';
import { dashboardService } from '../../../services/dashboardService';
import { taskService } from '../../../services/taskService';
import { userService } from '../../../services/userService';
import { useTaskModalStore } from '../../../stores/taskModalStore';
import { CreateTaskRequest } from '../../../services/taskService';
import { Task, SubscriptionStatus } from '../../../types';
import { TaskModal } from '../../../components/tasks/TaskModal';
import { ClientStats } from './components/ClientStats';
import { RecentRequests } from './components/RecentRequests';

export const ClientDashboard = () => {
    const { isModalOpen, openModal, closeModal } = useTaskModalStore();
    const { token, user } = useAuthStore();
    const queryClient = useQueryClient();
    const [isSaving, setIsSaving] = useState(false);

    const { data: statsData, isLoading: isLoadingStats } = useQuery({
        queryKey: ['clientDashboardStats', token],
        queryFn: () => dashboardService.getClientDashboardStats(token),
        enabled: !!token,
    });

    const { data: tasksData, isLoading: isLoadingTasks } = useQuery({
        queryKey: ['myTasks', token],
        queryFn: () => taskService.getMyTasks(),
        enabled: !!token,
    });

    const { data: subData, isLoading: isLoadingSub } = useQuery<SubscriptionStatus>({
        queryKey: ['subscriptionStatus', user?.id],
        queryFn: () => userService.getSubscriptionStatus(user?.id || ''),
        enabled: !!user?.id,
    });

    const handleSaveTask = async (data: CreateTaskRequest) => {
        setIsSaving(true);
        try {
            await taskService.createTask(data);
            queryClient.invalidateQueries({ queryKey: ['myTasks'] });
            queryClient.invalidateQueries({ queryKey: ['clientDashboardStats'] });
            closeModal();
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    const recentTasks = tasksData?.tasks?.slice(0, 5) || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10 pb-12"
        >
            {/* Stakeholder Portal Header */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/30 border border-white/5 p-10 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
                            <ShieldCheck size={14} className="text-blue-500" />
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">VIP Session Authorized</span>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
                                Stakeholder <span className="text-blue-500">Portal</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium tracking-tight">
                                Bienvenido, <span className="text-white font-black">{user?.name?.split(' ')[0]}</span>. Monitoreando tus servicios.
                            </p>
                        </div>

                        <div className="flex items-center space-x-6 pt-2">
                            {subData && (
                                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${subData.active
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                        : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                                    }`}>
                                    {subData.active ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        {subData.active ? 'Suscripción Activa' : subData.reason}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2 text-blue-500/60 uppercase text-[10px] font-black tracking-widest">
                                <Activity size={14} />
                                <span>Canal Encriptado</span>
                            </div>
                            <div className="flex items-center space-x-2 text-emerald-500/60 uppercase text-[10px] font-black tracking-widest">
                                <Sparkles size={14} />
                                <span>Soporte Prioritario</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <Button
                            onClick={() => openModal()}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-20 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
                        >
                            <Plus className="mr-3 h-6 w-6" />
                            Nueva Solicitud
                        </Button>
                    </div>
                </div>
            </div>

            {/* Subscription Payment Alert */}
            {subData && !subData.active && subData.linkPago && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-rose-600/20 to-rose-600/5 border border-rose-500/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center space-x-6">
                        <div className="h-16 w-16 bg-rose-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-rose-500/20">
                            <CreditCard size={28} />
                        </div>
                        <div>
                            <h4 className="text-white font-black uppercase tracking-tight text-lg">Pago Pendiente Detectado</h4>
                            <p className="text-slate-400 font-medium text-sm">Tu suscripción ha expirado o el pago no ha sido procesado. Los servicios de agentes están pausados.</p>
                        </div>
                    </div>
                    <Button
                        asChild
                        className="bg-rose-600 hover:bg-rose-500 text-white h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-500/20"
                    >
                        <a href={subData.linkPago} target="_blank" rel="noopener noreferrer">
                            Pagar Ahora
                        </a>
                    </Button>
                </motion.div>
            )}

            {/* Core Metrics */}
            <ClientStats stats={statsData} isLoading={isLoadingStats} />

            {/* Main History View */}
            <RecentRequests tasks={recentTasks} isLoading={isLoadingTasks} />

            {/* Quick Action Overlay */}
            <div className="bg-gradient-to-r from-blue-600/10 to-transparent border border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <div className="h-16 w-16 bg-blue-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                        <Send size={28} />
                    </div>
                    <div>
                        <h4 className="text-white font-black uppercase tracking-tight text-lg">¿Necesitas Soporte Inmediato?</h4>
                        <p className="text-slate-500 font-medium text-sm">Nuestros agentes están listos para procesar tus protocolos.</p>
                    </div>
                </div>
                <Button variant="ghost" className="h-14 px-8 rounded-2xl border border-white/5 text-slate-300 font-black text-xs uppercase tracking-widest hover:text-white hover:bg-white/5">
                    Contactar Agente
                </Button>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveTask}
                isSaving={isSaving}
            />
        </motion.div>
    );
};
