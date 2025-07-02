import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'; // Agregar Loader2
import { useToast } from '../../hooks/use-toast';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.email.includes('@') || formData.password.length < 6) {
      toast({
        title: "Datos inválidos",
        description: "Por favor ingresa un email válido y contraseña de al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    // Verificar si la cuenta está bloqueada
    if (isLocked) {
      toast({
        title: "Cuenta bloqueada temporalmente",
        description: "Demasiados intentos fallidos. Intenta nuevamente en 5 minutos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { success, redirectTo } = await login({ 
        email: formData.email, 
        password: formData.password 
      });
      
      if (success) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        navigate(redirectTo || from, { replace: true });
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setTimeout(() => setIsLocked(false), 300000); // 5 minutos
        }
        
        toast({
          title: "Error de autenticación",
          description: "Email o contraseña incorrectos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 dark:from-gray-900 dark:via-gray-800/30 dark:to-primary/20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to home */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="Volver al inicio"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al inicio
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="logoDash.png" 
              alt="Logo TaskMaster IA" 
              className="h-17 w-17 rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-muted-foreground">
            Accede a tu cuenta de TaskMaster IA
          </p>
        </div>

        {/* Form */}
        <form 
          className="mt-8 space-y-6 bg-card p-6 rounded-lg shadow-lg border dark:border-gray-700" 
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-foreground">Email corporativo</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@tuprofedeai.com"
                className="mt-1"
                disabled={isLocked}
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-foreground">Contraseña</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  className="pr-10"
                  disabled={isLocked}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  disabled={isLocked}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                }
                disabled={isLocked}
              />
              <Label htmlFor="rememberMe" className="text-sm text-foreground">
                Recordarme
              </Label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80"
              aria-label="Recuperar contraseña"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading || isLocked}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : isLocked ? 'Cuenta bloqueada' : 'Iniciar Sesión'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas una cuenta?{' '}
              <a 
                href="mailto:hola@tuprofedeai.com" 
                className="text-primary hover:text-primary/80"
                aria-label="Contactar al soporte"
              >
                Contacta con nosotros
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};