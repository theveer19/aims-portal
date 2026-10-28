import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";
import { getSessions } from "@/lib/queries";

export default function Sessions() {
  const sessions = getSessions();
  const columns = [
    { key: "id", label: "#", render: (_, i) => i + 1 },
    { key: "name", label: "Session", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "type", label: "Type", render: (r) => (
      <Badge tone={r.type === "summer" ? "green" : "sky"}>{r.type === "summer" ? "☀ Summer" : "❄ Winter"}</Badge>
    ) },
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader crumb="Dashboard · University · Session" title="Session Master"
        desc="Two sessions each year — Summer and Winter admissions." />
      <DataTable columns={columns} rows={sessions} />
    </div>
  );
}
