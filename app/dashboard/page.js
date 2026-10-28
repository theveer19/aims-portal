import Link from "next/link";
import { intakeLabel, isJuly } from "@/lib/intake";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { counts, getAllStudents } from "@/lib/queries";

export default function Dashboard() {
  const c = counts();
  const students = getAllStudents().slice(0, 8);
  const stats = [
    { label: "Universities", value: c.universities, href: "/university/list", tone: "brand" },
    { label: "Programs", value: c.programs, href: "/university/programs", tone: "green" },
    { label: "Sessions", value: c.sessions, href: "/university/sessions", tone: "amber" },
    { label: "Students", value: c.students, href: "/students/search", tone: "violet" },
  ];
  const tones = { brand: "bg-brand-50 text-brand-700", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", violet: "bg-violet-50 text-violet-700" };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader title="Dashboard" crumb="Dashboard" desc="Ayushi Welfare & Education Society, Bhind"
        action={{ href: "/students/add", label: "+ Add Student" }} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className={`badge ${tones[s.tone]} mb-3`}>Live</div>
            <div className="text-3xl font-bold text-ink">{s.value}</div>
            <div className="mt-1 text-sm text-slate-500">Total {s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Recent Students</h2>
            <Link href="/students/search" className="text-sm font-medium text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase text-slate-400">
                  <th className="py-2">ID</th><th>Name</th><th>Program</th><th>Session</th><th>Type</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-slate-50">
                    <td className="py-2.5 font-mono text-xs text-slate-500">{s.id}</td>
                    <td className="font-medium text-ink">{s.name}</td>
                    <td className="text-slate-600">{s.program}</td>
                    <td className="text-slate-600">{s.session}</td>
                    <td><span className={`badge ${isJuly(s.admissionType) ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>{(isJuly(s.admissionType) ? "☀ " : "❄ ") + intakeLabel(s.admissionType)}</span></td>
                  </tr>
                ))}
                {students.length === 0 && <tr><td colSpan={5} className="py-6 text-center text-slate-400">No students yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-3 font-semibold text-ink">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/students/add" className="btn-ghost w-full justify-start"><Icon name="userPlus" /> New Admission</Link>
            <Link href="/students/search" className="btn-ghost w-full justify-start"><Icon name="search" /> Find a Student</Link>
            <Link href="/fees" className="btn-ghost w-full justify-start"><Icon name="rupee" /> Collect Fees</Link>
            <Link href="/university/mapping" className="btn-ghost w-full justify-start"><Icon name="building" /> Program Fees</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
