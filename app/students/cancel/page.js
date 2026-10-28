import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";
import { getAllStudents } from "@/lib/queries";

export default function StudentsCancel() {
  const rows = getAllStudents().filter((s) => s.status === "cancelled");
  const columns = [
    { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs text-slate-500">{r.id}</span> },
    { key: "name", label: "Name", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "program", label: "Program" },
    { key: "session", label: "Session" },
    { key: "act", label: "", align: "right", render: () => <Badge tone="rose">Cancelled</Badge> },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · Students · Cancel" title="Cancelled Students"
        desc="Students whose admission was cancelled." />
      <DataTable columns={columns} rows={rows} empty="No cancelled students." />
    </div>
  );
}
