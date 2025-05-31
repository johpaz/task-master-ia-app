
import { 
  Users, 
  BarChart, 
  CheckSquare, 
  Clock, 
  Zap, 
  Shield,
  Brain,
  FileText,
  MessageSquare,
  Calendar
} from 'lucide-react';

const features = [
  {
    icon: CheckSquare,
    title: 'Gestión Visual de Tareas',
    description: 'Tablero Kanban intuitivo con drag & drop para organizar proyectos de desarrollo, agentes IA, soporte y PQR.'
  },
  {
    icon: Brain,
    title: 'Tipos de Proyecto Especializados',
    description: 'Plantillas optimizadas para desarrollo web, creación de agentes IA, soporte técnico y consultoría en IA.'
  },
  {
    icon: Users,
    title: 'Colaboración en Tiempo Real',
    description: 'Asignación de roles, comentarios instantáneos y seguimiento colaborativo para todo el equipo.'
  },
  {
    icon: BarChart,
    title: 'Métricas y Analytics',
    description: 'Dashboards personalizados con KPIs, tiempo de respuesta, productividad y métricas de satisfacción.'
  },
  {
    icon: Clock,
    title: 'Seguimiento de Tiempo',
    description: 'Control preciso de horas trabajadas, estimaciones vs. tiempo real y facturación automática.'
  },
  {
    icon: MessageSquare,
    title: 'Sistema de PQR Integrado',
    description: 'Gestión completa de peticiones, quejas y reclamos con seguimiento automático y SLA.'
  },
  {
    icon: Calendar,
    title: 'Planificación Inteligente',
    description: 'Calendario integrado con deadlines, recordatorios automáticos y sincronización con Google Calendar.'
  },
  {
    icon: FileText,
    title: 'Documentación Automática',
    description: 'Generación automática de reportes, documentación técnica y entregables de proyecto.'
  },
  {
    icon: Shield,
    title: 'Seguridad Empresarial',
    description: 'Control de acceso por roles, encriptación de datos y cumplimiento con estándares de seguridad.'
  },
  {
    icon: Zap,
    title: 'Automatización IA',
    description: 'Clasificación automática de tareas, predicción de tiempos y sugerencias inteligentes de asignación.'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Características Diseñadas para{' '}
            <span className="text-blue-600">Tu Profe de IA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas especializadas para gestionar proyectos de inteligencia artificial, 
            desarrollo de software y consultoría tecnológica con la máxima eficiencia.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para optimizar tu flujo de trabajo?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a los equipos que ya están transformando su productividad 
              con TaskMaster IA. Comenzar es simple y gratuito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Solicitar Demo
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                Ver Precios
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
