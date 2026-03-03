import { motion } from "framer-motion";
import { GraduationCap, AlertTriangle, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { disciplines, grades, getAbsenceCount, getTotalClasses } from "@/data/mockData";

export default function AlunoBoletim() {
  const studentId = "s1"; // João Oliveira

  const studentGrades = grades.filter(g => g.studentId === studentId);
  const boletim = studentGrades.map(g => {
    const disc = disciplines.find(d => d.id === g.disciplineId);
    const faltas = getAbsenceCount(studentId, g.disciplineId);
    const total = getTotalClasses(g.disciplineId);
    const freq = total > 0 ? ((total - faltas) / total) * 100 : 100;
    const approved = g.media !== null && g.media >= 6 && freq >= 75;
    return { ...g, discipline: disc, faltas, totalAulas: total, frequencia: freq, approved };
  });

  const totalApproved = boletim.filter(b => b.approved).length;
  const avgGeneral = boletim.length > 0 ? (boletim.reduce((s, b) => s + (b.media || 0), 0) / boletim.length).toFixed(1) : "—";

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title flex items-center gap-2"><GraduationCap className="w-6 h-6 text-primary" /> Meu Boletim</h1>
        <p className="page-subtitle">João Oliveira — Matrícula: 2024001 — Turma: 3A</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Média Geral", value: avgGeneral, color: "text-primary" },
          { label: "Aprovações", value: `${totalApproved}/${boletim.length}`, color: "text-success" },
          { label: "Disciplinas", value: boletim.length, color: "text-info" },
        ].map(s => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card text-center">
            <p className={`stat-card-value ${s.color}`}>{s.value}</p>
            <p className="stat-card-label">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Disciplina</th><th className="text-center">N1</th><th className="text-center">N2</th><th className="text-center">N3</th><th className="text-center">N4</th>
              <th className="text-center">Média</th><th className="text-center">Faltas</th><th className="text-center">Freq.</th><th className="text-center">Situação</th>
            </tr>
          </thead>
          <tbody>
            {boletim.map(b => (
              <motion.tr key={b.disciplineId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={!b.approved ? "bg-red-50/30" : ""}>
                <td className="font-medium">
                  <div>{b.discipline?.name}</div>
                  <div className="text-xs text-muted-foreground">{b.discipline?.code}</div>
                </td>
                {([b.nota1, b.nota2, b.nota3, b.nota4] as (number | null)[]).map((n, i) => (
                  <td key={i} className={`text-center ${n !== null && n < 6 ? "text-destructive" : ""}`}>{n?.toFixed(1) ?? "—"}</td>
                ))}
                <td className={`text-center font-bold text-lg ${b.media !== null && b.media >= 6 ? "text-success" : "text-destructive"}`}>{b.media?.toFixed(1)}</td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span>{b.faltas}</span>
                    {b.frequencia < 75 && <AlertTriangle className="w-3 h-3 text-destructive" />}
                  </div>
                </td>
                <td className={`text-center font-medium ${b.frequencia < 75 ? "text-destructive" : "text-success"}`}>{b.frequencia.toFixed(0)}%</td>
                <td className="text-center">
                  <span className={`status-badge ${b.approved ? "status-approved" : "status-failed"}`}>
                    {b.approved ? "Aprovado" : "Reprovado"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {boletim.some(b => b.frequencia < 75) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="status-alert mt-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span><strong>Atenção:</strong> Você possui disciplinas com frequência abaixo de 75%. Compareça às aulas para evitar reprovação por falta.</span>
        </motion.div>
      )}

      {totalApproved === boletim.length && boletim.length > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
          <Award className="w-4 h-4" />
          <span><strong>Parabéns!</strong> Você está aprovado em todas as disciplinas.</span>
        </motion.div>
      )}
    </div>
  );
}
