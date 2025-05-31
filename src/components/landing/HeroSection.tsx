
import { Link } from 'react-router-dom';
import { ArrowDown, CheckCircle, Users, BarChart, Zap } from 'lucide-react';
import { Button } from '../ui/button';

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gestiona todas las tareas de{' '}
                <span className="text-blue-600">Tu Profe de IA</span>{' '}
                en un solo lugar
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Plataforma integral para administrar proyectos de desarrollo, 
                creación de agentes IA, soporte técnico, PQR y consultorías. 
                Optimiza tu flujo de trabajo con inteligencia artificial.
              </p>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">Gestión visual con Kanban</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="text-blue-500" size={20} />
                <span className="text-gray-700">Colaboración en tiempo real</span>
              </div>
              <div className="flex items-center space-x-3">
                <BarChart className="text-purple-500" size={20} />
                <span className="text-gray-700">Métricas y reportes</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="text-yellow-500" size={20} />
                <span className="text-gray-700">Automatización inteligente</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Ver Características
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Proyectos completados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">99%</div>
                <div className="text-sm text-gray-600">Tiempo de actividad</div>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Mock Dashboard Header */}
              <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">T</span>
                  </div>
                  <span className="text-white font-semibold">TaskMaster IA</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-blue-600 text-sm font-medium">En Progreso</div>
                    <div className="text-2xl font-bold text-blue-700">12</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-green-600 text-sm font-medium">Completadas</div>
                    <div className="text-2xl font-bold text-green-700">28</div>
                  </div>
                </div>

                {/* Mock Task Cards */}
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Chatbot E-commerce</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">En Progreso</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">API REST Inventarios</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Revisión</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Soporte Técnico</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Urgente</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <ArrowDown className="text-gray-400 animate-bounce" size={24} />
        </div>
      </div>
    </section>
  );
};
