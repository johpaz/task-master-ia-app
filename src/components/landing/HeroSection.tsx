import { Link } from 'react-router-dom';
import { ArrowDown, CheckCircle, Users, BarChart, Zap, Sparkles, Bot, Code, Rocket } from 'lucide-react';
import { Button } from '../ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden pt-24 pb-20">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-8 text-white">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Plataforma #1 en IA para Empresas
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Transforma tu{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                  Negocio
                </span>{' '}
                con IA
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                Desarrollamos agentes de IA personalizados, automatizamos procesos 
                y ofrecemos consultoría especializada para impulsar tu transformación digital.
              </p>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <Bot className="text-blue-400 flex-shrink-0" size={24} />
                <span className="text-blue-100 font-medium">Agentes IA Inteligentes</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <Code className="text-purple-400 flex-shrink-0" size={24} />
                <span className="text-blue-100 font-medium">Desarrollo Personalizado</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <BarChart className="text-green-400 flex-shrink-0" size={24} />
                <span className="text-blue-100 font-medium">Análisis Avanzado</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <Rocket className="text-teal-400 flex-shrink-0" size={24} />
                <span className="text-blue-100 font-medium">Resultados Rápidos</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-8 py-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                  <Zap className="w-5 h-5 mr-2" />
                  Comenzar Ahora
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-border text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                  Ver Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-blue-200">Proyectos IA</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-blue-200">Clientes Felices</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">99%</div>
                <div className="text-sm text-blue-200">Éxito Garantizado</div>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative group">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
              {/* Mock Dashboard Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold text-lg">TaskMaster IA</span>
                    <div className="text-blue-200 text-sm">Tu Profe de IA</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-slate-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-4 rounded-xl border border-blue-400/30">
                    <div className="text-blue-200 text-sm font-medium mb-1">Agentes Activos</div>
                    <div className="text-3xl font-bold text-white">24</div>
                    <div className="text-green-400 text-xs">+12% este mes</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-4 rounded-xl border border-green-400/30">
                    <div className="text-green-200 text-sm font-medium mb-1">Tareas IA</div>
                    <div className="text-3xl font-bold text-white">156</div>
                    <div className="text-green-400 text-xs">+28% este mes</div>
                  </div>
                </div>

                {/* Mock Task Cards */}
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transform transition-all duration-300 hover:bg-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Chatbot E-commerce</span>
                      <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-400/30">En Progreso</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-xs text-blue-200">75% completado</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transform transition-all duration-300 hover:bg-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">API Inteligente</span>
                      <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-400/30">Revisión</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                    </div>
                    <div className="text-xs text-blue-200">90% completado</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transform transition-all duration-300 hover:bg-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Análisis Predictivo</span>
                      <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full border border-red-400/30">Urgente</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-red-400 to-pink-400 h-2 rounded-full transition-all duration-1000" style={{ width: '35%' }}></div>
                    </div>
                    <div className="text-xs text-blue-200">35% completado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements with enhanced effects */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-2xl animate-pulse group-hover:scale-110 transition-all duration-700"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full blur-2xl animate-pulse delay-1000 group-hover:scale-110 transition-all duration-700"></div>
            
            {/* Additional floating icons */}
            <div className="absolute top-10 -left-4 w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-blue-400/30 animate-bounce">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div className="absolute bottom-20 -right-4 w-8 h-8 bg-purple-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-purple-400/30 animate-bounce delay-500">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Descubre más</span>
          <ArrowDown className="text-white/60 animate-bounce" size={24} />
        </div>
      </div>
    </section>
  );
};