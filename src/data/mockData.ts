export interface Student {
  id: string;
  name: string;
  email: string;
  matricula: string;
  turma: string;
  foto?: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  endereco: string;
}

export interface Discipline {
  id: string;
  name: string;
  code: string;
  turma: string;
  professor: string;
  professorId: string;
  cargaHoraria: number;
}

export interface Grade {
  studentId: string;
  disciplineId: string;
  nota1: number | null;
  nota2: number | null;
  nota3: number | null;
  nota4: number | null;
  media: number | null;
}

export interface Attendance {
  studentId: string;
  disciplineId: string;
  date: string;
  present: boolean;
}

export const students: Student[] = [
  { id: "s1", name: "João Oliveira", email: "joao@email.com", matricula: "2024001", turma: "3A", cpf: "123.456.789-00", dataNascimento: "2006-03-15", telefone: "(11) 99999-1111", endereco: "Rua das Flores, 123" },
  { id: "s2", name: "Maria Santos", email: "maria@email.com", matricula: "2024002", turma: "3A", cpf: "234.567.890-11", dataNascimento: "2006-07-22", telefone: "(11) 99999-2222", endereco: "Av. Brasil, 456" },
  { id: "s3", name: "Pedro Costa", email: "pedro@email.com", matricula: "2024003", turma: "3A", cpf: "345.678.901-22", dataNascimento: "2006-01-10", telefone: "(11) 99999-3333", endereco: "Rua do Sol, 789" },
  { id: "s4", name: "Ana Lima", email: "ana@email.com", matricula: "2024004", turma: "3B", cpf: "456.789.012-33", dataNascimento: "2006-11-05", telefone: "(11) 99999-4444", endereco: "Rua da Paz, 321" },
  { id: "s5", name: "Lucas Ferreira", email: "lucas@email.com", matricula: "2024005", turma: "3B", cpf: "567.890.123-44", dataNascimento: "2006-09-18", telefone: "(11) 99999-5555", endereco: "Av. Central, 654" },
  { id: "s6", name: "Beatriz Almeida", email: "beatriz@email.com", matricula: "2024006", turma: "2A", cpf: "678.901.234-55", dataNascimento: "2007-04-25", telefone: "(11) 99999-6666", endereco: "Rua Nova, 987" },
  { id: "s7", name: "Gabriel Rocha", email: "gabriel@email.com", matricula: "2024007", turma: "2A", cpf: "789.012.345-66", dataNascimento: "2007-08-12", telefone: "(11) 99999-7777", endereco: "Rua Velha, 147" },
  { id: "s8", name: "Larissa Mendes", email: "larissa@email.com", matricula: "2024008", turma: "2B", cpf: "890.123.456-77", dataNascimento: "2007-02-28", telefone: "(11) 99999-8888", endereco: "Av. Liberdade, 258" },
];

export const disciplines: Discipline[] = [
  { id: "d1", name: "Matemática", code: "MAT301", turma: "3A", professor: "Prof. Ana Santos", professorId: "2", cargaHoraria: 80 },
  { id: "d2", name: "Português", code: "POR301", turma: "3A", professor: "Prof. Roberto Lima", professorId: "p2", cargaHoraria: 80 },
  { id: "d3", name: "Física", code: "FIS301", turma: "3A", professor: "Prof. Ana Santos", professorId: "2", cargaHoraria: 60 },
  { id: "d4", name: "Química", code: "QUI301", turma: "3B", professor: "Prof. Marcos Souza", professorId: "p3", cargaHoraria: 60 },
  { id: "d5", name: "História", code: "HIS301", turma: "3B", professor: "Prof. Ana Santos", professorId: "2", cargaHoraria: 60 },
  { id: "d6", name: "Matemática", code: "MAT201", turma: "2A", professor: "Prof. Ana Santos", professorId: "2", cargaHoraria: 80 },
  { id: "d7", name: "Biologia", code: "BIO201", turma: "2A", professor: "Prof. Carla Dias", professorId: "p4", cargaHoraria: 60 },
  { id: "d8", name: "Geografia", code: "GEO201", turma: "2B", professor: "Prof. Ana Santos", professorId: "2", cargaHoraria: 60 },
];

export const grades: Grade[] = [
  { studentId: "s1", disciplineId: "d1", nota1: 8.5, nota2: 7.0, nota3: 9.0, nota4: 8.0, media: 8.1 },
  { studentId: "s1", disciplineId: "d2", nota1: 6.0, nota2: 5.5, nota3: 7.0, nota4: 6.5, media: 6.3 },
  { studentId: "s1", disciplineId: "d3", nota1: 7.5, nota2: 8.0, nota3: 6.5, nota4: 7.0, media: 7.3 },
  { studentId: "s2", disciplineId: "d1", nota1: 9.0, nota2: 9.5, nota3: 8.5, nota4: 9.0, media: 9.0 },
  { studentId: "s2", disciplineId: "d2", nota1: 7.0, nota2: 8.0, nota3: 7.5, nota4: 8.5, media: 7.8 },
  { studentId: "s2", disciplineId: "d3", nota1: 6.0, nota2: 5.0, nota3: 4.5, nota4: 5.5, media: 5.3 },
  { studentId: "s3", disciplineId: "d1", nota1: 4.0, nota2: 3.5, nota3: 5.0, nota4: 4.5, media: 4.3 },
  { studentId: "s3", disciplineId: "d2", nota1: 7.5, nota2: 7.0, nota3: 8.0, nota4: 7.5, media: 7.5 },
  { studentId: "s3", disciplineId: "d3", nota1: 6.0, nota2: 6.5, nota3: 7.0, nota4: 6.0, media: 6.4 },
  { studentId: "s4", disciplineId: "d4", nota1: 8.0, nota2: 7.5, nota3: 9.0, nota4: 8.5, media: 8.3 },
  { studentId: "s4", disciplineId: "d5", nota1: 5.0, nota2: 4.5, nota3: 6.0, nota4: 5.5, media: 5.3 },
  { studentId: "s5", disciplineId: "d4", nota1: 9.5, nota2: 9.0, nota3: 8.5, nota4: 9.0, media: 9.0 },
  { studentId: "s5", disciplineId: "d5", nota1: 7.0, nota2: 7.5, nota3: 8.0, nota4: 7.0, media: 7.4 },
  { studentId: "s6", disciplineId: "d6", nota1: 8.0, nota2: 8.5, nota3: 7.5, nota4: 8.0, media: 8.0 },
  { studentId: "s6", disciplineId: "d7", nota1: 6.5, nota2: 7.0, nota3: 6.0, nota4: 7.5, media: 6.8 },
  { studentId: "s7", disciplineId: "d6", nota1: 3.5, nota2: 4.0, nota3: 5.0, nota4: 4.5, media: 4.3 },
  { studentId: "s7", disciplineId: "d7", nota1: 7.0, nota2: 8.0, nota3: 7.5, nota4: 7.0, media: 7.4 },
  { studentId: "s8", disciplineId: "d8", nota1: 9.0, nota2: 8.5, nota3: 9.5, nota4: 9.0, media: 9.0 },
];

const generateAttendanceDates = () => {
  const dates: string[] = [];
  for (let m = 2; m <= 6; m++) {
    for (let d = 1; d <= 28; d += 7) {
      dates.push(`2024-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
      dates.push(`2024-${String(m).padStart(2, "0")}-${String(d + 2).padStart(2, "0")}`);
    }
  }
  return dates;
};

const attendanceDates = generateAttendanceDates();

export const attendanceRecords: Attendance[] = [];

// Generate attendance for students in 3A (d1)
["s1", "s2", "s3"].forEach((sid) => {
  attendanceDates.forEach((date) => {
    const absentChance = sid === "s3" ? 0.35 : sid === "s1" ? 0.1 : 0.05;
    attendanceRecords.push({
      studentId: sid,
      disciplineId: "d1",
      date,
      present: Math.random() > absentChance,
    });
  });
});

["s4", "s5"].forEach((sid) => {
  attendanceDates.forEach((date) => {
    attendanceRecords.push({
      studentId: sid,
      disciplineId: "d4",
      date,
      present: Math.random() > 0.15,
    });
  });
});

export const turmas = ["2A", "2B", "3A", "3B"];

export const getStudentsByTurma = (turma: string) => students.filter((s) => s.turma === turma);
export const getDisciplinesByTurma = (turma: string) => disciplines.filter((d) => d.turma === turma);
export const getDisciplinesByProfessor = (professorId: string) => disciplines.filter((d) => d.professorId === professorId);
export const getGradesByStudent = (studentId: string) => grades.filter((g) => g.studentId === studentId);
export const getGradesByDiscipline = (disciplineId: string) => grades.filter((g) => g.disciplineId === disciplineId);
export const getAttendanceByStudentAndDiscipline = (studentId: string, disciplineId: string) =>
  attendanceRecords.filter((a) => a.studentId === studentId && a.disciplineId === disciplineId);
export const getAbsenceCount = (studentId: string, disciplineId: string) =>
  attendanceRecords.filter((a) => a.studentId === studentId && a.disciplineId === disciplineId && !a.present).length;
export const getTotalClasses = (disciplineId: string) =>
  new Set(attendanceRecords.filter((a) => a.disciplineId === disciplineId).map((a) => a.date)).size;
