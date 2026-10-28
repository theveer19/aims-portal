import Link from "next/link";
import { intakeLabel, isJuly } from "@/lib/intake";
import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";
import { getAllStudents } from "@/lib/queries";

export default function StudentsDashboard() {
  const students = getAllStudents();
  const july = students.filter((s) => isJuly(s.admissionType)).length;
  const january = students.length - july;
  const due = students.filter((s) => s.dueFees > 0).length;

  const columns = [
    { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs text-slate-500">{r.id}</span> },
    { key: "name", label: "Name", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "program", label: "Program", render: (r) => <>{r.program}<div className="text-xs text-slate-400">{r.university}</div></> },
    { key: "admissionType", label: "Type", render: (r) => <Badge tone={isJuly(r.admissionType) ? "green" : "sky"}>{(isJuly(r.admissionType) ? "☀ " : "❄ ") + intakeLabel(r.admissionType)}</Badge> },
    { key: "due", label: "Fees", render: (r) => r.dueFees > 0 ? <Badge tone="rose">₹{r.dueFees} due</Badge> : <Badge tone="green">Paid</Badge> },
    { key: "open", label: "", align: "right", render: (r) => <Link href={`/fees/${r.id}`} className="text-sm font-medium text-brand-600 hover:underline">Open</Link> },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Students" title="Students Dashboard"
        action={{ href: "/students/add", label: "+ Add Student" }} />
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Total Students" value={students.length} tone="bg-brand-50 text-brand-700" href="/students/search" />
        <Stat label="July Intake" value={july} tone="bg-emerald-50 text-emerald-700" />
        <Stat label="January Intake" value={january} tone="bg-sky-50 text-sky-700" />
        <Stat label="Fees Pending" value={due} tone="bg-rose-50 text-rose-600" href="/fees" />
      </div>
      <DataTable columns={columns} rows={students} empty="No students yet. Add your first admission." />
    </div>
  );
}

function Stat({ label, value, tone, href }) {
  const inner = (
    <div className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`badge ${tone} mb-2`}>Live</div>
      <div className="text-2xl font-bold text-ink">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
