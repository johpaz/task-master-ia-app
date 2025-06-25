import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login({ email: formData.email, password: formData.password });
      
      if (success) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        navigate(from, { replace: true });
      } else {
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to home */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al inicio
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-2xl">T</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-muted-foreground">
            Accede a tu cuenta de TaskMaster IA
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Credenciales de prueba:</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div><strong className="text-foreground">Admin:</strong> admin@tuprofedeai.com</div>
            <div><strong className="text-foreground">Manager:</strong> manager@tuprofedeai.com</div>
            <div><strong className="text-foreground">Colaborador:</strong> dev@tuprofedeai.com</div>
            <div><strong className="text-foreground">Cliente:</strong> cliente@empresa.com</div>
            <div className="pt-1"><strong className="text-foreground">Contraseña:</strong> password123</div>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6 bg-card p-6 rounded-lg shadow-lg border" onSubmit={handleSubmit}>
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
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
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
              />
              <Label htmlFor="rememberMe" className="text-sm text-foreground">
                Recordarme
              </Label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas una cuenta?{' '}
              <a href="mailto:hola@tuprofedeai.com" className="text-primary hover:text-primary/80">
                Contacta con nosotros
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};