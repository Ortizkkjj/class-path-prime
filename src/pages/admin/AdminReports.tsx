import { useState } from "react";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { students, disciplines, grades, turmas, getAbsenceCount } from "@/data/mockData";
import { toast } from "sonner";

export default function AdminReports() {
  const [filterTurma, setFilterTurma] = useState("all");
  const [filterDiscipline, setFilterDiscipline] = useState("all");

  const filteredStudents = students.filter(s => filterTurma === "all" || s.turma === filterTurma);
  const filteredDisciplines = disciplines.filter(d => (filterTurma === "all" || d.turma === filterTurma) && (filterDiscipline === "all" || d.id === filterDiscipline));

  const reportData = filteredStudents.flatMap(s =>
    filteredDisciplines.map(d => {
      const g = grades.find(gr => gr.studentId === s.id && gr.disciplineId === d.id);
      if (!g) return null;
      const faltas = getAbsenceCount(s.id, d.id);
      return { student: s.name, turma: s.turma, discipline: d.name, media: g.media, faltas, status: g.media !== null && g.media >= 6 ? "Aprovado" : "Reprovado" };
    }).filter(Boolean)
  );

  const handleExportPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Relatório Acadêmico - EduControle", 14, 20);
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 28);
    autoTable(doc, {
      startY: 35,
      head: [["Aluno", "Turma", "Disciplina", "Média", "Faltas", "Situação"]],
      body: reportData.map((r: any) => [r.student, r.turma, r.discipline, r.media?.toFixed(1), r.faltas, r.status]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 82, 143] },
    });
    doc.save("relatorio-academico.pdf");
    toast.success("PDF exportado com sucesso!");
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-subtitle">Filtros e exportação de dados acadêmicos</p>
        </div>
        <Button onClick={handleExportPDF} disabled={reportData.length === 0}><Download className="w-4 h-4 mr-2" /> Exportar PDF</Button>
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Filter className="w-4 h-4" /> Filtros</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs">Turma</Label>
              <Select value={filterTurma} onValueChange={setFilterTurma}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {turmas.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Disciplina</Label>
              <Select value={filterDiscipline} onValueChange={setFilterDiscipline}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {disciplines.filter(d => filterTurma === "all" || d.turma === filterTurma).map(d => <SelectItem key={d.id} value={d.id}>{d.name} ({d.turma})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Período</Label>
              <Select defaultValue="2024-1">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-1">2024 - 1º Semestre</SelectItem>
                  <SelectItem value="2024-2">2024 - 2º Semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Aluno</th><th>Turma</th><th>Disciplina</th><th>Média</th><th>Faltas</th><th>Situação</th></tr></thead>
          <tbody>
            {reportData.map((r: any, i) => (
              <tr key={i}>
                <td className="font-medium">{r.student}</td>
                <td><span className="status-badge bg-primary/10 text-primary">{r.turma}</span></td>
                <td>{r.discipline}</td>
                <td className={`font-semibold ${r.media >= 6 ? "text-success" : "text-destructive"}`}>{r.media?.toFixed(1)}</td>
                <td>{r.faltas}</td>
                <td><span className={`status-badge ${r.status === "Aprovado" ? "status-approved" : "status-failed"}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {reportData.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">Nenhum dado encontrado para os filtros selecionados.</p>}
      </div>
    </div>
  );
}
