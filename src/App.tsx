
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";

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
import { Login } from "./pages/auth/Login";

// App Pages
import { Dashboard } from "./pages/app/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/tasks" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Lista de Tareas</h1>
                    <p className="text-gray-600 mt-2">Próximamente disponible</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/kanban" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Tablero Kanban</h1>
                    <p className="text-gray-600 mt-2">Próximamente disponible</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/calendar" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Calendario</h1>
                    <p className="text-gray-600 mt-2">Próximamente disponible</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Reportes</h1>
                    <p className="text-gray-600 mt-2">Próximamente disponible</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                    <p className="text-gray-600 mt-2">Próximamente disponible</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Configuración</h1>
                    <p className="text-gray-600 mt-2">Próximamente disponible</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
