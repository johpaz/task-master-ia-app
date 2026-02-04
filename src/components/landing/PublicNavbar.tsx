import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

interface NavLinkItem {
  name: string;
  path?: string;
  onClick?: (e: React.MouseEvent) => void;
}

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

  const leftLinks: NavLinkItem[] = [
    { name: 'Inicio', path: '/' },
    { name: 'Características', onClick: handleFeaturesClick },
  ];

  const rightLinks: NavLinkItem[] = [
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
        ? 'h-24 bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
        : 'h-40 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        {/* Desktop Left Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-start gap-1">
          {leftLinks.map((link) => (
            <NavLink key={link.name} link={link} scrolled={scrolled} />
          ))}
        </div>

        {/* Logo - Centered */}
        <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
          <Link to="/" className="relative group flex flex-col items-center justify-center pt-2">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`relative flex items-center justify-center transition-all duration-700 ${scrolled ? 'w-16 h-16' : 'w-32 h-32'
                }`}
            >
              <img
                src="/logoTaks.png"
                alt="TM"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              />

              {/* Subtle ambient glow effect behind the clean logo */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/20 blur-[50px] -z-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
              className="mt-4 whitespace-nowrap"
            >
              <span className="text-[12px] font-black tracking-[0.5em] text-white/90 uppercase group-hover:text-blue-400 transition-colors">
                Task<span className="text-blue-500">Master</span>
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop Right Menu + Actions */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-1">
          {rightLinks.map((link) => (
            <NavLink key={link.name} link={link} scrolled={scrolled} />
          ))}

          <div className="h-4 w-[1px] bg-white/10 mx-4" />

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
        <div className="lg:hidden flex flex-1 justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
              {[...leftLinks, ...rightLinks].map((link) => (
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
                    onClick={(e) => {
                      if (link.onClick) link.onClick(e);
                      setIsMenuOpen(false);
                    }}
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

const NavLink = ({ link, scrolled }: { link: NavLinkItem, scrolled: boolean }) => {
  const location = useLocation();

  if (link.path) {
    return (
      <Link
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
    );
  }

  return (
    <button
      onClick={link.onClick}
      className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors relative group"
    >
      {link.name}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/0 group-hover:bg-white/10 rounded-full transition-all" />
    </button>
  );
};
