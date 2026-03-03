import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDisciplinesByProfessor, getStudentsByTurma, grades as allGrades, Grade } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfessorGrades() {
  const { user } = useAuth();
  const myDisciplines = getDisciplinesByProfessor(user?.id || "");
  const [selectedDiscipline, setSelectedDiscipline] = useState(myDisciplines[0]?.id || "");
  const [localGrades, setLocalGrades] = useState<Grade[]>([...allGrades]);
  const [savedRows, setSavedRows] = useState<Set<string>>(new Set());

  const disc = myDisciplines.find(d => d.id === selectedDiscipline);
  const studentsInTurma = disc ? getStudentsByTurma(disc.turma) : [];

  const getGrade = (studentId: string) => localGrades.find(g => g.studentId === studentId && g.disciplineId === selectedDiscipline);

  const updateNote = (studentId: string, field: keyof Grade, value: string) => {
    const num = value === "" ? null : Math.min(10, Math.max(0, Number(value)));
    setLocalGrades(prev => {
      const existing = prev.find(g => g.studentId === studentId && g.disciplineId === selectedDiscipline);
      if (existing) {
        const updated = { ...existing, [field]: num };
        const notes = [updated.nota1, updated.nota2, updated.nota3, updated.nota4].filter(n => n !== null) as number[];
        updated.media = notes.length > 0 ? Number((notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1)) : null;
        return prev.map(g => g.studentId === studentId && g.disciplineId === selectedDiscipline ? updated : g);
      }
      const newGrade: Grade = { studentId, disciplineId: selectedDiscipline, nota1: null, nota2: null, nota3: null, nota4: null, media: null, [field]: num };
      const notes = [newGrade.nota1, newGrade.nota2, newGrade.nota3, newGrade.nota4].filter(n => n !== null) as number[];
      newGrade.media = notes.length > 0 ? Number((notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1)) : null;
      return [...prev, newGrade];
    });
    setSavedRows(prev => { const n = new Set(prev); n.delete(studentId); return n; });
  };

  const handleSave = () => {
    const ids = new Set(studentsInTurma.map(s => s.id));
    setSavedRows(ids);
    toast.success("Notas salvas com sucesso!");
    setTimeout(() => setSavedRows(new Set()), 2000);
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Lançamento de Notas</h1>
          <p className="page-subtitle">Insira as notas parciais por disciplina</p>
        </div>
        <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Salvar Notas</Button>
      </div>

      <div className="mb-4">
        <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
          <SelectTrigger className="w-[300px]"><SelectValue placeholder="Selecione a disciplina" /></SelectTrigger>
          <SelectContent>
            {myDisciplines.map(d => <SelectItem key={d.id} value={d.id}>{d.name} - {d.turma}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr><th>Aluno</th><th className="w-20">N1</th><th className="w-20">N2</th><th className="w-20">N3</th><th className="w-20">N4</th><th className="w-24">Média</th><th className="w-24">Situação</th><th className="w-10"></th></tr>
          </thead>
          <tbody>
            {studentsInTurma.map(s => {
              const g = getGrade(s.id);
              const media = g?.media;
              return (
                <tr key={s.id}>
                  <td className="font-medium">{s.name}</td>
                  {(["nota1", "nota2", "nota3", "nota4"] as const).map(f => (
                    <td key={f}>
                      <Input type="number" min={0} max={10} step={0.1} className="w-16 h-8 text-center text-sm" value={g?.[f] ?? ""} onChange={e => updateNote(s.id, f, e.target.value)} />
                    </td>
                  ))}
                  <td className={`font-bold text-center ${media !== null && media !== undefined ? (media >= 6 ? "text-success" : "text-destructive") : ""}`}>
                    {media?.toFixed(1) ?? "—"}
                  </td>
                  <td>
                    {media !== null && media !== undefined && (
                      <span className={`status-badge ${media >= 6 ? "status-approved" : "status-failed"}`}>
                        {media >= 6 ? "Aprovado" : "Reprovado"}
                      </span>
                    )}
                  </td>
                  <td>
                    <AnimatePresence>
                      {savedRows.has(s.id) && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CheckCircle className="w-4 h-4 text-success" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {studentsInTurma.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">Selecione uma disciplina para ver os alunos.</p>}
      </div>
    </div>
  );
}
