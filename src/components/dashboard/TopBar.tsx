
import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuthStore } from '../../stores/authStore';

export const TopBar = () => {
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-600">
            Gestiona tus proyectos de IA y desarrollo
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Buscar tareas..."
              className="pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* New Task */}
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Nueva Tarea
          </Button>
        </div>
      </div>
    </header>
  );
};
