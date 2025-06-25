import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ui/theme-toggle';

export const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Efecto de scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const featuresElement = document.getElementById('features');
        if (featuresElement) {
          featuresElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const featuresElement = document.getElementById('features');
      if (featuresElement) {
        featuresElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border h-20' 
        : 'bg-slate-900/80 backdrop-blur-sm h-24'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <Link to="/" className={`font-medium transition-all duration-300 ${
              scrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
            }`}>
              Inicio
            </Link>
            <button 
              onClick={handleFeaturesClick}
              className={`font-medium transition-all duration-300 ${
                scrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Características
            </button>
            <Link to="/faq" className={`font-medium transition-all duration-300 ${
              scrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
            }`}>
              FAQ
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center flex-1">
            <Link to="/" className="group">
              <div className={`bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                scrolled ? 'w-16 h-16' : 'w-20 h-20'
              }`}>
                <span className={`text-white font-bold transition-all duration-300 ${
                  scrolled ? 'text-2xl' : 'text-3xl'
                }`}>
                  T
                </span>
              </div>
            </Link>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            <Link to="/about" className={`font-medium transition-all duration-300 ${
              scrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
            }`}>
              Nosotros
            </Link>
            <Link to="/contact" className={`font-medium transition-all duration-300 ${
              scrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
            }`}>
              Contacto
            </Link>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" className={`transition-all duration-300 ${
                scrolled 
                  ? 'text-foreground hover:text-primary hover:bg-accent' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}>
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Contactar
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 absolute right-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-all duration-300 ${
                scrolled ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border bg-background/95 backdrop-blur-md shadow-lg rounded-b-lg mx-4 mt-2">
              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <button
                onClick={handleFeaturesClick}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-medium"
              >
                Características
              </button>
              <Link
                to="/faq"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-4 border-t border-border space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md text-center font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};