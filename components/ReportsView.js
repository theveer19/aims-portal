"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/DataTable";
import { intakeLabel, isJuly } from "@/lib/intake";

const rup = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function ReportsView({ students, sessions, universities }) {
  const [sessionId, setSessionId] = useState("all");

  const list = useMemo(
    () => (sessionId === "all" ? students : students.filter((s) => String(s.sessionId) === sessionId)),
    [students, sessionId]
  );

  const active = list.filter((s) => s.status !== "cancelled");
  const cancelled = list.filter((s) => s.status === "cancelled");

  const expected = active.reduce((a, s) => a + s.totalFees, 0);
  const collected = active.reduce((a, s) => a + (s.totalFees - s.dueFees), 0);
  const pending = active.reduce((a, s) => a + s.dueFees, 0);
  const refunded = cancelled.reduce((a, s) => a + (s.refundAmount || 0), 0);
  const cancelledPending = cancelled.reduce((a, s) => a + s.dueFees, 0);

  const cards = [
    { label: "Total Admissions", value: list.length, tone: "bg-brand-50 text-brand-700" },
    { label: "Active", value: active.length, tone: "bg-emerald-50 text-emerald-700" },
    { label: "Cancelled", value: cancelled.length, tone: "bg-rose-50 text-rose-600" },
    { label: "Total Fee (Expected)", value: rup(expected), tone: "bg-slate-100 text-slate-700" },
    { label: "Collected", value: rup(collected), tone: "bg-emerald-50 text-emerald-700" },
    { label: "Pending / Due", value: rup(pending), tone: "bg-amber-50 text-amber-700" },
    { label: "Refunded", value: rup(refunded), tone: "bg-violet-50 text-violet-700" },
    { label: "July / January", value: `${active.filter((s) => isJuly(s.admissionType)).length} / ${active.filter((s) => !isJuly(s.admissionType)).length}`, tone: "bg-sky-50 text-sky-700" },
  ];

  // session-wise
  const bySession = sessions.map((se) => {
    const l = students.filter((s) => s.sessionId === se.id && s.status !== "cancelled");
    return { id: se.id, name: se.name, intake: se.type, total: l.length,
      collected: l.reduce((a, s) => a + (s.totalFees - s.dueFees), 0), due: l.reduce((a, s) => a + s.dueFees, 0) };
  });
  // university-wise (respecting session filter)
  const byUni = universities.map((u) => {
    const l = active.filter((s) => s.university === u.name);
    return { id: u.id, name: u.name, total: l.length,
      collected: l.reduce((a, s) => a + (s.totalFees - s.dueFees), 0), due: l.reduce((a, s) => a + s.dueFees, 0) };
  });

  return (
    <div className="space-y-6">
      {/* filter */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500">Filter by session:</span>
        <select className="input max-w-xs" value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
          <option value="all">All Sessions</option>
          {sessions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {/* cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-4">
            <div className={`badge ${c.tone} mb-2`}>•</div>
            <div className="text-xl font-bold text-ink">{c.value}</div>
            <div className="text-xs text-slate-500">{c.label}</div>
          </div>
        ))}
      </div>

      {/* session-wise */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-3 text-sm font-semibold text-ink">Session-wise Report</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="px-5 py-2.5">Session</th><th>Intake</th><th>Admissions</th><th>Collected</th><th className="pr-5 text-right">Due</th>
            </tr>
          </thead>
          <tbody>
            {bySession.map((r) => (
              <tr key={r.id} className="border-b border-slate-50">
                <td className="px-5 py-3 font-medium text-ink">{r.name}</td>
                <td><Badge tone={isJuly(r.intake) ? "green" : "sky"}>{intakeLabel(r.intake)}</Badge></td>
                <td>{r.total}</td>
                <td className="text-emerald-700">{rup(r.collected)}</td>
                <td className="pr-5 text-right">{r.due > 0 ? <Badge tone="rose">{rup(r.due)}</Badge> : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* university-wise */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-3 text-sm font-semibold text-ink">University-wise Report</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="px-5 py-2.5">University</th><th>Admissions</th><th>Collected</th><th className="pr-5 text-right">Due</th>
            </tr>
          </thead>
          <tbody>
            {byUni.map((r) => (
              <tr key={r.id} className="border-b border-slate-50">
                <td className="px-5 py-3 font-medium text-ink">{r.name}</td>
                <td>{r.total}</td>
                <td className="text-emerald-700">{rup(r.collected)}</td>
                <td className="pr-5 text-right">{r.due > 0 ? <Badge tone="rose">{rup(r.due)}</Badge> : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* cancelled + refund */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <span className="text-sm font-semibold text-ink">Cancelled Students &amp; Refunds</span>
          <span className="text-xs text-slate-500">Refunded: <b className="text-violet-700">{rup(refunded)}</b> · Pending at cancel: <b className="text-amber-700">{rup(cancelledPending)}</b></span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="px-5 py-2.5">Student</th><th>Session</th><th>Reason</th><th>Refund</th><th className="pr-5 text-right">Due</th>
            </tr>
          </thead>
          <tbody>
            {cancelled.map((s) => (
              <tr key={s.id} className="border-b border-slate-50">
                <td className="px-5 py-3"><Link href={`/fees/${s.id}`} className="font-medium text-brand-600 hover:underline">{s.name}</Link><div className="font-mono text-xs text-slate-400">{s.id}</div></td>
                <td className="text-slate-600">{s.session}</td>
                <td className="text-slate-600">{s.cancelReason || "—"}</td>
                <td className="text-violet-700">{rup(s.refundAmount)}</td>
                <td className="pr-5 text-right">{s.dueFees > 0 ? rup(s.dueFees) : "—"}</td>
              </tr>
            ))}
            {cancelled.length === 0 && <tr><td colSpan={5} className="px-5 py-6 text-center text-slate-400">No cancelled students.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
