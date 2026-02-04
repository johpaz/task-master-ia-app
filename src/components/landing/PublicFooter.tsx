import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Zap } from 'lucide-react';

export const PublicFooter = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-black text-2xl">TM</span>
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">TaskMaster</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed font-medium text-lg">
              La infraestructura de ejecución definitiva para equipos globales.
              Ingeniería de alto rendimiento diseñada para la cima de la productividad.
            </p>
            <div className="flex space-x-6">
              {[
                { name: 'Twitter', path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                { name: 'GitHub', path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.339 3-.346 1.02.007 2.04.079 3 .346 2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                { name: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z' }
              ].map((social, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/[0.08] transition-all duration-500 border border-white/5">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Ecosistema</h3>
            <ul className="space-y-5">
              <li><Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 font-semibold text-sm tracking-tight">Sobre Nosotros</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 font-semibold text-sm tracking-tight">Centro de Ayuda</Link></li>
              <li><Link to="/login" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 font-semibold text-sm tracking-tight">Consola de Control</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 font-semibold text-sm tracking-tight">Estado del Sistema</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Soporte Global</h3>
            <ul className="space-y-5">
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-xl">
                  <Mail size={16} />
                </div>
                <span className="text-slate-400 group-hover:text-slate-200 transition-colors font-semibold text-sm">ops@taskmasterapp.cloud</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-xl">
                  <Zap size={16} />
                </div>
                <span className="text-slate-400 group-hover:text-slate-200 transition-colors font-semibold text-sm">Prioridad Enterprise</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.03] mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-bold tracking-tight">
            © 2026 TaskMaster. Powered by <span className="text-blue-500/80">Quantum Architecture</span>.
          </p>
          <div className="flex space-x-10">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm font-bold transition-colors tracking-tight">Privacidad</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm font-bold transition-colors tracking-tight">Términos</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm font-bold transition-colors tracking-tight">Seguridad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};