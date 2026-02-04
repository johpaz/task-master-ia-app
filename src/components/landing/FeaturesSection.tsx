import {
  CheckSquare,
  Users,
  Clock,
  BarChart,
  Shield,
  Zap,
  Target,
  Layout,
  Layers,
  Activity,
  UserPlus,
  Server
} from 'lucide-react';
import PixelCard from '../ui/reactbits/PixelCard';

const features = [
  {
    icon: Layout,
    title: 'Dashboard Multinivel',
    description: 'Vistas optimizadas para cada rol (Admin, Manager, Colaborador y Clientes). Acceso granular a la información crítica.',
    colors: ['#3b82f6', '#1d4ed8', '#0ea5e9']
  },
  {
    icon: Layers,
    title: 'Gestión de Tareas Pro',
    description: 'Flujo colaborativo completo con estados dinámicos, hilos de comentarios y asignaciones automáticas.',
    colors: ['#6366f1', '#4338ca', '#818cf8']
  },
  {
    icon: Activity,
    title: 'Inteligencia Operativa',
    description: 'Métricas de rendimiento en tiempo real y estadísticas generales del equipo integradas directamente desde la API.',
    colors: ['#10b981', '#059669', '#34d399']
  },
  {
    icon: UserPlus,
    title: 'Seguridad Empresarial',
    description: 'Control de acceso basado en roles (RBAC) y autenticación JWT para proteger la integridad de tus proyectos.',
    colors: ['#8b5cf6', '#7c3aed', '#a78bfa']
  },
  {
    icon: Server,
    title: 'Infraestructura Bun + Elysia',
    description: 'Engine de alto rendimiento que garantiza una latencia mínima y una capacidad de respuesta excepcional.',
    colors: ['#f59e0b', '#d97706', '#fbbf24']
  },
  {
    icon: Shield,
    title: 'Soporte Integrado',
    description: 'Sistema nativo de notificaciones y correos electrónicos para mantener a todo el equipo sincronizado.',
    colors: ['#f43f5e', '#e11d48', '#fb7185']
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-40 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <div className="inline-flex items-center px-4 py-1.5 bg-blue-500/10 backdrop-blur-xl border border-white/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_20px_rgba(59,130,246,0.05)]">
            <Zap className="w-3.5 h-3.5 mr-2.5 fill-blue-400/20" />
            Core Capabilities
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
            Diseñado para{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent italic">
              Empoderar
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            No es solo una herramienta, es tu nueva ventaja competitiva.
            Ingeniería de vanguardia para la cima del rendimiento corporativo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <PixelCard
              key={index}
              className="p-10 h-[420px] flex flex-col justify-end group transition-all duration-700 bg-white/[0.01] border-white/5 hover:border-white/10"
              colors={feature.colors}
            >
              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
                  <feature.icon className="h-8 w-8 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </PixelCard>
          ))}
        </div>

        {/* Rebranding Alert - Replaced Stats with Feature Highlights */}
        <div className="mt-32 p-px bg-gradient-to-r from-white/0 via-white/10 to-white/0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-12">
            {[
              { label: 'Uptime API', val: '99.9%', icon: Server },
              { label: 'Seguridad', val: 'AES-256', icon: Shield },
              { label: 'Usuarios', val: 'Role-Based', icon: Users },
              { label: 'Latencia', val: '< 5ms', icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <stat.icon className="mx-auto h-5 w-5 text-slate-500 mb-3" />
                <div className="text-2xl font-black text-white">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};