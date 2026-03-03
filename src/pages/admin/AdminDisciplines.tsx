import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { disciplines as initialDisciplines, turmas, Discipline } from "@/data/mockData";
import { toast } from "sonner";

export default function AdminDisciplines() {
  const [list, setList] = useState<Discipline[]>(initialDisciplines);
  const [open, setOpen] = useState(false);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const d: Discipline = {
      id: `d${Date.now()}`,
      name: fd.get("name") as string,
      code: fd.get("code") as string,
      turma: fd.get("turma") as string,
      professor: fd.get("professor") as string,
      professorId: `p${Date.now()}`,
      cargaHoraria: Number(fd.get("cargaHoraria")),
    };
    setList([...list, d]);
    setOpen(false);
    toast.success("Disciplina cadastrada com sucesso!");
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Cadastro de Disciplinas</h1>
          <p className="page-subtitle">{list.length} disciplinas cadastradas</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" /> Nova Disciplina</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Cadastrar Disciplina</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div><Label>Nome da Disciplina</Label><Input name="name" required className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Código</Label><Input name="code" required className="mt-1" placeholder="MAT301" /></div>
                <div>
                  <Label>Turma</Label>
                  <select name="turma" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {turmas.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div><Label>Professor Responsável</Label><Input name="professor" required className="mt-1" /></div>
              <div><Label>Carga Horária (horas)</Label><Input name="cargaHoraria" type="number" required className="mt-1" /></div>
              <Button type="submit" className="w-full">Cadastrar Disciplina</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>Código</th><th>Disciplina</th><th>Turma</th><th>Professor</th><th>Carga Horária</th></tr></thead>
          <tbody>
            {list.map(d => (
              <tr key={d.id}>
                <td className="font-mono text-xs">{d.code}</td>
                <td className="font-medium">{d.name}</td>
                <td><span className="status-badge bg-primary/10 text-primary">{d.turma}</span></td>
                <td>{d.professor}</td>
                <td>{d.cargaHoraria}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
