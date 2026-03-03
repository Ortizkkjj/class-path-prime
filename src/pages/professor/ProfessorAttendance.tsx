import { useState } from "react";
import { Save, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDisciplinesByProfessor, getStudentsByTurma, getAbsenceCount, getTotalClasses } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfessorAttendance() {
  const { user } = useAuth();
  const myDisciplines = getDisciplinesByProfessor(user?.id || "");
  const [selectedDiscipline, setSelectedDiscipline] = useState(myDisciplines[0]?.id || "");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  const disc = myDisciplines.find(d => d.id === selectedDiscipline);
  const studentsInTurma = disc ? getStudentsByTurma(disc.turma) : [];
  const totalClasses = getTotalClasses(selectedDiscipline);

  const toggle = (studentId: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: prev[studentId] === undefined ? false : !prev[studentId] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Frequência registrada com sucesso!");
    setTimeout(() => setSaved(false), 2500);
  };

  const markAll = (present: boolean) => {
    const map: Record<string, boolean> = {};
    studentsInTurma.forEach(s => { map[s.id] = present; });
    setAttendance(map);
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Registro de Frequência</h1>
          <p className="page-subtitle">Marque presença ou falta dos alunos</p>
        </div>
        <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Salvar Frequência</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Select value={selectedDiscipline} onValueChange={v => { setSelectedDiscipline(v); setAttendance({}); }}>
          <SelectTrigger className="w-[300px]"><SelectValue placeholder="Selecione a disciplina" /></SelectTrigger>
          <SelectContent>
            {myDisciplines.map(d => <SelectItem key={d.id} value={d.id}>{d.name} - {d.turma}</SelectItem>)}
          </SelectContent>
        </Select>
        <div>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-[180px]" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => markAll(true)}>Todos presentes</Button>
          <Button variant="outline" size="sm" onClick={() => markAll(false)}>Todos ausentes</Button>
        </div>
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
            <CheckCircle className="w-4 h-4" /> Frequência salva para {date}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Aluno</th><th className="text-center">Presença</th><th className="text-center">Total de Faltas</th><th className="text-center">% Frequência</th><th></th></tr></thead>
          <tbody>
            {studentsInTurma.map(s => {
              const present = attendance[s.id] ?? true;
              const absences = getAbsenceCount(s.id, selectedDiscipline);
              const freq = totalClasses > 0 ? (((totalClasses - absences) / totalClasses) * 100) : 100;
              const alert = freq < 75;
              return (
                <tr key={s.id} className={alert ? "bg-red-50/50" : ""}>
                  <td className="font-medium">{s.name}</td>
                  <td className="text-center">
                    <button onClick={() => toggle(s.id)} className={`w-20 py-1 rounded-full text-xs font-medium transition-all ${present ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-red-100 text-red-700 hover:bg-red-200"}`}>
                      {present ? "Presente" : "Falta"}
                    </button>
                  </td>
                  <td className="text-center font-mono">{absences}</td>
                  <td className={`text-center font-semibold ${alert ? "text-destructive" : "text-success"}`}>{freq.toFixed(0)}%</td>
                  <td>
                    {alert && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="w-3 h-3" /> Excesso de faltas
                      </motion.div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
