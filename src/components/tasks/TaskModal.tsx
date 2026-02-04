
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
  isSaving?: boolean;
}

export const TaskModal = ({ isOpen, onClose, task, onSave, isSaving }: TaskModalProps) => {
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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/10 rounded-[2rem] shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">
            {task ? 'Actualizar Protocolo' : 'Nueva Solicitud'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Título del Protocolo *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Análisis de flujo de datos"
                required
                className="bg-white/5 border-white/10 text-white focus:ring-blue-500/50 rounded-xl h-12"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Descripción Detallada *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los protocolos técnicos..."
                rows={4}
                className="w-full px-4 py-3 border border-white/10 bg-white/5 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Tipo de Requerimiento
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TaskType })}
                className="w-full bg-white/5 px-4 py-3 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              >
                <option value="desarrollo" className="bg-slate-900">Desarrollo</option>
                <option value="agente" className="bg-slate-900">Agente IA</option>
                <option value="soporte" className="bg-slate-900">Soporte</option>
                <option value="pqr" className="bg-slate-900">PQR</option>
                <option value="consultoria" className="bg-slate-900">Consultoría</option>
                <option value="capacitacion" className="bg-slate-900">Capacitación</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
              <Button type="button" variant="ghost" onClick={onClose} className="px-6 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-black text-[10px] uppercase tracking-widest uppercase">
                Anular
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                {isSaving ? 'Sincronizando...' : (task ? 'Actualizar Protocolo' : 'Emitir Solicitud')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
