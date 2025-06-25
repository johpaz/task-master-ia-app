import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
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
import { Contact } from "./pages/public/Contact";
import { Login } from "./pages/auth/Login";

// App Pages
import { Dashboard } from "./pages/app/Dashboard";
import { Tasks } from "./pages/app/Tasks";
import { Kanban } from "./pages/app/Kanban";
import { Calendar } from "./pages/app/Calendar";
import { Reports } from "./pages/app/Reports";
import { Users } from "./pages/app/Users";
import { Settings } from "./pages/app/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
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
              
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Tasks />
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
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;