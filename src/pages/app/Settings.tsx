
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Save, User, Lock, Bell } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';
import { settingsService } from '../../services/settingsService';

const countries = [
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Peru', code: '+51', flag: '🇵🇪' },
  { name: 'Bolivia', code: '+591', flag: '🇧🇴' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
];

export const Settings = () => {
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();
  const { search } = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      // Separar el código de país del número de teléfono
      const country = countries.find(c => user.phone?.startsWith(c.code));
      const phoneNum = country ? user.phone.slice(country.code.length) : user.phone;

      setPhoneCode(country ? country.code : countries[0].code);
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        department: user.department || '',
        company: user.company || '',
        phone: phoneNum || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const [phoneCode, setPhoneCode] = useState(countries[0].code);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    company: user?.company || '',
    phone: '',
    bio: ''
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskAssigned: true,
    taskCompleted: true,
    deadlineReminder: true,
    weeklyReport: false
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const fullPhone = `${phoneCode}${profileData.phone}`;
      const updatedProfileData = { ...profileData, phone: fullPhone };
      const updatedUser = await settingsService.updateProfile(user.id, updatedProfileData);
      setUser(updatedUser);
      toast({
        title: 'Perfil actualizado',
        description: 'Tu perfil ha sido actualizado correctamente.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar tu perfil.',
        variant: 'destructive',
      });
    }
  };

  const handleChangePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await settingsService.changePassword(securityData);
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña ha sido actualizada correctamente.',
      });
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar tu contraseña.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveNotifications = async () => {
    if (!user) return;
    try {
      await settingsService.updateNotificationSettings(user.id, notificationSettings);
      toast({
        title: 'Notificaciones actualizadas',
        description: 'Tu configuración de notificaciones ha sido actualizada.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar tu configuración de notificaciones.',
        variant: 'destructive',
      });
    }
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Seguridad', icon: Lock },
    { id: 'notifications', label: 'Notificaciones', icon: Bell }
  ];

  // Filter tabs based on user role
  const availableTabs = tabs.filter(tab => {
    if (user?.role === 'client' && tab.id === 'security') {
      return false; // Clients can't change password in this demo
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-sm">
          Configuración
        </h1>
        <p className="text-slate-400 font-medium">Gestiona tu cuenta y preferencias de acceso</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white/[0.03] backdrop-blur-3xl border-white/10 rounded-[2rem] overflow-hidden">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <tab.icon className={`mr-3 h-4 w-4 ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card className="bg-white/[0.03] backdrop-blur-3xl border-white/10 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center text-white font-black tracking-tight">
                  <User className="mr-3 h-5 w-5 text-blue-400" />
                  Información del Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                      Nombre Completo
                    </label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="tu@email.com"
                      disabled={user?.role === 'client'}
                      className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                      Departamento
                    </label>
                    <Input
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      placeholder="Tu departamento"
                      disabled={user?.role === 'client'}
                      className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                      Empresa
                    </label>
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      placeholder="Nombre de tu empresa"
                      className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                      Teléfono
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        className="w-1/3 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-xs font-bold"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code} className="bg-slate-900">
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="300 123 4567"
                        className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                    Biografía
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 px-4 py-3 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all text-sm font-medium"
                    placeholder="Cuéntanos un poco sobre ti..."
                  />
                </div>

                <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl px-8 h-12 font-black text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-blue-600/20 flex items-center gap-3">
                  <Save className="h-4 w-4" />
                  Guardar Perfil
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && user?.role !== 'client' && (
            <Card className="bg-white/[0.03] backdrop-blur-3xl border-white/10 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center text-white font-black tracking-tight">
                  <Lock className="mr-3 h-5 w-5 text-rose-400" />
                  Seguridad de Cuenta
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                    Contraseña Actual
                  </label>
                  <Input
                    type="password"
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                    Nueva Contraseña
                  </label>
                  <Input
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">
                    Confirmar Nueva Contraseña
                  </label>
                  <Input
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 rounded-2xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
                  />
                </div>

                <Button onClick={handleChangePassword} className="bg-rose-600 hover:bg-rose-500 text-white rounded-2xl px-8 h-12 font-black text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-rose-600/20 flex items-center gap-3">
                  <Lock className="h-4 w-4" />
                  Actualizar Acceso
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="bg-white/[0.03] backdrop-blur-3xl border-white/10 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center text-white font-black tracking-tight">
                  <Bell className="mr-3 h-5 w-5 text-emerald-400" />
                  Preferencias de Alertas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  {Object.entries({
                    emailNotifications: { title: "Notificaciones por Email", desc: "Recibir alertas generales en tu buzón" },
                    taskAssigned: { title: "Tarea Asignada", desc: "Cuando se te asigne una nueva responsabilidad" },
                    taskCompleted: { title: "Tarea Completada", desc: "Cuando finalice una gestión que iniciaste" },
                    deadlineReminder: { title: "Recordatorio Crítico", desc: "Alertas 24 horas antes del vencimiento" },
                    weeklyReport: { title: "Reporte de Inteligencia", desc: "Resumen ejecutivo cada inicio de semana" }
                  }).map(([key, info]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <div>
                        <h4 className="text-sm font-black text-white">{info.title}</h4>
                        <p className="text-xs text-slate-500">{info.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings[key as keyof typeof notificationSettings]}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })}
                        className="h-5 w-5 bg-slate-800 border-white/10 rounded-lg text-blue-600 focus:ring-blue-500/30 transition-all cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={handleSaveNotifications} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl px-8 h-12 font-black text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-emerald-600/20 flex items-center gap-3">
                  <Save className="h-4 w-4" />
                  Preservar Ajustes
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
