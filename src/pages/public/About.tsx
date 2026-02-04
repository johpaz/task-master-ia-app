import { motion } from 'framer-motion';
import {
  Target,
  Rocket,
  Cpu,
  Globe,
  Zap,
  CheckSquare,
  CreditCard,
  Terminal,
  Layers
} from 'lucide-react';
import PixelCard from '../../components/ui/reactbits/PixelCard';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const values = [
  {
    icon: Target,
    title: "Misión",
    description: "Empoderar a nuestros clientes con soluciones de IA personalizadas y automatizaciones inteligentes que optimizan procesos, impulsan el crecimiento y proporcionan una ventaja competitiva sostenible.",
    color: "#3b82f6"
  },
  {
    icon: Globe,
    title: "Visión",
    description: "Ser el socio tecnológico líder y más confiable en la implementación de Inteligencia Artificial en Latinoamérica, reconocido por la innovación, excelencia y el impacto real.",
    color: "#818cf8"
  },
  {
    icon: Rocket,
    title: "Innovación",
    description: "Transformamos el meta-trabajo del desarrollo mediante la orquestación de agentes de IA, permitiendo que humanos y máquinas colaboren en la frontera tecnológica.",
    color: "#10b981"
  }
];

const services = [
  {
    icon: CheckSquare,
    title: 'Manejo de Tareas',
    description: 'Gestión integral de flujos de trabajo con tableros Kanban, listas dinámicas y priorización inteligente para equipos de alto rendimiento.',
    colors: ['#3b82f6', '#1d4ed8', '#0ea5e9']
  },
  {
    icon: Zap,
    title: 'Potenciados con IA',
    description: 'Automatización y orquestación masiva mediante agentes de IA que asisten en la creación, seguimiento y resolución de objetivos.',
    colors: ['#6366f1', '#4338ca', '#818cf8']
  },
  {
    icon: CreditCard,
    title: 'Control de Planes y Pagos',
    description: 'Gestión granular de suscripciones, métodos de pago y seguimiento automático de fechas de vencimiento para una operatividad sin interrupciones.',
    colors: ['#10b981', '#059669', '#34d399']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative pt-52 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-1.5 bg-blue-500/10 border border-white/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <Cpu className="w-3.5 h-3.5 mr-2" />
              Ecosistema de Ingeniería IA
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
              Task<span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent italic">Master</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-slate-400 font-medium leading-relaxed">
              No solo construimos software: diseñamos la infraestructura inteligente que define el futuro de las empresas en la era de la IA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 relative bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="text-white/80" style={{ color: value.color }} size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Capacidades del <span className="text-blue-500">Core</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Arquitecturas modernas desplegadas con tecnologías de alto perfil para el máximo rendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <PixelCard
                key={index}
                className="p-10 h-[420px] flex flex-col justify-end group transition-all duration-700 bg-white/[0.01] border-white/5 hover:border-white/10"
                colors={service.colors}
              >
                <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
                    <service.icon className="h-8 w-8 text-white/80 group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>

      {/* TaskMaster Highlight */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600/10 to-transparent backdrop-blur-3xl rounded-[3rem] border border-white/10 p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Zap className="w-64 h-64 text-blue-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  <Zap className="w-3.5 h-3.5 mr-2 fill-blue-400/20" />
                  TaskMaster Core Engine
                </div>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Gestión Multinivel: <span className="text-blue-400">Control Total</span>
                </h2>
                <div className="space-y-4">
                  {[
                    "Centralización completa de tareas y proyectos en tiempo real.",
                    "Asistente de IA para optimización de flujos de trabajo.",
                    "Control granular de planes, suscripciones y vencimientos.",
                    "Sistemas de notificación proactiva para hitos críticos."
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link to="/login">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-base font-bold px-12 py-8 rounded-2xl shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] transition-all duration-500 hover:scale-[1.02] hover:translate-y-[-4px] active:scale-95">
                      <Zap className="w-5 h-5 mr-3 fill-white" />
                      Ingresar a la Consola
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-2">
                    <div className="text-3xl font-black text-white">99.9%</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Uptime SLA</div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-2">
                    <div className="text-3xl font-black text-white">&lt;5ms</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Latencia API</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-2">
                    <div className="text-3xl font-black text-white">256-bit</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Encriptación</div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-2">
                    <div className="text-3xl font-black text-white">AES</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Security Hub</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Support CTA */}
      <section className="py-32 text-center">
        <h2 className="text-3xl font-bold mb-8">¿Listo para escalar con Inteligencia Artificial?</h2>
        <div className="flex justify-center gap-6">
          <Link to="/contact">
            <Button variant="outline" className="rounded-2xl border-white/10 hover:bg-white/5 px-8 py-6 font-bold">
              Contactar Especialistas
            </Button>
          </Link>
          <a href="https://taskmasterapp.cloud" target="_blank" rel="noreferrer">
            <Button variant="ghost" className="text-blue-400 font-bold">Saber más sobre TaskMaster</Button>
          </a>
        </div>
      </section>
    </div>
  );
};