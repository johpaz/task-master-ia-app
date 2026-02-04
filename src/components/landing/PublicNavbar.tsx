import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

export const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollToFeatures = () => {
      const featuresElement = document.getElementById('features');
      if (featuresElement) {
        featuresElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToFeatures, 100);
    } else {
      scrollToFeatures();
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Características', onClick: handleFeaturesClick },
    { name: 'FAQ', path: '/faq' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-50 transition-all duration-700 ${scrolled
        ? 'h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        : 'h-20 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo - Left */}
        <Link to="/" className="relative group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className={`relative flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'
              }`}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img src="/logoTaks.png" alt="TM" className="w-8 h-8 object-contain" />
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400 blur-xl"
            />
          </motion.div>
          <span className={`font-black tracking-tight text-white transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'
            }`}>
            Task<span className="text-blue-500">Master</span>
          </span>
        </Link>

        {/* Desktop Nav - Center */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            link.path ? (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group"
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                  />
                )}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/0 group-hover:bg-white/10 rounded-full transition-all" />
              </Link>
            ) : (
              <button
                key={link.name}
                onClick={link.onClick}
                className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/0 group-hover:bg-white/10 rounded-full transition-all" />
              </button>
            )
          ))}
        </div>

        {/* Desktop Actions - Right */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors px-4">
            Login
          </Link>
          <Link to="/contact">
            <button className="relative group px-6 py-2 bg-white text-slate-950 font-black text-xs uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                Empezar Ahora <ChevronRight size={14} strokeWidth={3} />
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950 border-b border-white/[0.05] overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-2xl font-black text-white hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={link.onClick}
                    className="block text-2xl font-black text-white hover:text-blue-500 transition-colors w-full text-left"
                  >
                    {link.name}
                  </button>
                )
              ))}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-bold text-slate-400"
                >
                  Login
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-2xl">
                    Contactar Ahora
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
