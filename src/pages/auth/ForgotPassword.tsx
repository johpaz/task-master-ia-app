import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes('@')) {
            toast({
                title: "Email inválido",
                description: "Por favor ingresa un correo electrónico válido.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                toast({
                    title: "Correo enviado",
                    description: "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
                });
            } else {
                const errorData = await response.json();
                toast({
                    title: "Error",
                    description: errorData.message || "Ocurrió un error al procesar tu solicitud.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error de conexión",
                description: "No se pudo contactar con el servidor. Inténtalo más tarde.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 dark:from-gray-900 dark:via-gray-800/30 dark:to-primary/20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Back to login */}
                <div className="flex items-center">
                    <Link
                        to="/login"
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Volver al inicio de sesión
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Mail className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                        Recuperar Contraseña
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Ingresa tu email para recibir un enlace de recuperación
                    </p>
                </div>

                {/* Form */}
                <div className="bg-card p-6 rounded-lg shadow-lg border dark:border-gray-700">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="text-foreground">Email corporativo</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@taskmasterapp.cloud"
                                    className="mt-1"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Enviando...
                                    </>
                                ) : 'Enviar enlace'}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg inline-block">
                                ¡Correo enviado con éxito!
                            </div>
                            <p className="text-muted-foreground">
                                Hemos enviado las instrucciones a <strong>{email}</strong>. Por favor revisa tu bandeja de entrada y la carpeta de spam.
                            </p>
                            <Button asChild variant="outline" className="w-full mt-4">
                                <Link to="/login">Ir al Login</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
