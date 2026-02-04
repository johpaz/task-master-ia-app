import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ArrowLeft, Loader2, Mail, Shield, CheckCircle2, Zap } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
                        to="/login"
                        className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-300 font-bold text-sm"
                    >
                        <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Volver a la Autenticación
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
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] border border-white/20"
                                >
                                    <Mail className="text-white w-10 h-10" />
                                </motion.div>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                                    Recuperar<br />Sistema
                                </h2>
                                <p className="text-slate-400 font-semibold tracking-tight">
                                    Generación de <span className="text-blue-400 font-bold">Token de Acceso</span>
                                </p>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    <div className="space-y-6">
                                        <div className="space-y-2.5">
                                            <Label htmlFor="email" className="text-slate-300 font-bold text-xs uppercase tracking-[0.2em] ml-1">Email Corporativo</Label>
                                            <div className="group relative">
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="tu@taskmasterapp.cloud"
                                                    className="bg-white/5 border-white/5 rounded-2xl h-14 px-5 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl">
                                            <p className="text-xs font-semibold text-slate-400 leading-relaxed text-center italic">
                                                "Se enviará un protocolo de restablecimiento seguro a esta dirección si existe en nuestros registros."
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all duration-500 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] hover:scale-[1.02] hover:translate-y-[-2px] active:scale-95 disabled:grayscale disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center space-x-3">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>Transmitiendo...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-3">
                                                <Zap className="w-5 h-5 fill-white" />
                                                <span>Enviar Instrucciones</span>
                                            </div>
                                        )}
                                    </Button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-8"
                                >
                                    <div className="py-8 space-y-6">
                                        <div className="flex justify-center">
                                            <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]">
                                                <CheckCircle2 size={40} />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-black text-white">Transmisión Exitosa</h3>
                                            <p className="text-slate-400 font-semibold leading-relaxed">
                                                Hemos enviado los protocolos de recuperación a:<br />
                                                <span className="text-blue-400 font-black">{email}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest bg-white/5 py-3 rounded-xl">
                                            Revisa tu Inbox y Spam
                                        </p>
                                        <Button asChild className="w-full h-14 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black transition-all">
                                            <Link to="/login">Regresar a Consola</Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Security badges */}
                <div className="flex justify-center items-center space-x-8 opacity-40 pt-4">
                    <div className="flex items-center space-x-2">
                        <Shield size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Recovery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-slate-400 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">v2.4 Core</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
