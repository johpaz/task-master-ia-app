import { 
  CheckSquare, 
  Users, 
  Clock, 
  BarChart, 
  Shield, 
  Zap,
  Bot,
  Code,
  Sparkles,
  Rocket,
  Brain,
  Target
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'Agentes IA Inteligentes',
    description: 'Desarrollamos chatbots y asistentes virtuales personalizados que entienden el contexto y aprenden de cada interacción.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Code,
    title: 'Desarrollo Personalizado',
    description: 'Soluciones de software a medida con integración de IA para automatizar procesos complejos de tu negocio.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Brain,
    title: 'Machine Learning Avanzado',
    description: 'Implementamos modelos de ML que analizan patrones, predicen tendencias y optimizan decisiones empresariales.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Rocket,
    title: 'Automatización Inteligente',
    description: 'Transformamos procesos manuales en flujos automatizados que ahorran tiempo y reducen errores humanos.',
    gradient: 'from-teal-500 to-blue-500'
  },
  {
    icon: BarChart,
    title: 'Análisis Predictivo',
    description: 'Dashboards inteligentes con métricas en tiempo real y predicciones basadas en datos históricos.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Target,
    title: 'Consultoría Estratégica',
    description: 'Te guiamos en la adopción de IA con estrategias personalizadas para maximizar el ROI de tu inversión.',
    gradient: 'from-teal-500 to-blue-500'
  }
];

const stats = [
  { number: '500+', label: 'Proyectos IA Completados', icon: CheckSquare },
  { number: '50+', label: 'Empresas Transformadas', icon: Users },
  { number: '99%', label: 'Tasa de Éxito', icon: Target },
  { number: '24/7', label: 'Soporte Especializado', icon: Clock }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Tecnología de Vanguardia
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Características que{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transforman
            </span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo nuestras soluciones de IA pueden revolucionar tu empresa 
            con tecnología avanzada y resultados medibles
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-700/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="relative">
                <div className={`inline-flex p-4 bg-gradient-to-r ${feature.gradient} rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Resultados que Hablan por Sí Solos
            </h3>
            <p className="text-slate-700 dark:text-gray-300 text-lg">
              Números que demuestran nuestro compromiso con la excelencia
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-slate-700 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse"></div>
            </div>
            
            <div className="relative">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                ¿Listo para Transformar tu Empresa con IA?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Únete a las empresas líderes que ya están aprovechando el poder 
                de la inteligencia artificial para crecer y competir mejor
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Rocket className="inline w-5 h-5 mr-2" />
                  Comenzar Ahora
                </button>
                <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                  <Shield className="inline w-5 h-5 mr-2" />
                  Ver Demo Gratuita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};