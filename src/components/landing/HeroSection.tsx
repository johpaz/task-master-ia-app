import { Link } from 'react-router-dom';
import { ArrowDown, BarChart, Zap, Sparkles, Bot, Code, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import BlurText from '../ui/reactbits/BlurText';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden pt-32 pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.15]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.15),transparent_70%)]"></div>
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
          {/* Content */}
          <div className="space-y-12 text-white">
            <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/10 rounded-full text-blue-300 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <Sparkles className="w-3.5 h-3.5 mr-2.5 text-blue-400 fill-blue-400/20" />
              Infraestructura de Clase Mundial
            </div>

            <div className="space-y-8">
              <div className="text-7xl lg:text-[100px] font-black tracking-tight leading-[0.9] select-none">
                <BlurText
                  text="Task Manager"
                  className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
                  delay={100}
                />
                <span className="block mt-6 text-4xl lg:text-6xl font-extrabold tracking-tight text-white/90">
                  Control Multinivel. <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent italic">Ejecución</span> de Élite.
                </span>
              </div>
              <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
                La plataforma definitiva para gestionar flujos de trabajo colaborativos.
                Dashboards especializados para Admin, Manager, Colaborador y Clientes con latencia <span className="text-emerald-400 font-bold">inframilisegundo</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Bot, text: 'Orquestación con IA', color: 'text-blue-400', glow: 'shadow-blue-500/10' },
                { icon: Code, text: 'Engine Bun + Elysia', color: 'text-indigo-400', glow: 'shadow-indigo-500/10' },
                { icon: BarChart, text: 'Analítica en Vivo', color: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
                { icon: Rocket, text: 'Escalabilidad Infinita', color: 'text-purple-400', glow: 'shadow-purple-500/10' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center space-x-4 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl rounded-2xl p-4 border border-white/5 transition-all duration-500 group cursor-default ${item.glow} hover:shadow-2xl`}>
                  <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors`}>
                    <item.icon className={`${item.color} flex-shrink-0 group-hover:scale-110 transition-transform`} size={22} />
                  </div>
                  <span className="text-slate-300 font-semibold text-sm tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link to="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-base font-bold px-12 py-8 rounded-2xl shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] transition-all duration-500 hover:scale-[1.02] hover:translate-y-[-4px] active:scale-95">
                  <Zap className="w-5 h-5 mr-3 fill-white" />
                  Desplegar Ahora
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="ghost" size="lg" className="text-base font-bold px-10 py-8 rounded-2xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 backdrop-blur-xl transition-all duration-500">
                  Ver Capacidades
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-16 pt-12 border-t border-white/5">
              {[
                { val: '100%', label: 'Disponibilidad' },
                { val: 'Real-time', label: 'Telemetría' },
                { val: '< 1ms', label: 'Latencia Kern' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-black text-white mb-1 tracking-tighter">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview Overlay */}
          <div className="relative group perspective-1000">
            <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden transform transition-all duration-1000 group-hover:rotate-y-6 group-hover:rotate-x-2 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none"></div>

              <div className="bg-slate-800/80 px-8 py-6 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-xl">TM</span>
                  </div>
                  <div>
                    <span className="text-white font-bold text-xl block">Task Manager</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-400 text-xs font-medium uppercase tracking-tighter">API Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-3 h-3 bg-red-500/40 rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-500/40 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500/40 rounded-full"></div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5 ring-1 ring-inset ring-white/5">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Tareas Totales</div>
                    <div className="text-4xl font-black text-white">1,284</div>
                    <div className="mt-2 text-cyan-400 text-sm font-medium">↑ 14.2% del API</div>
                  </div>
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5 ring-1 ring-inset ring-white/5">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Rendimiento</div>
                    <div className="text-4xl font-black text-white text-blue-400">98.2%</div>
                    <div className="mt-2 text-indigo-400 text-sm font-medium">Latencia Óptima</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-slate-200 font-bold">Dashboard API Integration</span>
                      <span className="text-blue-400 text-xs font-mono">v2.4.0</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-all duration-700"></div>
            <div className="absolute -z-10 -bottom-20 -left-20 w-60 h-60 bg-indigo-600/20 rounded-full blur-[80px] group-hover:bg-indigo-600/30 transition-all duration-700"></div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 group-hover:text-blue-400 transition-colors">Stack Tecnológico</span>
          <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};