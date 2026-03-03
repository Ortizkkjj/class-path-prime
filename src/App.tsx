import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminDisciplines from "./pages/admin/AdminDisciplines";
import AdminReports from "./pages/admin/AdminReports";
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";
import ProfessorGrades from "./pages/professor/ProfessorGrades";
import ProfessorAttendance from "./pages/professor/ProfessorAttendance";
import AlunoBoletim from "./pages/aluno/AlunoBoletim";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user!.role)) return <Navigate to="/" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/admin" replace /> : <Login />} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/alunos" element={<ProtectedRoute allowedRoles={["admin"]}><AdminStudents /></ProtectedRoute>} />
      <Route path="/admin/disciplinas" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDisciplines /></ProtectedRoute>} />
      <Route path="/admin/relatorios" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReports /></ProtectedRoute>} />
      <Route path="/professor" element={<ProtectedRoute allowedRoles={["professor"]}><ProfessorDashboard /></ProtectedRoute>} />
      <Route path="/professor/notas" element={<ProtectedRoute allowedRoles={["professor"]}><ProfessorGrades /></ProtectedRoute>} />
      <Route path="/professor/frequencia" element={<ProtectedRoute allowedRoles={["professor"]}><ProfessorAttendance /></ProtectedRoute>} />
      <Route path="/aluno" element={<ProtectedRoute allowedRoles={["aluno"]}><AlunoBoletim /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
