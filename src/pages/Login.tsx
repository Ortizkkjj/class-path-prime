import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { School, ShieldCheck, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const roles: { value: UserRole; label: string; desc: string; icon: typeof ShieldCheck }[] = [
  { value: "admin", label: "Administrador", desc: "Gestão completa do sistema", icon: ShieldCheck },
  { value: "professor", label: "Professor", desc: "Notas e frequência", icon: BookOpen },
  { value: "aluno", label: "Aluno", desc: "Consulta de boletim", icon: GraduationCap },
];

const redirectMap: Record<UserRole, string> = { admin: "/admin", professor: "/professor", aluno: "/aluno" };

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate(redirectMap[selectedRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/30 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
            <School className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">EduControle</h1>
          <p className="text-sm text-muted-foreground mt-1">Sistema de Controle de Frequência e Notas</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Selecione o perfil</Label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button key={r.value} type="button" onClick={() => setSelectedRole(r.value)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${selectedRole === r.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                      <r.icon className={`w-5 h-5 mx-auto mb-1 ${selectedRole === r.value ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-xs font-medium block ${selectedRole === r.value ? "text-primary" : "text-muted-foreground"}`}>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="usuario@escola.edu.br" defaultValue={`${selectedRole}@escola.edu.br`} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" placeholder="••••••••" defaultValue="123456" className="mt-1" />
                </div>
              </div>

              <Button type="submit" className="w-full">Entrar</Button>
              <p className="text-xs text-center text-muted-foreground">Protótipo — clique em "Entrar" com qualquer perfil</p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
