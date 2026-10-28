import Link from "next/link";
import { counts } from "@/lib/queries";

export default function UniversityDashboard() {
  const c = counts();
  const rows = [
    { label: "Total Universities", value: c.universities, href: "/university/list" },
    { label: "Total Programs", value: c.programs, href: "/university/programs" },
    { label: "Total Program Fees", value: c.programFees, href: "/university/mapping" },
    { label: "Total Sessions", value: c.sessions, href: "/university/sessions" },
  ];
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">University Dashboard</h1>
          <p className="text-sm text-slate-500">Dashboard → University</p>
        </div>
        <Link href="/university/add" className="btn-primary">+ Add University</Link>
      </div>
      <div className="card divide-y divide-slate-100">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-slate-600">{r.label}</span>
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold text-ink">{r.value}</span>
              <Link href={r.href} className="text-sm font-medium text-brand-600 hover:underline">View All</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
