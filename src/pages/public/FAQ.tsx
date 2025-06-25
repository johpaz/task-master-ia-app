import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

const faqs = [
  {
    question: "¿Cómo puedo crear una nueva tarea en TaskMaster IA?",
    answer: "Para crear una nueva tarea, haz clic en el botón '+' en tu dashboard o ve a la sección 'Tareas' y selecciona 'Nueva Tarea'. Podrás especificar el tipo (desarrollo, agente IA, soporte, PQR, consultoría), asignar responsables, establecer fechas y prioridades."
  },
  {
    question: "¿Cómo cambio el estado de una tarea?",
    answer: "Puedes cambiar el estado de una tarea de varias formas: (1) Arrastrando la tarjeta entre columnas en el tablero Kanban, (2) Editando la tarea y cambiando el estado en el formulario, (3) Usando los botones de acción rápida en la vista de lista."
  },
  {
    question: "¿Quién puede ver mis tareas?",
    answer: "La visibilidad depende de tu rol: Los Administradores ven todas las tareas, los Managers ven las de su equipo, los Colaboradores ven solo las asignadas a ellos, y los Clientes ven únicamente sus solicitudes y proyectos relacionados."
  },
  {
    question: "¿Cómo subo archivos a una tarea?",
    answer: "En el detalle de cualquier tarea encontrarás una sección de 'Archivos adjuntos'. Puedes arrastrar archivos directamente o hacer clic para seleccionarlos. Soportamos documentos, imágenes y archivos de código hasta 10MB por archivo."
  },
  {
    question: "¿Puedo recibir notificaciones sobre mis tareas?",
    answer: "Sí, TaskMaster IA envía notificaciones por email cuando: te asignan una nueva tarea, cambia el estado de tus tareas, se acerca una fecha límite, alguien comenta en tus tareas, o hay actualizaciones importantes en proyectos que sigues."
  },
  {
    question: "¿Qué tipos de proyectos maneja la plataforma?",
    answer: "TaskMaster IA está especializado en: Proyectos de desarrollo web y móvil, Creación y entrenamiento de agentes de IA, Soporte técnico y resolución de incidencias, Gestión de PQR (Peticiones, Quejas, Reclamos), Consultorías en inteligencia artificial, y Capacitaciones tecnológicas."
  },
  {
    question: "¿Cómo funcionan los roles y permisos?",
    answer: "Tenemos 4 roles principales: Administrador (acceso completo), Manager (gestiona equipos y proyectos), Colaborador (ejecuta tareas asignadas), y Cliente (crea solicitudes y ve progreso). Cada rol tiene permisos específicos para mantener la seguridad y organización."
  },
  {
    question: "¿Puedo exportar reportes de mis proyectos?",
    answer: "Sí, puedes generar y exportar reportes en PDF y Excel con información detallada sobre: tiempo invertido, tareas completadas, métricas de productividad, estado de proyectos, y análisis de performance del equipo."
  },
  {
    question: "¿La plataforma se integra con otras herramientas?",
    answer: "TaskMaster IA se integra con: Google Calendar y Outlook para sincronización de fechas, Slack y Microsoft Teams para notificaciones, GitHub y GitLab para proyectos de desarrollo, y Zapier para conectar con cientos de aplicaciones adicionales."
  },
  {
    question: "¿Qué pasa si necesito soporte técnico?",
    answer: "Ofrecemos soporte completo: Chat en vivo durante horario laboral, Email de soporte (hola@tuprofedeai.com), Base de conocimientos con tutoriales, y para clientes premium, soporte telefónico y sesiones de entrenamiento personalizado."
  }
];

export const FAQ = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-slate-700 dark:text-gray-300">
            Encuentra respuestas rápidas a las preguntas más comunes sobre TaskMaster IA
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <Accordion type="single" collapsible className="p-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-slate-700 dark:text-gray-300 mb-6">
              Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta específica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Contactar Soporte
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-6 py-3 rounded-lg font-semibold transition-colors">
                Programar Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};