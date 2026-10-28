"use client";
import { useMemo, useState } from "react";
import ReportFrame from "@/components/ReportFrame";

const rup = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function CancelledReport({ students, sessions }) {
  const [session, setSession] = useState("all");
  const rows = useMemo(() => students.filter((s) =>
    s.status === "cancelled" && (session === "all" || String(s.sessionId) === session)
  ), [students, session]);

  const refunded = rows.reduce((a, s) => a + (s.refundAmount || 0), 0);
  const due = rows.reduce((a, s) => a + s.dueFees, 0);

  const filters = (
    <div>
      <label className="label">Session</label>
      <select className="input min-w-[150px]" value={session} onChange={(e) => setSession(e.target.value)}>
        <option value="all">All Sessions</option>
        {sessions.map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
      </select>
    </div>
  );

  return (
    <ReportFrame title="CANCELLED STUDENTS & REFUND REPORT"
      subtitle={`${rows.length} cancelled · Refunded ${rup(refunded)}`} filters={filters}>
      <table className="rpt">
        <thead>
          <tr><th>#</th><th>Student ID</th><th>Name</th><th>Mobile</th><th>Branch</th><th>Session</th><th>Cancel Date</th><th>Reason</th><th>Refund</th><th>Due</th></tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td><td>{s.id}</td><td>{s.name}</td><td>{s.mobile || "—"}</td>
              <td>{s.program}</td><td>{s.session}</td><td>{s.cancelDate || "—"}</td>
              <td>{s.cancelReason || "—"}</td><td>{rup(s.refundAmount)}</td><td>{s.dueFees > 0 ? rup(s.dueFees) : "—"}</td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={10} style={{ textAlign: "center", color: "#94a3b8" }}>No cancelled students.</td></tr>}
        </tbody>
        {rows.length > 0 && (
          <tfoot><tr><td colSpan={8} style={{ textAlign: "right" }}>TOTAL</td><td>{rup(refunded)}</td><td>{rup(due)}</td></tr></tfoot>
        )}
      </table>
    </ReportFrame>
  );
}
