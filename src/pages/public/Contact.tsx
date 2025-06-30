import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('Mensaje enviado correctamente. Te contactaremos pronto.');
    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-slate-900">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Contáctanos
        </h1>
        <p className="text-xl text-slate-700 dark:text-gray-300 max-w-3xl mx-auto">
          ¿Necesitas implementar IA en tu empresa? Estamos aquí para ayudarte a transformar tu negocio con inteligencia artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Información de Contacto
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                  <p className="text-slate-700 dark:text-gray-300">hola@tuprofedeai.com</p>
                  <p className="text-slate-700 dark:text-gray-300">soporte@tuprofedeai.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Teléfono</h3>
                  <p className="text-slate-700 dark:text-gray-300">+57 300 123 4567</p>
                  <p className="text-slate-700 dark:text-gray-300">+57 1 234 5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Ubicación</h3>
                  <p className="text-slate-700 dark:text-gray-300">Bogotá, Colombia</p>
                  <p className="text-slate-700 dark:text-gray-300">Atención virtual 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Nuestros Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-700 dark:text-gray-300">
                <li>• Desarrollo de Agentes IA personalizados</li>
                <li>• Implementación de Chatbots inteligentes</li>
                <li>• Automatización de procesos con IA</li>
                <li>• Consultoría en transformación digital</li>
                <li>• Capacitación en herramientas de IA</li>
                <li>• Soporte técnico especializado</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Envíanos un Mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-800 dark:text-gray-200 mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                    className="border-slate-300 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800 dark:text-gray-200 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="border-slate-300 dark:border-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-800 dark:text-gray-200 mb-2">
                  Empresa
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  className="border-slate-300 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-800 dark:text-gray-200 mb-2">
                  Asunto *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consultoria">Consultoría en IA</option>
                  <option value="desarrollo">Desarrollo de Agentes IA</option>
                  <option value="capacitacion">Capacitación</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-800 dark:text-gray-200 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe tu proyecto o necesidad..."
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};