
import { Users, Target, Award, Heart } from 'lucide-react';

const team = [
  {
    name: "Dr. Carlos Rodríguez",
    role: "CEO & Fundador",
    description: "PhD en Inteligencia Artificial con 15+ años de experiencia en transformación digital",
    avatar: "/api/placeholder/100/100"
  },
  {
    name: "Ana García",
    role: "CTO",
    description: "Experta en desarrollo de software y arquitectura de sistemas IA",
    avatar: "/api/placeholder/100/100"
  },
  {
    name: "Miguel Santos",
    role: "Lead Developer",
    description: "Especialista en desarrollo full-stack y machine learning",
    avatar: "/api/placeholder/100/100"
  },
  {
    name: "Laura Martínez",
    role: "Head of AI Solutions",
    description: "Consultora senior en implementación de soluciones de IA empresarial",
    avatar: "/api/placeholder/100/100"
  }
];

const values = [
  {
    icon: Target,
    title: "Misión",
    description: "Democratizar el acceso a la inteligencia artificial mediante soluciones innovadoras, educación de calidad y consultorías especializadas que impulsen la transformación digital de empresas y profesionales."
  },
  {
    icon: Heart,
    title: "Visión",
    description: "Ser la plataforma líder en América Latina para el aprendizaje y aplicación práctica de inteligencia artificial, conectando talento con oportunidades del futuro."
  },
  {
    icon: Award,
    title: "Valores",
    description: "Excelencia en cada proyecto, innovación constante, transparencia en nuestros procesos, y compromiso genuino con el éxito de nuestros clientes y estudiantes."
  }
];

export const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Quiénes Somos -{' '}
              <span className="text-blue-600">Tu Profe de IA</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Somos expertos en inteligencia artificial y desarrollo de software, 
              comprometidos con democratizar el acceso a la IA a través de educación, 
              consultoría y soluciones tecnológicas innovadoras.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Tu Profe de IA nació en 2020 con una visión clara: hacer que la 
                  inteligencia artificial sea accesible para todos. Comenzamos como 
                  un proyecto educativo y hemos evolucionado hasta convertirnos en 
                  una plataforma integral de servicios de IA.
                </p>
                <p>
                  Hoy, ayudamos a empresas y profesionales de toda América Latina 
                  a implementar soluciones de IA, desarrollar agentes conversacionales, 
                  automatizar procesos y mantenerse a la vanguardia tecnológica.
                </p>
                <p>
                  Nuestro enfoque combina la excelencia técnica con la pedagogía 
                  efectiva, asegurando que cada cliente no solo reciba una solución, 
                  sino también el conocimiento para mantenerla y mejorarla.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Equipo de Tu Profe de IA trabajando"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Proyectos Completados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600">
              Los principios que guían cada decisión y proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600">
              Expertos apasionados por la inteligencia artificial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img 
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a las empresas que ya están transformando su futuro con 
            soluciones de IA personalizadas y efectivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Solicitar Consultoría
            </button>
            <button className="border border-white text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Ver Nuestros Servicios
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
