import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";
import { getAllStudents, getUniversities } from "@/lib/queries";

export default function StudentsSummary() {
  const students = getAllStudents();
  const universities = getUniversities();

  const rows = universities.map((u) => {
    const list = students.filter((s) => s.university === u.name);
    const summer = list.filter((s) => s.admissionType === "summer").length;
    const winter = list.filter((s) => s.admissionType === "winter").length;
    const collected = list.reduce((a, s) => a + (s.totalFees - s.dueFees), 0);
    const due = list.reduce((a, s) => a + s.dueFees, 0);
    return { id: u.id, name: u.name, total: list.length, summer, winter, collected, due };
  });
  const totals = rows.reduce((a, r) => ({
    total: a.total + r.total, summer: a.summer + r.summer, winter: a.winter + r.winter,
    collected: a.collected + r.collected, due: a.due + r.due,
  }), { total: 0, summer: 0, winter: 0, collected: 0, due: 0 });

  const columns = [
    { key: "name", label: "University", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "total", label: "Students" },
    { key: "summer", label: "Summer", render: (r) => <Badge tone="green">{r.summer}</Badge> },
    { key: "winter", label: "Winter", render: (r) => <Badge tone="sky">{r.winter}</Badge> },
    { key: "collected", label: "Collected", render: (r) => <span className="text-emerald-700">₹{r.collected.toLocaleString("en-IN")}</span> },
    { key: "due", label: "Due", align: "right", render: (r) => r.due > 0 ? <Badge tone="rose">₹{r.due.toLocaleString("en-IN")}</Badge> : <Badge tone="green">—</Badge> },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Students · Summary" title="Students Summary" desc="University-wise admission and fees overview." />
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card label="Total" value={totals.total} tone="bg-brand-50 text-brand-700" />
        <Card label="Summer" value={totals.summer} tone="bg-emerald-50 text-emerald-700" />
        <Card label="Winter" value={totals.winter} tone="bg-sky-50 text-sky-700" />
        <Card label="Fees Due" value={`₹${totals.due.toLocaleString("en-IN")}`} tone="bg-rose-50 text-rose-600" />
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}

function Card({ label, value, tone }) {
  return (
    <div className="card p-4">
      <div className={`badge ${tone} mb-2`}>Σ</div>
      <div className="text-xl font-bold text-ink">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
