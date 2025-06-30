
export interface Task {
  id: string;
  title: string;
  status: 'por hacer' | 'en progreso' | 'en revisión' | 'completada' | 'cancelada';
  priority: 'baja' | 'media' | 'alta' | 'urgente';
  type: 'desarrollo' | 'agente' | 'soporte' | 'pqr' | 'consultoria' | 'capacitacion';
  description: string;
  assignedTo: string;
  assignedBy: string;
  client: string;
  startDate: string;
  endDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  attachments: string[];
  comments: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'colaborador' | 'cliente';
  department?: string;
  company?: string;
  phone?: string;
  bio?: string;
  createdAt?: string;
}

export interface DashboardMetrics {
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueCovers: number;
}

export interface Metrics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  averageCompletionTime: number;
}
