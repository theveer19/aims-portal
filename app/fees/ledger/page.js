import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";
import { getLedger } from "@/lib/queries";

export default function Ledger() {
  const entries = getLedger();
  const total = entries.reduce((a, e) => a + e.amount, 0);
  const columns = [
    { key: "date", label: "Date" },
    { key: "receiptNo", label: "Receipt No", render: (r) => <span className="font-mono text-xs text-slate-500">{r.receiptNo}</span> },
    { key: "name", label: "Student", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "mode", label: "Mode", render: (r) => <Badge>{r.mode}</Badge> },
    { key: "amount", label: "Credit (₹)", align: "right", render: (r) => <span className="font-medium text-emerald-700">₹{r.amount.toLocaleString("en-IN")}</span> },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · Fees · Ledger" title="Ledger Book"
        desc="All fee receipts in one place — daily collection register." />
      <div className="mb-4"><Badge tone="green">Total collection: ₹{total.toLocaleString("en-IN")}</Badge></div>
      <DataTable columns={columns} rows={entries} empty="No fee collections yet." />
    </div>
  );
}
