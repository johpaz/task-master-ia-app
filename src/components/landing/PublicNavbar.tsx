
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

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
        : 'bg-transparent h-24'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <Link to="/" className="font-semibold text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <button 
              onClick={handleFeaturesClick}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Características
            </button>
            <Link to="/faq" className="font-semibold text-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center flex-1">
            <Link to="/" className="group">
              <div className={`bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-primary/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                scrolled ? 'w-16 h-16' : 'w-20 h-20'
              }`}>
                <span className={`text-primary-foreground font-bold transition-all duration-300 ${
                  scrolled ? 'text-2xl' : 'text-3xl'
                }`}>
                  T
                </span>
              </div>
            </Link>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            <Link to="/about" className="font-semibold text-foreground hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link to="/contact" className="font-semibold text-foreground hover:text-primary transition-colors">
              Contacto
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="font-semibold text-foreground hover:text-primary hover:bg-accent transition-colors">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Contactar
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center absolute right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-accent transition-colors"
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
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <button
                onClick={handleFeaturesClick}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-semibold"
              >
                Características
              </button>
              <Link
                to="/faq"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-4 border-t border-border space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-md text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
