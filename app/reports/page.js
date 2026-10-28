import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ReportsView from "@/components/ReportsView";
import Icon from "@/components/Icon";
import { getAllStudents, getSessions, getUniversities } from "@/lib/queries";

const reports = [
  { href: "/reports/students", icon: "list", title: "Student Register", desc: "Every student — admission, branch, session, fees" },
  { href: "/reports/fees-due", icon: "rupee", title: "Fees Due Report", desc: "Kis-kis ki fees pending hai" },
  { href: "/reports/collection", icon: "rupee", title: "Collection Report", desc: "Date-wise fee receipts collected" },
  { href: "/reports/cancelled", icon: "x", title: "Cancelled & Refund", desc: "Cancelled admissions + refunds" },
];

export default function Reports() {
  const students = getAllStudents();
  const sessions = getSessions();
  const universities = getUniversities();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Reports" title="Reports" icon="list"
        desc="Overview below. Open a detailed report to filter and print / save as PDF." />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reports.map((r) => (
          <Link key={r.href} href={r.href} className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700"><Icon name={r.icon} /></div>
            <div className="font-semibold text-ink">{r.title}</div>
            <div className="mt-0.5 text-xs text-slate-500">{r.desc}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600">Open <Icon name="forward" className="h-3 w-3" /></div>
          </Link>
        ))}
      </div>

      <ReportsView students={students} sessions={sessions} universities={universities} />
    </div>
  );
}
