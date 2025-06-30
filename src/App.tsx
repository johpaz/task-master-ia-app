import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route } from "react-router-dom";


// Layouts
import { PublicLayout } from "./layouts/PublicLayout";
import { AppLayout } from "./layouts/AppLayout";

// Route Guards
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { PublicRoute } from "./components/common/PublicRoute";

// Public Pages
import { LandingPage } from "./pages/public/LandingPage";
import { FAQ } from "./pages/public/FAQ";
import { About } from "./pages/public/About";
import { Contact } from "./pages/public/Contact";
import { Login } from "./pages/auth/Login";

// App Pages
import { Dashboard } from "./pages/app/Dashboard";
import { AdminDashboard } from "./pages/app/AdminDashboard";
import { ManagerDashboard } from "./pages/app/ManagerDashboard";
import { CollaboratorDashboard } from "./pages/app/CollaboratorDashboard";
import { ClientDashboard } from "./pages/app/ClientDashboard";
import { Tasks } from "./pages/app/Tasks";
import { TaskDetail } from "./pages/app/TaskDetail";
import { Kanban } from "./pages/app/Kanban";
import { Calendar } from "./pages/app/Calendar";
import { Reports } from "./pages/app/Reports";
import { Users } from "./pages/app/Users";
import { UserDetail } from "./pages/app/UserDetail";
import { Settings } from "./pages/app/Settings";
import { SystemLogs } from "./pages/app/SystemLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
 
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
         
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              
              <Route path="/" element={
                <PublicRoute>
                  <PublicLayout>
                    <LandingPage />
                  </PublicLayout>
                </PublicRoute>
              } />
              
              <Route path="/faq" element={
                <PublicRoute>
                  <PublicLayout>
                    <FAQ />
                  </PublicLayout>
                </PublicRoute>
              } />
              
              <Route path="/about" element={
                <PublicRoute>
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                </PublicRoute>
              } />

              <Route path="/contact" element={
                <PublicRoute>
                  <PublicLayout>
                    <Contact />
                  </PublicLayout>
                </PublicRoute>
              } />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/manager/dashboard" element={
                <ProtectedRoute requiredRoles={['manager']}>
                  <AppLayout>
                    <ManagerDashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/collaborator/dashboard" element={
                <ProtectedRoute requiredRoles={['collaborator']}>
                  <AppLayout>
                    <CollaboratorDashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/client/dashboard" element={
                <ProtectedRoute requiredRoles={['client']}>
                  <AppLayout>
                    <ClientDashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Tasks />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/tasks/:id" element={
                <ProtectedRoute>
                  <AppLayout>
                    <TaskDetail />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/kanban" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Kanban />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Calendar />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute requiredRoles={['admin', 'manager']}>
                  <AppLayout>
                    <Reports />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/users" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AppLayout>
                    <Users />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/users/:id" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AppLayout>
                    <UserDetail />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/logs" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AppLayout>
                    <SystemLogs />
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
         
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;