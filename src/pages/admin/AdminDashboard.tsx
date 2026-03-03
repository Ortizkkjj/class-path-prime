import { motion } from "framer-motion";
import { Users, BookOpen, ClipboardList, AlertTriangle, TrendingUp, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { students, disciplines, turmas, grades } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total de Alunos", value: students.length, icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Disciplinas", value: disciplines.length, icon: BookOpen, color: "bg-info/10 text-info" },
  { label: "Turmas Ativas", value: turmas.length, icon: ClipboardList, color: "bg-success/10 text-success" },
  { label: "Alunos em Risco", value: grades.filter(g => g.media !== null && g.media < 6).length, icon: AlertTriangle, color: "bg-warning/10 text-warning" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const avgGrade = (grades.reduce((sum, g) => sum + (g.media || 0), 0) / grades.length).toFixed(1);
  const approvalRate = ((grades.filter(g => g.media !== null && g.media >= 6).length / grades.length) * 100).toFixed(0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Visão geral do sistema acadêmico</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-card-value">{s.value}</p>
                <p className="stat-card-label">{s.label}</p>
              </div>
              <div className={`stat-card-icon ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Indicadores Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Média Geral</span>
              <span className="text-lg font-bold text-foreground">{avgGrade}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Taxa de Aprovação</span>
              <span className="text-lg font-bold text-success">{approvalRate}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Professores Ativos</span>
              <span className="text-lg font-bold text-foreground">{new Set(disciplines.map(d => d.professor)).size}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /> Acesso Rápido</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              { label: "Cadastrar Aluno", path: "/admin/alunos", icon: Users },
              { label: "Cadastrar Disciplina", path: "/admin/disciplinas", icon: BookOpen },
              { label: "Ver Relatórios", path: "/admin/relatorios", icon: ClipboardList },
            ].map(a => (
              <button key={a.label} onClick={() => navigate(a.path)} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left">
                <a.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{a.label}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
