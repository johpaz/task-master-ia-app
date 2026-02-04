import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Eye, EyeOff, Loader2, KeyRound, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast({
                title: "Token ausente",
                description: "El enlace de recuperación no es válido. Por favor solicita uno nuevo.",
                variant: "destructive",
            });
            // We don't navigate immediately to give user time to read
        }
    }, [token, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            toast({
                title: "Contraseña muy corta",
                description: "La contraseña debe tener al menos 6 caracteres.",
                variant: "destructive",
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Contraseñas no coinciden",
                description: "Asegúrate de que ambas contraseñas sean iguales.",
                variant: "destructive",
            });
            return;
        }

        if (!token) return;

        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    newPassword: formData.password
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                toast({
                    title: "Contraseña actualizada",
                    description: "Tu contraseña ha sido restablecida correctamente. Ya puedes iniciar sesión.",
                });
                setTimeout(() => navigate('/login'), 3000);
            } else {
                const errorData = await response.json();
                toast({
                    title: "Error",
                    description: errorData.message || "No se pudo restablecer la contraseña. El enlace puede haber expirado.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error de conexión",
                description: "No se pudo contactar con el servidor.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-lg shadow-lg border">
                    <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
                    <h2 className="text-2xl font-bold">Enlace inválido</h2>
                    <p className="text-muted-foreground">
                        Este enlace de recuperación ha expirado o no es válido.
                    </p>
                    <Button asChild className="w-full">
                        <Link to="/forgot-password">Solicitar nuevo enlace</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 dark:from-gray-900 dark:via-gray-800/30 dark:to-primary/20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <KeyRound className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                        Nueva Contraseña
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Crea una nueva contraseña segura para tu cuenta
                    </p>
                </div>

                {/* Form */}
                <div className="bg-card p-6 rounded-lg shadow-lg border dark:border-gray-700">
                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="password">Nueva contraseña</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Mínimo 6 caracteres"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Repite tu contraseña"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Restableciendo...
                                    </>
                                ) : 'Restablecer contraseña'}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg inline-block">
                                ¡Contraseña restablecida!
                            </div>
                            <p className="text-muted-foreground">
                                Tu contraseña ha sido cambiada con éxito. Serás redirigido al inicio de sesión en unos segundos...
                            </p>
                            <Button asChild className="w-full mt-4">
                                <Link to="/login">Ir al Login ahora</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
