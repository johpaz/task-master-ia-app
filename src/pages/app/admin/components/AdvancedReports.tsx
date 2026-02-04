import { useMemo, useState } from 'react';
import { BarChart, Download, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart as ReBarChart, CartesianGrid, XAxis, YAxis, LabelList, ResponsiveContainer } from "recharts";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_URL;

const fetchDashboardStats = async (token: string | null) => {
    if (!token) throw new Error('No authentication token found');
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const CHART_CONFIGS = {
    tasksByStatus: {
        label: 'Distribución por Estado',
        colors: {
            "por hacer": "#3b82f6",
            "en progreso": "#f59e0b",
            "en revisión": "#a855f7",
            "completada": "#10b981",
            "cancelada": "#ef4444"
        }
    },
    tasksByPriority: {
        label: 'Carga por Prioridad',
        colors: {
            "baja": "#22c55e",
            "media": "#f59e0b",
            "alta": "#eab308",
            "urgente": "#dc2626"
        }
    },
    usersByRole: {
        label: 'Despliegue de Roles',
        colors: {
            "admin": "#8b5cf6",
            "manager": "#3b82f6",
            "colaborador": "#10b981",
            "cliente": "#f59e0b"
        }
    }
};

export const AdvancedReports = () => {
    const { token } = useAuthStore();
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => fetchDashboardStats(token),
        enabled: !!token,
        refetchInterval: 30000,
    });

    const [chartType, setChartType] = useState<keyof typeof CHART_CONFIGS>('tasksByStatus');

    const chartData = useMemo(() => {
        if (!data || !data[chartType]) return [];
        const sourceData = data[chartType];
        return Object.entries(sourceData).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value: value as number,
            fill: CHART_CONFIGS[chartType].colors[name] || '#6366f1',
        }));
    }, [data, chartType]);

    const handleExport = () => {
        const doc = new jsPDF();
        const chartTitle = CHART_CONFIGS[chartType].label;
        doc.text(chartTitle, 14, 16);
        autoTable(doc, {
            startY: 22,
            head: [['Dimensión', 'Métrica']],
            body: chartData.map(d => [d.name, d.value]),
        });
        doc.save(`TaskMaster_Report_${chartType}.pdf`);
    };

    if (error) return <div className="p-8 text-center text-red-400 font-bold bg-white/5 rounded-[2.5rem]">No se pudieron sincronizar los reportes analíticos.</div>;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 h-full relative overflow-hidden flex flex-col"
        >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-1">
                    <div className="flex items-center space-x-3 text-blue-400 mb-1">
                        <BarChart size={20} className="font-bold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Business Intelligence</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Reportes Avanzados</h3>
                    <p className="text-slate-500 text-xs font-bold">Visualización de infraestructura en tiempo real</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Select value={chartType} onValueChange={(value) => setChartType(value as keyof typeof CHART_CONFIGS)}>
                        <SelectTrigger className="w-[200px] bg-white/5 border-white/5 rounded-xl h-11 text-white font-bold text-xs ring-0 focus:ring-1 focus:ring-blue-500/50">
                            <SelectValue placeholder="Seleccionar Dimensión" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl">
                            {Object.entries(CHART_CONFIGS).map(([key, config]) => (
                                <SelectItem key={key} value={key} className="focus:bg-blue-600 focus:text-white rounded-lg m-1 text-xs font-bold leading-none">{config.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExport}
                        disabled={isLoading || chartData.length === 0}
                        className="h-11 bg-white/5 border-white/5 rounded-xl text-white font-black text-xs hover:bg-white/10 hover:border-white/10 transition-all px-6"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-[300px] relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ left: 0, right: 60, top: 0, bottom: 0 }}
                            barSize={32}
                        >
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                hide
                            />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={1500} animationEasing="ease-out">
                                <LabelList
                                    dataKey="name"
                                    position="insideLeft"
                                    offset={12}
                                    className="fill-white font-black text-[10px] uppercase tracking-wider"
                                />
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    offset={12}
                                    className="fill-blue-400 font-black text-sm tracking-tighter"
                                />
                            </Bar>
                        </ReBarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </motion.div>
    );
};

const Loader2 = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
