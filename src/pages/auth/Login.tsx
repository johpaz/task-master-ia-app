import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft, Loader2, Zap, Shield, Lock } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

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

    if (!formData.email.includes('@') || formData.password.length < 6) {
      toast({
        title: "Datos inválidos",
        description: "Por favor ingresa un email válido y contraseña de al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

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
          setTimeout(() => setIsLocked(false), 300000);
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.15]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.2),transparent_70%)]"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-300 font-bold text-sm"
          >
            <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Volver a la Terminal
          </Link>
        </motion.div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/5 relative overflow-hidden group">
          {/* Internal corner glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl transition-opacity group-hover:bg-blue-500/20 duration-500"></div>

          <div className="relative z-10 space-y-10">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] border border-white/20"
                >
                  <Lock className="text-white w-10 h-10" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white tracking-tight">
                  Autenticación
                </h2>
                <p className="text-slate-400 font-semibold tracking-tight">
                  Consola Central <span className="text-blue-400">TaskMaster</span>
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-slate-300 font-bold text-xs uppercase tracking-[0.2em] ml-1">Identidad Corporativa</Label>
                  <div className="group relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@taskmasterapp.cloud"
                      disabled={isLocked}
                      className="bg-white/5 border-white/5 rounded-2xl h-14 px-5 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="text-slate-300 font-bold text-xs uppercase tracking-[0.2em]">Llave de Acceso</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      ¿Olvidaste la llave?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      disabled={isLocked}
                      className="bg-white/5 border-white/5 rounded-2xl h-14 pl-5 pr-12 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLocked}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 ml-1">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  disabled={isLocked}
                  className="rounded-md border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="rememberMe" className="text-sm font-bold text-slate-400 cursor-pointer select-none">
                  Mantener sesión activa
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading || isLocked}
                className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all duration-500 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] hover:scale-[1.02] hover:translate-y-[-2px] active:scale-95 disabled:grayscale disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sincronizando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 fill-white" />
                    <span>Iniciar Sesión</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Footer info */}
            <div className="pt-6 border-t border-white/5 text-center">
              <p className="text-sm font-bold text-slate-500">
                ¿No tienes acceso?{' '}
                <a
                  href="mailto:hola@taskmasterapp.cloud"
                  className="text-blue-400 hover:text-blue-300 transition-colors ml-1"
                >
                  Contacta Soporte Técnico
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex justify-center items-center space-x-8 opacity-40">
          <div className="flex items-center space-x-2">
            <Shield size={14} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">End-to-End SSL</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock size={14} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Multi-Factor Ready</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};