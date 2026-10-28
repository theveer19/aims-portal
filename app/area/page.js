import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { areas } from "@/lib/data";

export default function Area() {
  const columns = [
    { key: "id", label: "#", render: (_, i) => i + 1 },
    { key: "name", label: "Area", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "district", label: "District" },
    { key: "state", label: "State", render: (r) => <span className="text-slate-600">{r.state}</span> },
    { key: "pin", label: "Pin Code", render: (r) => <span className="font-mono text-xs text-slate-500">{r.pin}</span> },
    { key: "act", label: "Action", align: "right", render: () => (
      <button className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">✎ Edit</button>
    ) },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · Area" title="Area Master"
        desc="City / zone that students belong to — used in reports."
        action={{ href: "/area", label: "+ Add Area" }} />
      <DataTable columns={columns} rows={areas} />
    </div>
  );
}
