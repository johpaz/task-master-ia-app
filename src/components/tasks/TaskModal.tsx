
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Task, TaskType } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  onSave: (data: any) => void;
}

export const TaskModal = ({ isOpen, onClose, task, onSave }: TaskModalProps) => {
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'desarrollo' as TaskType,
  });

  useEffect(() => {
    if (isOpen && !task) {
      setFormData({
        title: '',
        description: '',
        type: 'desarrollo',
      });
    } else if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        type: task.type,
      });
    }
  }, [isOpen, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      ...formData,
      client: user?.id || '',
      assignedBy: user?.id || '',
    };

    onSave(taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-whiteflex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {task ? 'Editar Tarea' : 'Nueva Tarea'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Desarrollar chatbot para e-commerce"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los detalles de la tarea..."
                rows={3}
                className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block  text-sm font-medium text-gray-700 mb-2">
                Tipo de Tarea
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TaskType})}
                className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desarrollo">Desarrollo</option>
                <option value="agente">Agente IA</option>
                <option value="soporte">Soporte</option>
                <option value="pqr">PQR</option>
                <option value="consultoria">Consultoría</option>
                <option value="capacitacion">Capacitación</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {task ? 'Actualizar Tarea' : 'Crear Tarea'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
