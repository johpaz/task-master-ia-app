import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User } from '../../types';
import { CreateUserRequest, UpdateUserRequest } from '../../services/userService';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: CreateUserRequest | UpdateUserRequest) => void;
  user?: User | null;
  isLoading?: boolean;
}

export const UserModal = ({ isOpen, onClose, onSave, user, isLoading }: UserModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'collaborator' as 'admin' | 'manager' | 'collaborator' | 'client',
    department: '',
    company: '',
    phoneCode: '+57',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      // Extraer código y número de teléfono si existe
      let phoneCode = '+57';
      let phoneNumber = user.phone || '';
      
      // Verificar si el teléfono ya tiene código
      if (user.phone) {
        const supportedCodes = ['+57', '+1', '+52'];
        for (const code of supportedCodes) {
          if (user.phone.startsWith(code)) {
            phoneCode = code;
            phoneNumber = user.phone.slice(code.length);
            break;
          }
        }
      }

      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'collaborator',
        department: user.department || '',
        company: user.company || '',
        phone: phoneNumber,
        phoneCode: phoneCode,
        status: user.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'collaborator',
        department: '',
        company: '',
        phoneCode: '+57',
        phone: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!user && !formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }

    if (!user && formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Construir teléfono completo con código de país
    const fullPhone = `${formData.phoneCode}${formData.phone}`;

    if (user) {
      // Actualizar usuario existente
      const updateData: UpdateUserRequest = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        company: formData.company,
        phone: fullPhone,
        status: formData.status
      };
      onSave(updateData);
    } else {
      // Crear nuevo usuario
      const createData: CreateUserRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
        company: formData.company,
        phone: fullPhone
      };
      onSave(createData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa el nombre completo"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@tuprofedeai.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {!user && (
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>
          )}

          <div>
            <Label htmlFor="role">Rol</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="collaborator">Colaborador</option>
              <option value="manager">Manager</option>
              <option value="admin">Administrador</option>
              <option value="client">Cliente</option>
            </select>
          </div>

          <div>
            <Label htmlFor="department">Departamento (opcional)</Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Ej. Desarrollo, Soporte, etc."
            />
          </div>

          <div>
            <Label htmlFor="company">Empresa (opcional)</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Ej. TuProfeDeIA, Acme Inc."
            />
          </div>

          <div>
            <Label htmlFor="phone">Teléfono (opcional)</Label>
            <div className="flex">
             <select
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="w-1/4 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                
                <option value="+54">+54 🇦🇷 AR</option> 
                <option value="+591">+591 🇧🇴 BO</option> 
                <option value="+55">+55 🇧🇷 BR</option> 
                <option value="+56">+56 🇨🇱 CL</option> 
                <option value="+57">+57 🇨🇴 CO</option> 
                <option value="+506">+506 🇨🇷 CR</option> 
                <option value="+53">+53 🇨🇺 CU</option> 
                <option value="+593">+593 🇪🇨 EC</option> 
                <option value="+503">+503 🇸🇻 SV</option> 
                <option value="+502">+502 🇬🇹 GT</option> 
                <option value="+504">+504 🇭🇳 HN</option> 
                <option value="+52">+52 🇲🇽 MX</option> 
                <option value="+505">+505 🇳🇮 NI</option> 
                <option value="+507">+507 🇵🇦 PA</option> 
                <option value="+595">+595 🇵🇾 PY</option> 
                <option value="+51">+51 🇵🇪 PE</option> 
                <option value="+1">+1 🇩🇴 DO</option> 
                <option value="+598">+598 🇺🇾 UY</option>
                <option value="+58">+58 🇻🇪 VE</option> 
              </select>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="3001234567"
                className="flex-1 rounded-l-none"
              />
            </div>
          </div>
 
          {user && (
            <div>
              <Label htmlFor="status">Estado</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : (user ? 'Actualizar' : 'Crear Usuario')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};