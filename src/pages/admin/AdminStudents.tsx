import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students as initialStudents, turmas, Student } from "@/data/mockData";
import { toast } from "sonner";

export default function AdminStudents() {
  const [studentList, setStudentList] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [filterTurma, setFilterTurma] = useState("all");
  const [open, setOpen] = useState(false);

  const filtered = studentList.filter(s =>
    (filterTurma === "all" || s.turma === filterTurma) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.matricula.includes(search))
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newStudent: Student = {
      id: `s${Date.now()}`,
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      matricula: fd.get("matricula") as string,
      turma: fd.get("turma") as string,
      cpf: fd.get("cpf") as string,
      dataNascimento: fd.get("dataNascimento") as string,
      telefone: fd.get("telefone") as string,
      endereco: fd.get("endereco") as string,
    };
    setStudentList([...studentList, newStudent]);
    setOpen(false);
    toast.success("Aluno cadastrado com sucesso!");
  };

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Cadastro de Alunos</h1>
          <p className="page-subtitle">{studentList.length} alunos cadastrados</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Novo Aluno</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="flex items-center gap-2"><UserPlus className="w-5 h-5" /> Cadastrar Aluno</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                  <span className="text-xs text-muted-foreground">Foto</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><Label>Nome Completo</Label><Input name="name" required className="mt-1" /></div>
                <div><Label>Matrícula</Label><Input name="matricula" required className="mt-1" /></div>
                <div><Label>CPF</Label><Input name="cpf" placeholder="000.000.000-00" className="mt-1" /></div>
                <div><Label>Data de Nascimento</Label><Input name="dataNascimento" type="date" className="mt-1" /></div>
                <div>
                  <Label>Turma</Label>
                  <select name="turma" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {turmas.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2"><Label>E-mail</Label><Input name="email" type="email" className="mt-1" /></div>
                <div><Label>Telefone</Label><Input name="telefone" className="mt-1" /></div>
                <div><Label>Endereço</Label><Input name="endereco" className="mt-1" /></div>
              </div>
              <Button type="submit" className="w-full">Cadastrar Aluno</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou matrícula..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterTurma} onValueChange={setFilterTurma}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas turmas</SelectItem>
            {turmas.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Matrícula</th><th>Nome</th><th>Turma</th><th>E-mail</th><th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map(s => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <td className="font-mono text-xs">{s.matricula}</td>
                  <td className="font-medium">{s.name}</td>
                  <td><span className="status-badge bg-primary/10 text-primary">{s.turma}</span></td>
                  <td className="text-muted-foreground">{s.email}</td>
                  <td className="text-muted-foreground">{s.telefone}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">Nenhum aluno encontrado.</p>}
      </div>
    </div>
  );
}
