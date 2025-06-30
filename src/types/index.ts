
export type UserRole = 'admin' | 'manager' | 'collaborator' | 'client';
export type TaskStatus = 'por hacer' | 'en progreso' | 'en revisión' | 'completada' | 'cancelada';
export type TaskType = 'desarrollo' | 'agente' | 'soporte' | 'pqr' | 'consultoria' | 'capacitacion';
export type TaskPriority = 'baja' | 'media' | 'alta' | 'urgente';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  assignedTo: string;
  assignedBy: string;
  client: string;
  createdAt: string;
  updatedAt: string;
  endDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags?: string[];
  comments?: TaskComment[];
  attachments?: TaskAttachment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface TaskAttachment {
  id: string;
  taskId: string;
  fileName: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Metrics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  totalUsers: number;
  activeUsers: number;
  tasksThisMonth: number;
  completionRate: number;
}

export interface DashboardMetrics extends Metrics {
  overdueCovers: number;
}

export interface CreateTaskData {
  title: string;
  description: string;
  type: TaskType;
  client: string;
  assignedBy: string;
  priority?: TaskPriority;
  endDate?: string;
  estimatedHours?: number;
  tags?: string[];
}

export interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  phone?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  status?: 'active' | 'inactive';
}
