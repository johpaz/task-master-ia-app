
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="mr-3 h-4 w-4" />
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Información del Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      placeholder="tu@email.com"
                      disabled={user?.role === 'client'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento
                    </label>
                    <Input
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      placeholder="Tu departamento"
                      disabled={user?.role === 'client'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="flex">
                      <select
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="300 123 4567"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografía
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cuéntanos un poco sobre ti..."
                  />
                </div>

                <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && user?.role !== 'client' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña Actual
                  </label>
                  <Input
                    type="password"
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                    placeholder="Tu contraseña actual"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña
                  </label>
                  <Input
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                    placeholder="Nueva contraseña"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <Input
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>

                <Button onClick={handleChangePassword} className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Cambiar Contraseña
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones por Email</h4>
                      <p className="text-sm text-gray-500">Recibir notificaciones generales por email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tarea Asignada</h4>
                      <p className="text-sm text-gray-500">Cuando te asignen una nueva tarea</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.taskAssigned}
                      onChange={(e) => setNotificationSettings({...notificationSettings, taskAssigned: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tarea Completada</h4>
                      <p className="text-sm text-gray-500">Cuando se complete una tarea que creaste</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.taskCompleted}
                      onChange={(e) => setNotificationSettings({...notificationSettings, taskCompleted: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Recordatorio de Fecha Límite</h4>
                      <p className="text-sm text-gray-500">24 horas antes del vencimiento</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.deadlineReminder}
                      onChange={(e) => setNotificationSettings({...notificationSettings, deadlineReminder: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reporte Semanal</h4>
                      <p className="text-sm text-gray-500">Resumen de actividades cada lunes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReport}
                      onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReport: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Guardar Configuración
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
