
import { ReactNode } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { UserModal } from '../components/users/UserModal';
import { TaskModal } from '../components/tasks/TaskModal';
import { useUserModalStore } from '../stores/userModalStore';
import { useTaskModalStore } from '../stores/taskModalStore';
import { userService, CreateUserRequest, UpdateUserRequest } from '../services/userService';
import { taskService, CreateTaskRequest, UpdateTaskRequest as UpdateTaskReq } from '../services/taskService';
import { useToast } from '../hooks/use-toast';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOpen: isUserModalOpen, closeModal: closeUserModal, editingUser } = useUserModalStore();
  const { isOpen: isTaskModalOpen, closeModal: closeTaskModal, editingTask } = useTaskModalStore();
  const { toast } = useToast();

  const handleSaveUser = async (userData: CreateUserRequest | UpdateUserRequest) => {
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, userData as UpdateUserRequest);
        toast({ title: "Usuario actualizado" });
      } else {
        await userService.createUser(userData as CreateUserRequest);
        toast({ title: "Usuario creado" });
      }
      closeUserModal();
    } catch (error) {
      toast({ title: "Error al guardar usuario", variant: "destructive" });
    }
  };

  const handleSaveTask = async (taskData: CreateTaskRequest | UpdateTaskReq) => {
    console.log('Saving task with data:', taskData); // <-- Debugging line
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, taskData as UpdateTaskReq);
        toast({ title: "Tarea actualizada" });
      } else {
        await taskService.createTask(taskData as CreateTaskRequest);
        toast({ title: "Tarea creada" });
      }
      closeTaskModal();
    } catch (error) {
      console.error('Error saving task:', error); // <-- Better error logging
      toast({ title: "Error al guardar la tarea", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
      <UserModal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        onSave={handleSaveUser}
        user={editingUser}
      />
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};
