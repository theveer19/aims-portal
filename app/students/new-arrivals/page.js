import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";
import { getAllStudents } from "@/lib/queries";

export default function NewArrivals() {
  const rows = getAllStudents().slice(0, 15); // most recent admissions
  const columns = [
    { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs text-slate-500">{r.id}</span> },
    { key: "name", label: "Name", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "program", label: "Program" },
    { key: "session", label: "Session" },
    { key: "admissionType", label: "Type", render: (r) => <Badge tone={r.admissionType === "summer" ? "green" : "sky"}>{r.admissionType === "summer" ? "☀ Summer" : "❄ Winter"}</Badge> },
    { key: "formNo", label: "Form No", align: "right", render: (r) => <span className="font-mono text-xs text-slate-500">{r.formNo}</span> },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · Students · New Arrivals" title="New Arrival Students"
        desc="Most recent admissions." />
      <DataTable columns={columns} rows={rows} empty="No new arrivals." />
    </div>
  );
}
