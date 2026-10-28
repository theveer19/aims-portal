import PageHeader from "@/components/PageHeader";
import DataTable, { Badge } from "@/components/DataTable";

// Sundry = extra / misc fees (fine, ID card, sports, etc.)
const sundry = [
  { id: 1, receiptNo: "AIMS/2025-26/SN12", date: "10/08/2025", name: "Deepa Baghel", head: "ID Card / Late Fine", amount: 200, mode: "Cash" },
  { id: 2, receiptNo: "AIMS/2025-26/SN18", date: "22/08/2025", name: "Rahul Sharma", head: "Sports Fees", amount: 500, mode: "UPI" },
  { id: 3, receiptNo: "AIMS/2025-26/SN27", date: "05/09/2025", name: "Anjali Verma", head: "Duplicate Marksheet", amount: 150, mode: "Cash" },
];

export default function SundryFees() {
  const total = sundry.reduce((a, s) => a + s.amount, 0);
  const columns = [
    { key: "receiptNo", label: "Receipt No", render: (r) => <span className="font-mono text-xs text-slate-500">{r.receiptNo}</span> },
    { key: "date", label: "Date" },
    { key: "name", label: "Student", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
    { key: "head", label: "Head" },
    { key: "mode", label: "Mode", render: (r) => <Badge>{r.mode}</Badge> },
    { key: "amount", label: "Amount", align: "right", render: (r) => <span className="font-medium">₹{r.amount}</span> },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · Fees · Sundry" title="Sundry Fees"
        desc="Extra / misc charges — fine, ID card, sports, duplicate documents."
        action={{ href: "/fees/sundry", label: "+ Add Sundry Fee" }} />
      <div className="mb-4"><Badge tone="green">Total collected: ₹{total.toLocaleString("en-IN")}</Badge></div>
      <DataTable columns={columns} rows={sundry} />
    </div>
  );
}
