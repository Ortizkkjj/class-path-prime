import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, FileText, ClipboardList,
  CheckSquare, GraduationCap, LogOut, School
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Alunos", url: "/admin/alunos", icon: Users },
  { title: "Disciplinas", url: "/admin/disciplinas", icon: BookOpen },
  { title: "Relatórios", url: "/admin/relatorios", icon: FileText },
];

const professorItems = [
  { title: "Minhas Turmas", url: "/professor", icon: ClipboardList },
  { title: "Lançar Notas", url: "/professor/notas", icon: BookOpen },
  { title: "Frequência", url: "/professor/frequencia", icon: CheckSquare },
];

const alunoItems = [
  { title: "Boletim", url: "/aluno", icon: GraduationCap },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  if (!user) return null;

  const items = user.role === "admin" ? adminItems : user.role === "professor" ? professorItems : alunoItems;
  const roleLabel = user.role === "admin" ? "Administrador" : user.role === "professor" ? "Professor" : "Aluno";

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-3 px-3 py-4">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
              <School className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">EduControle</p>
                <p className="text-xs text-sidebar-muted truncate">{roleLabel}</p>
              </div>
            )}
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-xs uppercase tracking-wider">
            {!collapsed && "Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/admin" || item.url === "/professor" || item.url === "/aluno"} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-3 py-3">
          {!collapsed && (
            <div className="mb-3">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-muted truncate">{user.email}</p>
            </div>
          )}
          <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && "Sair"}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
