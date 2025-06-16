
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'collaborator' | 'client';
  avatar?: string;
  department?: string;
  createdAt: Date;
  token?: string
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'desarrollo' | 'agente' | 'soporte' | 'pqr' | 'consultoria' | 'capacitacion';
  status: 'pendiente' | 'en_progreso' | 'revision' | 'completada' | 'cancelada';
  priority: 'baja' | 'media' | 'alta' | 'urgente';
  assignedTo: string;
  assignedBy: string;
  client?: string;
  startDate: Date;
  endDate: Date;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  attachments: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface AuthForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface DashboardMetrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  overdueCovers: number;
  averageCompletionTime: number;
}
