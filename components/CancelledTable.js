"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { restoreStudent } from "@/lib/actions";

const rup = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function CancelledTable({ rows }) {
  const router = useRouter();
  async function restore(id) {
    if (!confirm("Restore this admission?")) return;
    await restoreStudent(id); router.refresh();
  }
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
            <th className="px-5 py-2.5">Student</th><th>Session</th><th>Reason</th><th>Cancelled</th><th>Refund</th><th>Due</th><th className="pr-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id} className="border-b border-slate-50">
              <td className="px-5 py-3"><Link href={`/fees/${s.id}`} className="font-medium text-brand-600 hover:underline">{s.name}</Link><div className="font-mono text-xs text-slate-400">{s.id}</div></td>
              <td className="text-slate-600">{s.session}</td>
              <td className="text-slate-600">{s.cancelReason || "—"}</td>
              <td className="text-slate-600">{s.cancelDate || "—"}</td>
              <td className="text-violet-700">{rup(s.refundAmount)}</td>
              <td>{s.dueFees > 0 ? <span className="badge bg-rose-50 text-rose-600">{rup(s.dueFees)}</span> : "—"}</td>
              <td className="pr-5 text-right">
                <button onClick={() => restore(s.id)} className="inline-flex items-center gap-1 rounded-md border border-emerald-300 px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50"><Icon name="refresh" className="h-3.5 w-3.5" />Restore</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-slate-400">No cancelled students.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
