
import { 
  CheckSquare, 
  Users, 
  Clock, 
  BarChart, 
  Shield, 
  Zap 
} from 'lucide-react';

const features = [
  {
    icon: CheckSquare,
    title: 'Gestión Completa de Tareas',
    description: 'Crea, asigna y da seguimiento a tareas de desarrollo, agentes IA, soporte técnico y consultoría.'
  },
  {
    icon: Users,
    title: 'Colaboración en Tiempo Real',
    description: 'Trabaja en equipo con roles específicos: admin, manager, colaborador y cliente.'
  },
  {
    icon: Clock,
    title: 'Seguimiento de Tiempo',
    description: 'Registra tiempo estimado vs real, optimiza recursos y mejora la planificación.'
  },
  {
    icon: BarChart,
    title: 'Reportes y Métricas',
    description: 'Analiza productividad, tiempos de entrega y rendimiento del equipo.'
  },
  {
    icon: Shield,
    title: 'Control de Acceso',
    description: 'Permisos granulares por rol, seguridad de datos y privacidad garantizada.'
  },
  {
    icon: Zap,
    title: 'Tablero Kanban',
    description: 'Visualiza el flujo de trabajo con drag & drop, estados personalizables.'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todo lo que necesitas para gestionar proyectos de IA y desarrollo de manera eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para optimizar tu gestión de proyectos?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Únete a Tu Profe de IA y transforma la manera en que gestionas tareas de desarrollo e inteligencia artificial
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
