import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";
import { members } from "@/lib/data";

export default function Members() {
  const columns = [
    { key: "id", label: "Emp ID", render: (r) => <span className="font-mono text-xs text-slate-500">{r.id}</span> },
    { key: "name", label: "Name", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "role", label: "Role", render: (r) => <Badge tone="violet">{r.role}</Badge> },
    { key: "department", label: "Department" },
    { key: "mobile", label: "Mobile", render: (r) => <span className="text-slate-600">{r.mobile}</span> },
    { key: "status", label: "Status", render: (r) => (
      <Badge tone={r.status === "active" ? "green" : "slate"}>{r.status}</Badge>
    ) },
  ];
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Members" title="Member Management"
        desc="Staff, faculty and administrative members." action={{ href: "/members", label: "+ Add Member" }} />
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Total Members" value={members.length} tone="bg-brand-50 text-brand-700" />
        <Stat label="Active" value={members.filter((m) => m.status === "active").length} tone="bg-emerald-50 text-emerald-700" />
        <Stat label="Faculty" value={members.filter((m) => m.role === "Faculty").length} tone="bg-violet-50 text-violet-700" />
        <Stat label="Admin" value={members.filter((m) => m.role === "Admin" || m.role === "Director").length} tone="bg-amber-50 text-amber-700" />
      </div>
      <DataTable columns={columns} rows={members} />
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className="card p-4">
      <div className={`badge ${tone} mb-2`}>•</div>
      <div className="text-2xl font-bold text-ink">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
