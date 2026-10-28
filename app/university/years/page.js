import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { years } from "@/lib/data";

export default function Years() {
  const columns = [
    { key: "id", label: "#", render: (_, i) => i + 1 },
    { key: "name", label: "Year / Semester", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "act", label: "Action", align: "right", render: () => (
      <button className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">✎ Edit</button>
    ) },
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader crumb="Dashboard · University · Year" title="Year / Semester Master" />
      <DataTable columns={columns} rows={years} />
    </div>
  );
}
