import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";

const lists = [
  { id: 1, name: "Religion", items: "Hindu, Muslim, Sikh, Christian, Jain…", count: 7 },
  { id: 2, name: "Category", items: "General, OBC, SC, ST, EWS", count: 5 },
  { id: 3, name: "Blood Group", items: "A+, A-, B+, B-, O+, O-, AB+, AB-", count: 8 },
  { id: 4, name: "Document Type", items: "Aadhaar, Marksheet, TC, Migration…", count: 9 },
  { id: 5, name: "Payment Mode", items: "Cash, Cheque, DD, UPI, Net Banking", count: 5 },
];

export default function Custom() {
  const columns = [
    { key: "name", label: "List Name", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "items", label: "Values", render: (r) => <span className="text-slate-600">{r.items}</span> },
    { key: "count", label: "Count", render: (r) => <Badge tone="brand">{r.count}</Badge> },
    { key: "act", label: "Action", align: "right", render: () => (
      <button className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">Manage</button>
    ) },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · Custom List" title="Custom Lists"
        desc="Manage dropdown values in one place — all form options come from here."
        action={{ href: "/custom", label: "+ New List" }} />
      <DataTable columns={columns} rows={lists} />
    </div>
  );
}
