import { motion } from "framer-motion";
import { Users, BookOpen, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDisciplinesByProfessor, getStudentsByTurma } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfessorDashboard() {
  const { user } = useAuth();
  const myDisciplines = getDisciplinesByProfessor(user?.id || "");

  const turmasSet = new Set(myDisciplines.map(d => d.turma));
  const totalStudents = Array.from(turmasSet).reduce((acc, t) => acc + getStudentsByTurma(t).length, 0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Minhas Turmas</h1>
        <p className="page-subtitle">Bem-vindo(a), {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Disciplinas", value: myDisciplines.length, icon: BookOpen, color: "bg-primary/10 text-primary" },
          { label: "Turmas", value: turmasSet.size, icon: Clock, color: "bg-info/10 text-info" },
          { label: "Alunos", value: totalStudents, icon: Users, color: "bg-success/10 text-success" },
        ].map(s => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
            <div className="flex items-center justify-between">
              <div><p className="stat-card-value">{s.value}</p><p className="stat-card-label">{s.label}</p></div>
              <div className={`stat-card-icon ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myDisciplines.map(d => {
          const studentsInTurma = getStudentsByTurma(d.turma);
          return (
            <Card key={d.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{d.name}</span>
                  <span className="status-badge bg-primary/10 text-primary">{d.turma}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Código: {d.code}</span>
                  <span>{studentsInTurma.length} alunos</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Carga Horária: {d.cargaHoraria}h</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
